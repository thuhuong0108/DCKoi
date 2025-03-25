import { IssueType } from "@/models";
import { ApiResult, ApiResultWithPagination } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getIssueTypes = async (): Promise<ApiResultWithPagination<IssueType>> => {
  const response = await http.get(endPoint.issueType.getIssueTypes);
  return response;
};

export { getIssueTypes };
