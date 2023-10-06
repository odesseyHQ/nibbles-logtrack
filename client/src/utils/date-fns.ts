import { add, format } from "date-fns";
export default function convertUTCtoIST(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  const istDate = add(utcDate, { hours: 5, minutes: 30 });
  return format(istDate, "yyyy-MM-dd HH:mm:ss");
}
