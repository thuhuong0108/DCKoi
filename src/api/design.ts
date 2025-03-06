import { ApiResult, ApiResultWithAData, ApiResultWithData } from "@/models/Common";
import { DesignType, ReasonDesignType } from "@/models/DesignType";
import { DesignRequest } from "@/models";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getListDesign = async (
    id: string
): Promise<ApiResultWithData<DesignType>> => {
    const response = await http.get(
        endPoint.design.getDesign(id)
    );
    return response;
};
const postDesign = async (item: DesignRequest): Promise<ApiResult> => {
    const response = await http.post(endPoint.design.postDesign, item);

    return response;
};

const getDesign = async (id: string): Promise<ApiResultWithAData<any>> => {
    const response = await http.get(endPoint.design.getDesign(id));
    return response;
};

const updateDesign = async (
    id: string,
    item: DesignRequest
): Promise<ApiResult> => {
    const response = await http.put(endPoint.design.putDesign(id), item);
    return response;
};

const rejectDesign = async (
    rejectDesign: ReasonDesignType
): Promise<ApiResult> => {
    const response = await http.put(
        endPoint.design.rejectDesign(rejectDesign.id), rejectDesign
    );
    return response;
};

const acceptDesign = async (
    id: string
): Promise<ApiResult> => {
    const response = await http.get(
        endPoint.design.acceptDesign(id)
    );
    return response;
};

const requestEditDesign = async (
    requestEditDesign: ReasonDesignType
): Promise<ApiResult> => {
    const response = await http.put(
        endPoint.design.requestEditDesign(requestEditDesign.id), requestEditDesign
    );
    return response;
};

export {
    getListDesign,
    getDesign,
    postDesign,
    updateDesign,
    acceptDesign,
    rejectDesign,
    requestEditDesign
};
