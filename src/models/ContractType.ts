import { ContractStatus } from "./enums/Status";

export interface ContractType {
  id?: string;
  createdAt: string;
  updateAt: string;
  isActive: boolean;
  name: string;
  customerName: string;
  contractValue: number;
  url: string;
  note: string;
  quotationId: string;
  projectId: string;
  status: ContractStatus;
  paymentBatches: PaymentBatchType[];
}

export interface PaymentBatchType {
  id?: string;
  createdAt: string;
  name: string;
  totalValue: number;
  isPaid: boolean;
  status: string;
  paymentEstimateAt: string;
  paymentAt: string;
}

export interface VerifyContractType {
  id: string;
  otpCode: string;
}
