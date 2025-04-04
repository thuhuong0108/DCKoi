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

const getConsultantStaff = async (
  filter: Filter
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(
    `${endPoint.staff.getPagingConsutanStaff}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getManagerStaff = async (
  filter: Filter
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(
    `${endPoint.staff.getPagingManagerStaff}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getDesignerStaff = async (
  filter: Filter
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(
    `${endPoint.staff.getPagingDesignerStaff}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getConstructionStaff = async (
  filter: Filter
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(
    `${endPoint.staff.getPagingConstructionStaff}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};
export {
  getAllStaff,
  createStaff,
  getConsultantStaff,
  getManagerStaff,
  getDesignerStaff,
  getConstructionStaff,
};
