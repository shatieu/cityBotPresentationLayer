import { formatPrice } from "@/lib/utils/format-price";

interface PriceTagProps {
  price: number;
  className?: string;
}

export function PriceTag({ price, className = "" }: PriceTagProps) {
  return (
    <span className={`font-data text-wine-700 ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
