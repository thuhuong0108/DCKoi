import http from "@/utils/http";

import {
  ApiResult,
  ApiResultWithPagination,
  Filter,
  Pagination,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import { FeedbackType } from "@/models/FeedbackType";

const createFeedback = async (feedback: any): Promise<ApiResult> => {
  const response = await http.post(endPoint.feedback.createFeedback, feedback);
  return response;
};

const getFeedbacks = async (
  filter: Filter
): Promise<ApiResultWithPagination<FeedbackType>> => {
  const response = await http.get(
    `${endPoint.feedback.getFeedback}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};
const getFeedbacksMaintaince = async (
  id: string,
  filter: Filter
): Promise<ApiResultWithPagination<FeedbackType>> => {
  const response = await http.get(
    `${endPoint.feedback.getFeedback}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&Type=MAINTENANCE&No=${id}`
  );
  return response;
};

export { createFeedback, getFeedbacks, getFeedbacksMaintaince };
