import http from "@/utils/http";
import { ApiResult, ApiResultWithAData } from "./../models/Common";
import { endPoint } from "@/utils/endPoint";
import { ContractRequest } from "@/models/Request/ContractRequest";
import { ContractType } from "@/models";
import { VerifyContractType } from "@/models/ContractType";

const getContract = async (
  id: string
): Promise<ApiResultWithAData<ContractType>> => {
  const response = await http.get(endPoint.contract.getContract(id));

  return response;
};

const createContract = async (item: ContractRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.contract.createContract, item);
  return response;
};

const rejectContract = async (contractId: string): Promise<ApiResult> => {
  const response = await http.get(endPoint.contract.rejectContract(contractId));
  return response;
};

const acceptContract = async (contractId: string): Promise<ApiResult> => {
  const response = await http.get(endPoint.contract.acceptContract(contractId));
  return response;
};

const verifyContract = async (
  verifyData: VerifyContractType
): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.contract.verifyContract(verifyData.id),
    verifyData
  );
  return response;
};

export {
  getContract,
  createContract,
  rejectContract,
  acceptContract,
  verifyContract,
};
