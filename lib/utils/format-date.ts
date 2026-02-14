const PRAGUE_TZ = "Europe/Prague";

const czechMonths = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];

const czechDays = [
  "neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota",
];

export function formatCzechDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.toLocaleDateString("cs-CZ", { day: "numeric", timeZone: PRAGUE_TZ });
  const month = d.getMonth();
  return `${day}. ${czechMonths[month]}`;
}

export function formatCzechDateFull(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const dayOfWeek = czechDays[d.getDay()];
  const dayNum = d.toLocaleDateString("cs-CZ", { day: "numeric", timeZone: PRAGUE_TZ });
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${dayOfWeek} ${dayNum}. ${czechMonths[month]} ${year}`;
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  const todayStart = new Date(now.toLocaleDateString("en-US", { timeZone: PRAGUE_TZ }));
  const dateStart = new Date(d.toLocaleDateString("en-US", { timeZone: PRAGUE_TZ }));

  const diffDays = Math.floor((todayStart.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "dnes";
  if (diffDays === 1) return "včera";
  if (diffDays === -1) return "zítra";
  if (diffDays > 1 && diffDays <= 7) return `před ${diffDays} dny`;
  return formatCzechDate(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: PRAGUE_TZ,
  });
}

export function formatDateWithTime(date: Date | string): string {
  const relative = formatRelativeDate(date);
  const time = formatTime(date);
  return `${relative} ${time}`;
}
