import http from "@/utils/http";
import { ServiceType } from "@/models";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";
import { Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";

const getAllService = async (
  filter: Filter
): Promise<ApiResultWithPagination<ServiceType>> => {
  const response = await http.get(
    `${endPoint.service.getPagingService}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );

  return response;
};

const getService = async (
  id: string
): Promise<ApiResultWithData<ServiceType>> => {
  const response = await http.get(endPoint.service.getService(id));
  return response;
};

const createService = async (item: ServiceType): Promise<ApiResult> => {
  const response = await http.post(endPoint.service.createService, item);
  return response;
};

const updateService = async (item: ServiceType): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.service.updateService(item.id),
    item
  );
  return response;
};
const deleteService = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(endPoint.service.deleteService(id));
  return response;
};

export {
  getAllService,
  getService,
  createService,
  updateService,
  deleteService,
};
