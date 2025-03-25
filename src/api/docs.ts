import { ApiResult, ApiResultWithPagination } from "@/models/Common";
import { DocsType } from "@/models/DocsType";
import { DocsRequest } from "@/models/Request/DocsRequest";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const postDocs = async (request: DocsRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.docs.postDocs, request);
  return response;
};

export { postDocs };
