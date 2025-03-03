import http from "@/utils/http";
import { ProjectRequest } from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";
import { Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import {
  ProjectDetailType,
  ProjectType,
  QuotationProjectType,
} from "@/models/ProjectType";
import { ProjectStatus, QuotationStatus } from "@/models/enums/Status";
import { Position } from "@/models/enums/Position";

const getPagingProject = async (
  filter: Filter
): Promise<ApiResultWithPagination<ProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getPagingProjects}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );

  return response;
};

const getProject = async (
  id: string
): Promise<ApiResultWithData<ProjectDetailType>> => {
  const response = await http.get(endPoint.project.getProject(id));

  return response;
};

const assignConsultant = async (projectId: string): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.project.assignConsultant(projectId)
  );
  return response;
};

const getQuotationProject = async (
  projectId: string
): Promise<ApiResultWithData<QuotationProjectType>> => {
  const response = await http.get(endPoint.project.getQuotation(projectId));

  return response;
};

const requestProject = async (request: ProjectRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.project.requestProject, request);
  return response;
};

export {
  getPagingProject,
  getProject,
  assignConsultant,
  getQuotationProject,
  requestProject,
};
