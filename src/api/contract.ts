import { ApiResult } from "@/models/Common";
import { ContractOTP, ContractType } from "@/models/ContractType";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const createContract = async (item: ContractType): Promise<ApiResult> => {
    const response = await http.post(endPoint.contract.createContract, item);
    return response;
};

const acceptContract = async (id: string): Promise<ApiResult> => {
    const response = await http.get(endPoint.contract.acceptContract(id));
    return response;
}

const rejectContract = async (id: string): Promise<ApiResult> => {
    const response = await http.get(endPoint.contract.rejectContract(id));
    return response;
}

const verifyContract = async (id: string, item: ContractOTP): Promise<ApiResult> => {
    const response = await http.post(endPoint.contract.verifyContract(id), item);
    return response;
}

export {
    createContract,
    acceptContract,
    rejectContract,
    verifyContract
};