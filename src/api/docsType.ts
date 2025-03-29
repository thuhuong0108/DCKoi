import { ApiResult, ApiResultWithPagination } from "@/models/Common";
import { DocsType } from "@/models/DocsType";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getDocsType = async (): Promise<ApiResultWithPagination<DocsType>> => {
  const response = await http.get(endPoint.docsType.getDocsType);
  return response;
};

export { getDocsType };
