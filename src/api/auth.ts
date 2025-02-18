import { ApiResultWithData } from "@/models/ApiResult";
import { User } from "@/models/User";
import { LoginPayload } from "@/redux/slices/auth/authSlices";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const loginApi = async (data : LoginPayload) : Promise<ApiResultWithData<User>> => {
    const response = await http.post(endPoint.auth.login, data);
    console.log(response);
    return response;
};

export {
    loginApi
}