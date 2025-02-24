import http from "@/utils/http";

import { EquipmentType } from "@/models";
import {
  ApiResult,
  ApiResultWithData,
  ApiResultWithPagination,
  Filter,
} from "@/models/Common";
import { endPoint } from "@/utils/endPoint";

const getAllEquipment = async (
  filter: Filter
): Promise<ApiResultWithPagination<EquipmentType>> => {
  const response = await http.get(
    `${endPoint.equipment.getPagingEquipment}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
  );
  return response;
};

const getEquipment = async (
  id: string
): Promise<ApiResultWithData<EquipmentType>> => {
  const response = await http.get(endPoint.equipment.getEquipment(id));
  return response;
};

const createEquipment = async (item: EquipmentType): Promise<ApiResult> => {
  const response = await http.post(endPoint.equipment.createEquipment, item);
  return response;
};

const updateEquipment = async (item: EquipmentType): Promise<ApiResult> => {
  const response = await http.put(
    endPoint.equipment.updateEquipment(item.id),
    item
  );

  return response;
};

const deleteEquipment = async (id: string): Promise<ApiResult> => {
  const response = await http.delete(endPoint.equipment.deleteEquipment(id));
  return response;
};

export {
  getAllEquipment,
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
