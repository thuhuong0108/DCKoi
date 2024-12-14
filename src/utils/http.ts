import axios, { AxiosResponse } from "axios";

import { baseURL } from "./endPoint";

//
const axiosCore = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

//
axiosCore.interceptors.request.use(async (request) => {
  const session = await localStorage.getItem("token");
  if (session) {
    const sessionData = JSON.parse(session);
    request.headers.Authorization = `Bearer ${sessionData.token}`;
  }
  return request;
});

const handleResponse = (res: AxiosResponse) => {
  if (res && res.data) {
    return res.data;
  }
  return res;
};
const handleError = (error: { response: { data: any } }) => {
  try {
    const { data } = error.response;
    return data;
  } catch (error) {
    console.log("error", error);
    return { result: null, message: "Server error" };
  }
};
axiosCore.interceptors.response.use(
  (response) => {
    return handleResponse(response);
  },
  (error) => {
    return handleError(error);
  }
);

export default axiosCore;
