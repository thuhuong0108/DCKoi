import http from "@/utils/http";

import { ApiResultWithAData } from "@/models/Common";
import { HolidayType } from "@/models/HolidayType";
import { endPoint } from "@/utils/endPoint";
const getHolidays = async (): Promise<ApiResultWithAData<HolidayType[]>> => {
  const response = await http.get(endPoint.holiday.getHolidays);
  return response;
};

export { getHolidays };
