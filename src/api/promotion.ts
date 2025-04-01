import http from "@/utils/http";

import { PromotionType } from "@/models/PromotionType";
import {
  ApiResult,
  ApiResultWithPagination,
  Filter,
  Pagination,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";

const getAllPromotions = async (
  filter: Filter
): Promise<ApiResultWithPagination<PromotionType>> => {
  const response = await http.get(
    `${endPoint.promotions.getPromotions}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const createPromotion = async (
  promotion: PromotionType
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.promotions.createPromotion,
    promotion
  );
  return response;
};

const updatePromotion = async (
  promotion: PromotionType
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.promotions.updatePromotion(promotion.id),
    promotion
  );

  return response;
};

const getPromotions = async (): Promise<Pagination<PromotionType>> => {
  const response = await http.get(
    `${endPoint.promotions.getPromotions}?PageNumber=1&PageSize=100`
  );
  return response;
};

const deletePromotion = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(endPoint.promotions.deletePromotion(id));
  return response;
};

export {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  updatePromotion,
  getPromotions,
};
