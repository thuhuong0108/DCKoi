import http from "@/utils/http";

import { IssueType } from "@/models";
import {
  ApiResult,
  ApiResultWithPagination,
  Filter,
  Pagination,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";

const getAllIssueType = async (
  filter: Filter
): Promise<ApiResultWithPagination<IssueType>> => {
  const response = await http.get(
    `${endPoint.issueType.getAllIssueType}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const createIssueType = async (issue: IssueType): Promise<ApiResult> => {
  const response = await http.post(endPoint.issueType.createIssueType, issue);
  return response;
};

const updateIssueType = async (issue: IssueType): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.issueType.updateIssueType(issue.id),
    issue
  );

  return response;
};

const getIssueTypes = async (): Promise<Pagination<IssueType>> => {
  const response = await http.get(
    `${endPoint.issueType.getAllIssueType}?PageNumber=1&PageSize=100`
  );
  return response;
};

const deleteIssueType = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(endPoint.issueType.deleteIssueType(id));
  return response;
};

export {
  createIssueType,
  deleteIssueType,
  getAllIssueType,
  updateIssueType,
  getIssueTypes,
};
