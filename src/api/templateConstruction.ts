import { TemplateConstructionType } from "@/models";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { TemplateConstructionTypeDetail } from "@/models/TemplateConstruction";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getPagingTemlateConstruction = async (
  filter: Filter
): Promise<ApiResultWithPagination<TemplateConstructionType>> => {
  const response = await http.get(
    `${endPoint.templateConstruction.getTemplateConstructions}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getTemplateConstructionActive = async (
  filter: Filter
): Promise<ApiResultWithData<TemplateConstructionType>> => {
  const response = await http.get(
    `${endPoint.templateConstruction.getTemplateConstructions}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&IsActive=true`
  );
  return response;
};

const getTemlateConstruction = async (
  id: string
): Promise<ApiResultWithData<TemplateConstructionTypeDetail>> => {
  const response = await http.get(
    endPoint.templateConstruction.getTemplateConstruction(id)
  );

  return response;
};

const createTemlateConstruction = async (
  item: TemplateConstructionType
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.templateConstruction.createTemplateConstruction,
    item
  );
  return response;
};

const createItemsTemlateConstruction = async (
  item: any
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.templateConstruction.createTemplateConstructionItem,
    item
  );
  return response;
};

const activeTemplateConstructionDetail = async (
  id: string
): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.templateConstruction.activeTemplateConstructionDetail(id)
  );
  return response;
};

export {
  getPagingTemlateConstruction,
  activeTemplateConstructionDetail,
  getTemlateConstruction,
  createTemlateConstruction,
  createItemsTemlateConstruction,
  getTemplateConstructionActive,
};
