import { User } from "@/models/User";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";

import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getInforUser = async (): Promise<ApiResultWithAData<User>> => {
  const response = await http.get(endPoint.users.getUsersInfo);
  return response;
};

const updateInforUser = async (
  id: string,
  data: any
): Promise<ApiResultWithAData<User>> => {
  const response = await http.put(endPoint.users.editUser(id), data);
  return response;
};

export { getInforUser, updateInforUser };
