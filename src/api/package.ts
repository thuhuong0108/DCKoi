import { PackageType } from "@/models";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { PackageRequest } from "@/models/Request/PackageRequest";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingPackage = async (
  filter: Filter
): Promise<ApiResultWithPagination<PackageType>> => {
  const response = await http.get(
    `${endPoint.package.getPagingPackage}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const createPackage = async (item: PackageRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.package.createPackage, item);
  return response;
};

const getPackage = async (
  id: string
): Promise<ApiResultWithData<PackageType>> => {
  const response = await http.get(endPoint.package.getPackage(id));
  return response;
};
const updatePackage = async (
  id: string,
  item: PackageRequest
): Promise<ApiResult> => {
  const response = await http.put(endPoint.package.updatePackage(id), item);
  return response;
};
export { getPagingPackage, createPackage, getPackage, updatePackage };
