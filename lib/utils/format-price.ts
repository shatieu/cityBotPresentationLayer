export function formatPrice(price: number): string {
  return `${Math.round(price)} Kč`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${Math.round(min)}–${Math.round(max)} Kč`;
}
