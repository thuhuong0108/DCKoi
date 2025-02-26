import http from "@/utils/http";
import { ProjectRequest } from "@/models";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";
import { Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";

const requestProject = async (request: ProjectRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.project.requestProject, request);
  return response;
};

export { requestProject };
