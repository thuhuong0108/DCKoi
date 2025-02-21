import { PackageItemType } from "@/models";
import { ApiResult, ApiResultWithData, Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingPackageItem = async (
  filter: Filter
): Promise<ApiResultWithData<PackageItemType>> => {
  const response = await http.get(
    `${endPoint.packageItem.getPagingPackageItem}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getPackageItem = async (
  id: string
): Promise<ApiResultWithData<PackageItemType>> => {
  const response = await http.get(endPoint.packageItem.getPackageItem(id));
  return response;
};

const createPackageItem = async (item: PackageItemType): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.packageItem.createPackageItem,
    item
  );
  return response;
};

const updatePackageItem = async (item: PackageItemType): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.packageItem.updatePackageItem(item.id),
    item
  );

  return response;
};

const deletePackageItem = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(
    endPoint.packageItem.deletePackageItem(id)
  );
  return response;
};

export {
  getPagingPackageItem,
  getPackageItem,
  createPackageItem,
  updatePackageItem,
  deletePackageItem,
};
