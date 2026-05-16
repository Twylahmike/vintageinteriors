import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Order = { column: string; ascending?: boolean };

interface Options {
  table: string;
  select?: string;
  filter?: (q: any) => any;
  order?: Order;
  limit?: number;
  realtime?: boolean;
}

export function useSupabaseTable<T = any>(opts: Options) {
  const { table, select = "*", filter, order, limit, realtime = true } = opts;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    let q: any = (supabase as any).from(table).select(select);
    if (filter) q = filter(q);
    if (order) q = q.order(order.column, { ascending: order.ascending ?? true });
    if (limit) q = q.limit(limit);
    const { data: rows, error } = await q;
    if (error) setError(error.message);
    else setData((rows as T[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (!realtime) return;
    const channel = supabase
      .channel(`realtime:${table}:${Math.random()}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => fetchData())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading, error, refetch: fetchData };
}

export function useSettings() {
  const { data, loading } = useSupabaseTable<{ key: string; value: string }>({
    table: "settings",
  });
  const map: Record<string, string> = {};
  for (const row of data) map[row.key] = row.value;
  return { settings: map, loading };
}
