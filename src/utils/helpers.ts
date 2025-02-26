import { Position } from "@/models/enums/Position";

export const formatDate = (date: Date, includeTime = false): string => {
  const options: Intl.DateTimeFormatOptions = includeTime
    ? {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};
export const isDateString = (str: string): boolean => {
  if (str.length < 10) return false;
  const parsedDate = Date.parse(str);
  return !isNaN(parsedDate) && !isNaN(new Date(parsedDate).getTime());
};
export const trimText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export function parsePosition(position: Position): string {
  switch (position) {
    case Position.ADMINISTRATOR:
      return "Quản trị viên";
    case Position.MANAGER:
      return "Quản lý";
    case Position.CONSULTANT:
      return "Tư vấn";
    case Position.DESIGNER:
      return "Nhân viên thiết kế";
    case Position.CONSTRUCTOR:
      return "Nhân viên thi công";
    default:
      return "Vị trí không xác định";
  }
}
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0, // Đảm bảo không có phần thập phân
  }).format(amount);
};
