import { ProjectType } from "@/models";
import { ApiResultWithData } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getDesign = async (
    id: string
): Promise<ApiResultWithData<ProjectType>> => {
    const response = await http.get(endPoint.design.getDesign(id));
    return response;
};

export {
    getDesign,
};