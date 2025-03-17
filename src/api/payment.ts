import { ApiResultWithAData } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
import { PaymentRequest } from "@/models/Request/PaymentRequest";
import { TransactionType } from "@/models/TransactionType";

const createPayment = async (
  item: PaymentRequest
): Promise<ApiResultWithAData<string>> => {
  const response = await http.post(endPoint.payment.createPayment, item);
  return response;
};

const getPayment = async (
  id: string
): Promise<ApiResultWithAData<TransactionType>> => {
  const response = await http.get(`${endPoint.payment.getPayment(id)}`);
  return response;
};

export { createPayment, getPayment };
