import { getHolidays } from "@/api/holiday";
import { Category } from "@/models/enums/Category";
import { DesignState } from "@/models/enums/DesignState";
import { Position } from "@/models/enums/Position";
import {
  ContractStatus,
  IssueStatus,
  ItemConstructionStatus,
  MaintainceStatus,
  PaymentPhase,
  ProjectStatus,
  QuotationStatus,
} from "@/models/enums/Status";
import { TaskStage } from "@/models/enums/TaskStage";
import { HolidayType } from "@/models/HolidayType";
import numeral from "numeral";

export const formatDate = (date: Date, includeTime = false): string => {
  const options: Intl.DateTimeFormatOptions = includeTime
    ? {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { year: "numeric", month: "long", day: "numeric" };

  // return date.toLocaleDateString("vn-VN", options);
  // return not include time
  return date.toLocaleDateString("vi-VN", options);
};
export function parseDate(inputStr: string): string {
  const date = new Date(inputStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const dateDDMMYYY = (inputStr: string): string => {
  const date = new Date(inputStr);

  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const isDateString = (str: string): boolean => {
  if (str.length < 10) return false;
  const parsedDate = Date.parse(str);
  return !isNaN(parsedDate) && !isNaN(new Date(parsedDate).getTime());
};
export const trimText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export const convertIOSDatetoNormalDate = (date: string): string => {
  const dateArr = date.split("T");

  const dateArr2 = dateArr[0].split("-");
  const day = dateArr2[2];
  const month = dateArr2[1];
  const year = dateArr2[0];

  return `${year}-${month}-${day}`;
};

export const convertStringtoDate = (date: string, type = true): string => {
  const months: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  if (type) {
    const dateArr = date.split(" ");
    const day = dateArr[1].padStart(2, "0");
    const month = months[dateArr[2]];
    const year = dateArr[3];

    return `${year}-${month}-${day}`;
  } else {
    const dateArr = date.split("-");
    const day = dateArr[3].padStart(2, "0");
    const month = dateArr[2];
    const year = dateArr[0];

    return `${day}-${month}-${year}`;
  }
};
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
  return (
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount) + " VND"
  );
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

export function parseStatusContract(status: ContractStatus): string {
  switch (status) {
    case ContractStatus.PROCESSING:
      return "Đang xử lí";
    case ContractStatus.ACTIVE:
      return "Có hiệu lực";
    case ContractStatus.CANCELLED:
      return "Hủy bỏ";
    default:
      return "Trạng thái không xác định";
  }
}

export function parseStatusConstruction(
  status: ItemConstructionStatus
): string {
  switch (status) {
    case ItemConstructionStatus.OPENING:
      return "Chờ";
    case ItemConstructionStatus.PROCESSING:
      return "Đang thi công";
    case ItemConstructionStatus.DONE:
      return "Hoàn thành";
    default:
      return "Trạng thái không xác định";
  }
}

export function parseTaskStatus(status: TaskStage): string {
  switch (status) {
    case TaskStage.OPEN:
      return "Chờ";
    case TaskStage.PROCESSING:
      return "Đang thực hiện";
    case TaskStage.DONE:
      return "Hoàn thành";
    case TaskStage.PREVIEWING:
      return "Chờ xác nhận";
    default:
      return "Trạng thái không xác định";
  }
}
export function trackColorTask(status: TaskStage): string {
  switch (status) {
    case TaskStage.DONE:
      return "success";
    case TaskStage.PROCESSING:
      return "warning";
    case TaskStage.OPEN:
      return "default";
    case TaskStage.PREVIEWING:
      return "processing";
    default:
      return "error";
  }
}

export function parsePaymentPhase(phase: PaymentPhase): string {
  switch (phase) {
    case PaymentPhase.DEPOSIT:
      return "Đặt cọc";
    case PaymentPhase.ACCEPTANCE:
      return "Chấn nhận";
    case PaymentPhase.CONSTRUCTING:
      return "Đang thi công";
    case PaymentPhase.PRE_CONSTRUCTING:
      return "Trước thi công";
    default:
      return "Trạng thái không xác định";
  }
}

export const CalculateEndDate = async (
  start: Date,
  duration: number,
  volume: number,
  factor: number = 10
) => {
  const holidaysReponse = await getHolidays();

  const work = Math.ceil((volume / factor) * duration);

  let count = 0;
  let date = new Date(start);

  while (count < work) {
    date.setDate(date.getDate() + 1);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 = Chủ nhật, 6 = Thứ 7
    const isHoliday = holidaysReponse.data.some(
      (holiday) => holiday.date === date.toISOString().split("T")[0]
    );
    if (!isWeekend && !isHoliday) {
      count++;
    }
  }

  return date;
};

export function parseIssueStatus(issue: IssueStatus): string {
  switch (issue) {
    case IssueStatus.OPENING:
      return "Đợi nhân viên";
    case IssueStatus.PREVIEWING:
      return "Đang kiểm duyệt";
    case IssueStatus.PROCESSING:
      return "Đang khắc phục";
    case IssueStatus.DONE:
      return "Hoàn thành";
    default:
      return "Trạng thái không xác định";
  }
}

export function parseMaintenceStatus(issue: MaintainceStatus): string {
  switch (issue) {
    case MaintainceStatus.OPENING:
      return "Đang chờ thanh toán";
    case MaintainceStatus.REQUESTING:
      return "Đang chờ xử lí";
    case MaintainceStatus.PROCESSING:
      return "Hoạt động";
    case MaintainceStatus.DONE:
      return "Hoàn thành";
    case MaintainceStatus.CANCELLED:
      return "Đã hủy";
    default:
      return "Trạng thái không xác định";
  }
}

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format("0,0.00") : "";

  return result(format, ".00");
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format("0.00a") : "";

  return result(format, ".00");
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
