import { DesignRequest } from "@/models";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
import { ApiResult, ApiResultWithAData } from "./../models/Common";

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

const rejectDesign = async (id: string, reason: string): Promise<ApiResult> => {
  const response = await http.put(endPoint.design.rejectDesign(id), {
    reason: reason,
  });
  return response;
};

const acceptDesign = async (id: string): Promise<ApiResult> => {
  const response = await http.get(endPoint.design.acceptDesign(id));
  return response;
};

export { postDesign, getDesign, updateDesign, rejectDesign, acceptDesign };
