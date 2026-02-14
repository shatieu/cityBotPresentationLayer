export type TimePeriod = "morning" | "lunch" | "afternoon" | "evening";

export function getTimePeriod(date?: Date): TimePeriod {
  const d = date ?? new Date();
  const hour = d.toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Prague",
  });
  const h = parseInt(hour, 10);

  if (h >= 6 && h < 11) return "morning";
  if (h >= 11 && h < 14) return "lunch";
  if (h >= 14 && h < 17) return "afternoon";
  return "evening";
}

export function getGreeting(period?: TimePeriod): string {
  const p = period ?? getTimePeriod();
  switch (p) {
    case "morning":
      return "Dobré ráno";
    case "lunch":
      return "Dobré poledne";
    case "afternoon":
      return "Dobré odpoledne";
    case "evening":
      return "Dobrý večer";
  }
}
