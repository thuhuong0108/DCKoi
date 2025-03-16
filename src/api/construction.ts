import http from "@/utils/http";
import { ApiResult, ApiResultWithAData, Filter } from "@/models/Common";
import { ConstructionRequest } from "./../models/Request/ConstructionRequest";
import { endPoint } from "@/utils/endPoint";
import { ConstructionType, TemplateConstructionItemType } from "@/models";
import { TaskRequest } from "@/models/Request/TaskRequest";

const createConstruction = async (
  construct: ConstructionRequest
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.construction.createConstruction,
    construct
  );
  return response;
};

const getConstruction = async (
  id: string
): Promise<ApiResultWithAData<ConstructionType>> => {
  // const response = await http.get(
  //   endPoint.construction.createConstruction,
  //   construct
  // );
  const response: ApiResultWithAData<ConstructionType> = {
    isSuccess: true,
    statusCode: 1,
    message: "",
    data: {
      id: "11", // Fake construction ID
      projectId: "111", // Fake project ID
      items: [
        {
          templateItemId: "item1", // Fake item ID
          esDate: "2025-03-01", // Fake estimated date
          isPayment: false, // Fake payment status
        },
        {
          templateItemId: "item2", // Fake item ID
          esDate: "2025-03-05", // Fake estimated date
          isPayment: true, // Fake payment status
        },
        {
          templateItemId: "item3", // Fake item ID
          esDate: "2025-03-10", // Fake estimated date
          isPayment: false, // Fake payment status
          child: [
            {
              templateItemId: "child1", // Fake child item ID
              esDate: "2025-03-12", // Fake child estimated date
              isPayment: false, // Fake child payment status
            },
            {
              templateItemId: "child2", // Fake child item ID
              esDate: "2025-03-15", // Fake child estimated date
              isPayment: true, // Fake child payment status
            },
          ],
        },
      ],
    },
  };
  return response;
};

const createTask = async (
  id: string,
  task: TaskRequest
): Promise<ApiResult> => {
  const tasks: TaskRequest[] = [task];

  const response = await http.post(
    endPoint.construction.createTaskwithIdItem(id),
    tasks
  );

  return response;
};

const getTaskByItem = async (
  id: string,
  filter: Filter
): Promise<ApiResult> => {
  const response = await http.get(
    `${endPoint.construction.getTaskbyIdItem(id)}&PageNumber=${
      filter.pageNumber
    }&PageSize=${filter.pageSize}&SortColumn=deadlineAt&SortDir=Asc`
  );

  return response;
};
const getItembyIdItem = async (
  id: string
): Promise<ApiResultWithAData<TemplateConstructionItemType>> => {
  const response = await http.get(endPoint.construction.getItembyIdItem(id));
  return response;
};

const assignTaskConstructor = async (data: TaskRequest): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.construction.assignStaff(data.id),
    data
  );
  return response;
};
const getTaskById = async (
  id: string
): Promise<ApiResultWithAData<TaskRequest>> => {
  const response = await http.get(endPoint.construction.getTaskById(id));
  return response;
};

const confirmTask = async (id: string): Promise<ApiResult> => {
  const response = await http.put(endPoint.construction.confirmTask(id));
  return response;
};
export {
  assignTaskConstructor,
  createConstruction,
  getConstruction,
  createTask,
  getTaskByItem,
  getItembyIdItem,
  getTaskById,
  confirmTask,
};
