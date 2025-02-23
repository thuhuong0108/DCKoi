import { PackageType } from "@/models";
import { ApiResult, ApiResultWithData, Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingPackage = async (
    filter: Filter
): Promise<ApiResultWithData<PackageType>> => {
    const response = await http.get(
        `${endPoint.package.getPagingPackage}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
    );
    return response;
};

const getPackage = async (id: string): Promise<ApiResultWithData<PackageType>> => {
    const response = await http.get(
        endPoint.package.getPackage(id)
    );
    return response;
};

const createPackage = async (item: PackageType): Promise<ApiResult> => {
    const response = await http.post(
        endPoint.package.createPackage, item
    );
    return response;
};

const updatePackage = async (item: PackageType): Promise<ApiResult> => {
    const response = await http.put(
        endPoint.package.updatePackage(item.id), item
    );

    return response;
}

const deletePackage = async (id): Promise<ApiResult> => {
    const response = await http.delete(
        endPoint.package.deletePackage(id)
    );

    return response;
}

export {
    getPagingPackage,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage
}