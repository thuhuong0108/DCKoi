import { ApiResultWithAData } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";
import { PaymentRequest } from "@/models/Request/PaymentRequest";

const createPayment = async (
  item: PaymentRequest
): Promise<ApiResultWithAData<string>> => {
  const response = await http.post(endPoint.payment.createPayment, item);
  return response;
};

// const callbackPayment = async (item: PaymentRequest): Promise<ApiResultWithAData> => {
//     const response = await http.get(endPoint.payment.paymentCallback);
//     return response;
//   };

export { createPayment };
