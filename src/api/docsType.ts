import { ApiResult, ApiResultWithPagination, Filter } from "@/models/Common";
import { DocsType } from "@/models/DocsType";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getDocsType = async (): Promise<ApiResultWithPagination<DocsType>> => {
  const response = await http.get(endPoint.docsType.getDocsType);
  return response;
};

const createDocsType = async (data: DocsType): Promise<ApiResult> => {
  const response = await http.post(endPoint.docsType.docsType, data);
  return response;
};

const getPagingDocsType = async (filter: Filter): Promise<ApiResult> => {
  const response = await http.get(
    `${endPoint.docsType.docsType}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};
export { getDocsType, createDocsType, getPagingDocsType };
