import { ApiResult, ApiResultWithPagination, Filter } from "@/models/Common";
import { MaintaineceType } from "@/models/MaintenancesTpe";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const requestMaintennance = async (request): Promise<ApiResult> => {
  const response = await http.post(endPoint.maintenances.maintenances, request);
  return response;
};

const getPagingMaintenance = async (
  filter: Filter
): Promise<ApiResultWithPagination<MaintaineceType>> => {
  const response = await http.get(
    `${endPoint.maintenances.maintenances}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};
export { requestMaintennance, getPagingMaintenance };
