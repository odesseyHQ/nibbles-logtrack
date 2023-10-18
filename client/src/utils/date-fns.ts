import { add, format, sub } from "date-fns";

export default function convertUTCtoIST(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  const istDate = add(utcDate, { hours: 5, minutes: 30 });
  return format(istDate, "yyyy-MM-dd HH:mm:ss");
}

export function convertDateToUTC(date: Date) {
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const formattedUTCDate = format(utcDate, "yyyy-MM-dd HH:mm:ss");
  return formattedUTCDate;
}

export function behind24Hours(date: Date) {
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const resultDate = sub(utcDate, { hours: 24 });
  const formattedDate = format(resultDate, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
}

export function behind12Hours(date: Date) {
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const resultDate = sub(utcDate, { hours: 12 });
  const formattedDate = format(resultDate, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
}
