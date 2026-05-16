import { useState } from "react";
import { Armchair } from "lucide-react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function SafeImage({ src, alt, className = "", fallbackClassName = "", ...rest }: Props) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-burgundy ${className} ${fallbackClassName}`}
        aria-label={alt}
      >
        <Armchair className="h-12 w-12 text-gold opacity-70" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
