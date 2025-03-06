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
  paymentBatches: PaymentBatch[];
}

export interface PaymentBatch {
  id?: string;
  createdAt: string;
  name: string;
  totalValue: number;
  isPaid: boolean;
  status: string;
}
