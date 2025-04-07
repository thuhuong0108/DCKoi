import { PackageMaintainType } from "@/models/PackageType";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
import { PackageItem } from "@/models/PackageItem";
import { PackageItemType } from "@/models";

const getPagingPackageMaintance = async (
  filter: Filter
): Promise<ApiResultWithPagination<PackageMaintainType>> => {
  const response = await http.get(
    `${endPoint.maintancePackage.getMaintancePackage}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const createPackageMaintance = async (data: any): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.maintancePackage.getMaintancePackage,
    data
  );
  return response;
};

const getItemPackageMaintance = async (
  filter: Filter
): Promise<ApiResultWithData<PackageItem>> => {
  const response = await http.get(
    `${endPoint.maintancePackage.getItems}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const createPackageMaintanceItem = async (
  data: PackageItemType
): Promise<ApiResult> => {
  const response = await http.post(endPoint.maintancePackage.getItems, data);
  return response;
};

const getPackageMaintanceById = async (
  id: string
): Promise<ApiResultWithAData<PackageMaintainType>> => {
  const response = await http.get(
    `${endPoint.maintancePackage.getPackageMaintennanceById(id)}`
  );
  return response;
};

const updatePackageMaintance = async (
  id: string,
  data: any
): Promise<ApiResult> => {
  const response = await http.put(
    `${endPoint.maintancePackage.getPackageMaintennanceById(id)}`,
    data
  );
  return response;
};

export {
  getPagingPackageMaintance,
  getItemPackageMaintance,
  createPackageMaintanceItem,
  createPackageMaintance,
  getPackageMaintanceById,
  updatePackageMaintance,
};
