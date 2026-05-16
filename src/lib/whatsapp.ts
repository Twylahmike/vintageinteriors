export const WHATSAPP_NUMBER = "254717511626";

export function waLink(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatKES(price: number | string) {
  const n = typeof price === "string" ? Number(price) : price;
  return `KES ${n.toLocaleString("en-KE")}`;
}
