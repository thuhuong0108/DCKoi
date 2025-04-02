import { ApiResult } from "@/models/Common";
import { RegisterRequest } from "@/models/Request/RegisterType";
import { ApiResultWithData } from "@/models/Response/ApiResult";
import { User } from "@/models/User";
import { LoginPayload } from "@/redux/slices/auth/authSlices";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const loginApi = async (
  data: LoginPayload
): Promise<ApiResultWithData<User>> => {
  const response = await http.post(endPoint.auth.login, data);
  return response;
};

const signUpApi = async (data: RegisterRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.auth.register, data);
  return response;
};

export { loginApi, signUpApi };
