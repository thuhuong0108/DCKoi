import { ApiResult, ApiResultWithData } from "@/models/Common";
import { DesignType, ReasonDesignType } from "@/models/DesignType";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getDesign = async (
    id: string
): Promise<ApiResultWithData<DesignType>> => {
    const response = await http.get(
        endPoint.design.getDesign(id)
    );
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
    getDesign,
    acceptDesign,
    rejectDesign,
    requestEditDesign
};

