import { Filter } from "@/models/Common";
import {
  ContractProjectType,
  ProjectDesignType,
  ProjectDetailType,
  ProjectType,
  QuotationProjectType,
} from "@/models/ProjectType";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
import {
  AssginStaff,
  ProjectRequest,
  TemplateConstructionItemType,
} from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";

const getPagingProject = async (
  filter: Filter
): Promise<ApiResultWithPagination<ProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getPagingProjects}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );

  return response;
};

const getProject = async (
  projectId: string
): Promise<ApiResultWithAData<ProjectDetailType>> => {
  const response = await http.get(endPoint.project.getProject(projectId));

  return response;
};

const assignConsultant = async (
  projectId: string,
  staff: AssginStaff
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.project.assignConsultant(projectId),
    staff
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

const getProjectDesign = async (
  filter: Filter
): Promise<ApiResultWithPagination<ProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getProjectDesign}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );

  return response;
};

const getDesignOfProject = async (
  id: string
): Promise<ApiResultWithPagination<ProjectType>> => {
  const response = await http.get(`${endPoint.project.getDesignOfProject(id)}`);
  return response;
};

const check3Dconfirm = async (
  id: string
): Promise<ApiResultWithAData<{ isExit3DConfirmed: boolean }>> => {
  const response = await http.get(endPoint.project.check3Dconfirm(id));
  return response;
};
const getAllDesignForSpecificProject = async (
  id: string,
  filter: Filter
): Promise<ApiResultWithPagination<ProjectDesignType>> => {
  const response = await http.get(
    `${endPoint.project.getAllDesignForSpecificProject(id)}?PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}`
  );

  return response;
};

const getContractOfProject = async (
  id: string
): Promise<ApiResultWithPagination<ContractProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getcontractOfProject(id)}`
  );
  return response;
};

const getProjectConstruction = async (
  id: string
): Promise<ApiResultWithPagination<TemplateConstructionItemType>> => {
  const response = await http.get(`${endPoint.project.getConstruction(id)}`);
  return response;
};

export {
  assignConsultant,
  getContractOfProject,
  check3Dconfirm,
  getPagingProject,
  getProject,
  getQuotationProject,
  requestProject,
  getProjectDesign,
  getDesignOfProject,
  getAllDesignForSpecificProject,
  getProjectConstruction,
};
