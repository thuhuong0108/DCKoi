import { ApiResult, ApiResultWithPagination } from "@/models/Common";
import { DocsType } from "@/models/DocsType";
import { DocsRequest } from "@/models/Request/DocsRequest";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const postDocs = async (request: DocsRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.docs.postDocs, request);
  return response;
};

const acceptDocs = async (id: string): Promise<ApiResult> => {
  const response = await http.put(endPoint.docs.acceptDocs(id));
  return response;
};
const verifyDocs = async (id: string, otp: string): Promise<ApiResult> => {
  const response = await http.put(endPoint.docs.verifyDocs(id), `"${otp}"`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { postDocs, acceptDocs, verifyDocs };
