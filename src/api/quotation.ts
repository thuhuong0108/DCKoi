import http from "@/utils/http";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithPagination,
  Filter,
} from "./../models/Common";
import { endPoint } from "@/utils/endPoint";
import {
  ApproveQuotationType,
  QuotationType,
  RejectQuotationType,
} from "@/models";
import { QuotationRequest } from "@/models/Request/QuotationRequest";

const getAllQuotation = async (
  filter: Filter
): Promise<ApiResultWithPagination<QuotationType>> => {
  const response = await http.get(
    `${endPoint.quotation.getAllQuotation}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getQuotation = async (
  id: string
): Promise<ApiResultWithAData<QuotationType>> => {
  const response = await http.get(endPoint.quotation.getQuotationDetail(id));
  return response;
};

const createQuotation = async (item: QuotationRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.quotation.createQuotation, item);
  return response;
};

const rejectQuotation = async (
  quotationReject: RejectQuotationType
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.quotation.rejectQuotation(quotationReject.id)
  );
  return response;
};

const approveQuotation = async (
  quotationApprove: ApproveQuotationType
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.quotation.approveQuotation(quotationApprove.id)
  );
  return response;
};

const updateQuotation = async (
  quotation: QuotationRequest
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.quotation.editQuotation(quotation.id)
  );
  return response;
};

const rewriteQuotation = async (
  quotation: QuotationRequest
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.quotation.rewriteQuotation(quotation.id)
  );
  return response;
};

export {
  getQuotation,
  createQuotation,
  getAllQuotation,
  rejectQuotation,
  approveQuotation,
  updateQuotation,
  rewriteQuotation,
};
