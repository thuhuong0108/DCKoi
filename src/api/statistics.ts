import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";

import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getDataChart = async (): Promise<ApiResultWithData<any>> => {
  const response = await http.get(endPoint.statistics.chart);
  return response;
};

const getUserStatistics = async (): Promise<ApiResultWithPagination<any>> => {
  const response = await http.get(`${endPoint.statistics.user}`);
  return response;
};

const getTotoRevenue = async (): Promise<ApiResultWithData<any>> => {
  const response = await http.get(endPoint.statistics.chartRevenue);
  return response;
};
export { getDataChart, getUserStatistics, getTotoRevenue };
