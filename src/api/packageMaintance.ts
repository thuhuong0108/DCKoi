import { PackageMaintainType } from "@/models/PackageType";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingPackageMaintance = async (
  filter: Filter
): Promise<ApiResultWithPagination<PackageMaintainType>> => {
  const response = await http.get(
    `${endPoint.maintancePackage.getMaintancePackage}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

export { getPagingPackageMaintance };
