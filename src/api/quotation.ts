import http from "@/utils/http";
import { ApiResult, ApiResultWithAData } from "./../models/Common";
import { endPoint } from "@/utils/endPoint";
import { QuotationType } from "@/models";

const getQuotation = async (
  id: string
): Promise<ApiResultWithAData<QuotationType>> => {
  const response = await http.get(endPoint.quotation.getQuotationDetail(id));
  return response;
};

const createQuotation = async (item: QuotationType): Promise<ApiResult> => {
  const response = await http.post(endPoint.quotation.createQuotation, item);
  return response;
};

export { getQuotation, createQuotation };
