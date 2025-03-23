import { IssueProjectType } from "@/models";
import { ApiResult } from "@/models/Common";
import { IssueRequest } from "@/models/Request/IssueRequest";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
const createIssue = async (
  issue: IssueRequest,
  constructionItemId: string
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.issue.createIssue(constructionItemId),
    issue
  );

  return response;
};

const updateIssue = async (issue: IssueProjectType): Promise<ApiResult> => {
  const response = await http.put(endPoint.issue.updateIssue(issue.id), issue);
  return response;
};

const deleteIssue = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(endPoint.issue.deleteIssue(id));
  return response;
};

const confirmIssue = async (id: string): Promise<ApiResult> => {
  const response = await http.put(endPoint.issue.confirmIssue(id));
  return response;
};

export { createIssue, updateIssue, deleteIssue, confirmIssue };
