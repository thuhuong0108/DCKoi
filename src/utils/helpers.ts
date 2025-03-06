import { Category } from "@/models/enums/Category";
import { DesignState } from "@/models/enums/DesignState";
import { Position } from "@/models/enums/Position";
import { ProjectStatus, QuotationStatus } from "@/models/enums/Status";

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
      return "Nhân viên tư vấn";
    case Position.DESIGNER:
      return "Nhân viên thiết kế";
    case Position.CONSTRUCTOR:
      return "Nhân viên thi công";
    default:
      return "";
  }
}

export function parseStatusProject(status: ProjectStatus): string {
  switch (status) {
    case ProjectStatus.REQUESTING:
      return "Đã gửi yêu cầu";
    case ProjectStatus.PROCESSING:
      return "Đang xử lí";
    case ProjectStatus.DESIGNING:
      return "Đang thiết kế";
    case ProjectStatus.CONSTRUCTING:
      return "Đang thi công";
    case ProjectStatus.FINISHED:
      return "Hoàn thành";
    default:
      return "";
  }
}

export function parseStatusQuotation(status: QuotationStatus): string {
  switch (status) {
    case QuotationStatus.OPEN:
      return "Chờ phê duyệt";
    case QuotationStatus.PREVIEW:
      return "Chờ chấp thuận";
    case QuotationStatus.UPDATING:
      return "Chờ cập nhật";
    case QuotationStatus.APPROVED:
      return "Đã chấp thuận";
    case QuotationStatus.CANCELLED:
      return "Đã hủy";
    case QuotationStatus.CONFIRMED:
      return "Đã xác nhận";
    case QuotationStatus.REJECTED:
      return "Không phê duyệt";
    default:
      return "Trạng thái không xác định";
  }
}

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDateVietNamese = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
};

export function parseCategory(category: Category): string {
  switch (category) {
    case Category.PRELIMINARIES:
      return "Công tác chuẩn bị";
    case Category.POND_LAYOUT:
      return "Khung hồ";
    case Category.PLUMBING_WORKS:
      return "Hệ thống bơm";
    case Category.POWER_HOUSE:
      return "Hệ thống điện";
    case Category.WATER_STORAGE_TANK_PLATFORM:
      return "Bồn chứa nước";
    case Category.LANDSCAPING:
      return "Cảnh quan";
    case Category.CONTINGENCY:
      return "Chi phí phát sinh";
    default:
      return "Không xác định";
  }
}

export function parseStatusDesign(status: DesignState): string {
  switch (status) {
    case DesignState.OPENING:
      return "Chờ phê duyệt";
    case DesignState.CONFIRMED:
      return "Đã xác nhận";
    case DesignState.EDITING:
      return "Chờ chỉnh sửa";
    case DesignState.REJECTED:
      return "Không phê duyệt";
    case DesignState.PREVIEWING:
      return "Chờ chấp thuận";
    default:
      return "Trạng thái không xác định";
  }
}
