import { IssueProjectType } from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { MaintainceStatus } from "@/models/enums/Status";
import {
  MaintaineceType,
  MaintenancesTaskType,
} from "@/models/MaintenancesTpe";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const requestMaintennance = async (request): Promise<ApiResult> => {
  const response = await http.post(endPoint.maintenances.maintenances, request);
  return response;
};

const getPagingMaintenance = async (
  filter: Filter
): Promise<ApiResultWithPagination<MaintaineceType>> => {
  const response = await http.get(
    `${endPoint.maintenances.maintenances}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getPagingMaintenanceByStatus = async (
  filter: Filter,
  status: MaintainceStatus
): Promise<ApiResultWithPagination<MaintaineceType>> => {
  const response = await http.get(
    `${endPoint.maintenances.maintenances}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&Status=${status}`
  );
  return response;
};

const getMaintennanceById = async (
  id: string
): Promise<ApiResultWithAData<MaintaineceType>> => {
  const response = await http.get(
    `${endPoint.maintenances.getMaintenancesById(id)}`
  );
  return response;
};

const updateMaintenancesTask = async (
  id: string,
  request: any
): Promise<ApiResult> => {
  const response = await http.put(
    `${endPoint.maintenances.updateMaintenancesTask(id)}`,
    request
  );
  return response;
};

const comfirmMaintenancesTask = async (id: string): Promise<ApiResult> => {
  const response = await http.post(
    `${endPoint.maintenances.updateMaintenancesTask(id)}`
  );
  return response;
};

const getChildTask = async (
  id: string
): Promise<ApiResultWithAData<MaintenancesTaskType[]>> => {
  const response = await http.get(
    `${endPoint.maintenances.getTasks}?ParentId=${id}&PageNumber=1&PageSize=100&IsChild=true`
  );
  return response;
};

const getTask = async (
  id: string
): Promise<ApiResultWithAData<MaintenancesTaskType>> => {
  const response = await http.get(`${endPoint.maintenances.getTask(id)}`);
  return response;
};

const getTaskMaintenancesConsstructor = async (
  filter: Filter,
  status: string
): Promise<ApiResultWithPagination<MaintaineceType>> => {
  const response = await http.get(
    `${endPoint.maintenances.getTasks}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&IsChild=true&Status=${status}`
  );
  return response;
};
const getIssueMaintance = async (
  id: string,
  filter: Filter
): Promise<ApiResultWithAData<IssueProjectType>> => {
  const response = await http.get(
    `${endPoint.maintenances.getIssue(id)}&PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}`
  );
  return response;
};

const createIssueMaintenance = async (request: any): Promise<ApiResult> => {
  const response = await http.post(
    `${endPoint.maintenances.createIssue}`,
    request
  );
  return response;
};
const updateIssueMaintenance = async (
  id: string,
  request: any
): Promise<ApiResult> => {
  const response = await http.put(
    `${endPoint.maintenances.updateIssue(id)}`,
    request
  );
  return response;
};
const getIssueMaintanceById = async (
  id: string
): Promise<ApiResultWithAData<IssueProjectType>> => {
  const response = await http.get(`${endPoint.maintenances.getIssueById(id)}`);
  return response;
};

const getIssueMaintanceConstructor = async (
  filter: Filter,
  status: string
): Promise<ApiResultWithPagination<IssueProjectType>> => {
  const response = await http.get(
    `${endPoint.maintenances.getIssues}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&Status=${status}`
  );
  return response;
};
export {
  requestMaintennance,
  getPagingMaintenance,
  getPagingMaintenanceByStatus,
  getMaintennanceById,
  updateMaintenancesTask,
  getChildTask,
  getTask,
  getTaskMaintenancesConsstructor,
  comfirmMaintenancesTask,
  getIssueMaintance,
  createIssueMaintenance,
  updateIssueMaintenance,
  getIssueMaintanceById,
  getIssueMaintanceConstructor,
};
