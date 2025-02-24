import http from "@/utils/http";
import { ApiResult, ApiResultWithPagination } from "./../models/Common";
import { Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import { StaffType } from "@/models";

const getAllStaff = async (
  filter: Filter
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(
    `${endPoint.staff.getPagingStaff}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );

  return response;
};

const createStaff = async (staff: StaffType): Promise<ApiResult> => {
  const response = await http.post(endPoint.staff.createStaff, staff);
  return response;
};

export { getAllStaff, createStaff };
