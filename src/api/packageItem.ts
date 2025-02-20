import { ApiResultWithData, Filter } from "@/models/Common";
import { PackageItem } from "@/models/PackageItem";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingPackageItem = async (filter : Filter) : Promise<ApiResultWithData<PackageItem>> => {
    const response = await http.get(`${endPoint.packageItem.getPagingPackageItem}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`);
    return response;
}

export {
    getPagingPackageItem
}