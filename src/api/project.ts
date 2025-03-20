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
  StaffType,
  TemplateConstructionItemType,
} from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";
import { TaskType } from "@/models/TaskType";

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
  Filter: Filter,
  id: string
): Promise<ApiResultWithPagination<QuotationProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getQuotation(id)}?PageNumber=${
      Filter.pageNumber
    }&PageSize=${Filter.pageSize}`
  );
  return response;
};

const getQuotationActiveProject = async (
  id: string
): Promise<ApiResultWithPagination<QuotationProjectType>> => {
  const response = await http.get(`${endPoint.project.getQuotationActive(id)}`);

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
  filter: Filter,
  id: string
): Promise<ApiResultWithPagination<ContractProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getcontractOfProject(id)}?PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}`
  );
  return response;
};

const getContractActiveProject = async (
  id: string
): Promise<ApiResultWithPagination<ContractProjectType>> => {
  const response = await http.get(`${endPoint.project.getContractActive(id)}`);

  return response;
};

const getProjectConstruction = async (
  id: string
): Promise<ApiResultWithPagination<TemplateConstructionItemType>> => {
  const response = await http.get(`${endPoint.project.getConstruction(id)}`);
  return response;
};

const getProjects = async (
  filter: Filter
): Promise<ApiResultWithData<ProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getProjects}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getDesignApproval = async (
  id: string
): Promise<ApiResultWithPagination<ProjectType>> => {
  const response = await http.get(
    `${endPoint.project.getDesignOfProject(id)}&Status=CONFIRMED`
  );
  return response;
};

const getConstructorProject = async (
  id: string
): Promise<ApiResultWithPagination<StaffType>> => {
  const response = await http.get(endPoint.project.getConstructor(id));
  return response;
};

const getConstuctorTask = async (
  id: string,
  filter: Filter
): Promise<ApiResultWithPagination<TaskType>> => {
  const response = await http.get(
    `${endPoint.project.getConstuctorTask(id)}?PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}&SortColumn=deadlineAt&SortDir=Asc`
  );
  return response;
};

const getTasksDoneProject = async (
  id: string,
  filter: Filter
): Promise<ApiResultWithPagination<TaskType>> => {
  const response = await http.get(
    `${endPoint.project.getConstuctorTask(id)}?PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}&Status=DONE&SortColumn=UpdatedAt&SortDir=Desc`
  );
  return response;
};
export {
  getConstuctorTask,
  assignConsultant,
  check3Dconfirm,
  getContractActiveProject,
  getContractOfProject,
  getPagingProject,
  getProject,
  getQuotationActiveProject,
  getQuotationProject,
  requestProject,
  getProjectDesign,
  getDesignOfProject,
  getAllDesignForSpecificProject,
  getProjectConstruction,
  getProjects,
  getDesignApproval,
  getConstructorProject,
  getTasksDoneProject,
};
