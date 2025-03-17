import { PaymentPhase } from "./enums/Status";

export interface TransactionType {
  id?: string;
  note: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  paymentBatch: PaymentBatch;
  customer: Customer;
}

export interface Project {
  id: string;
  name: string;
  status: string;
}

export interface Contract {
  id: string;
  name: string;
  status: string;
  customerName: string;
  contractValue: number;
  createdAt: string;
  updatedAt: string;
  project: Project;
}

export interface PaymentBatch {
  contract: Contract;
  id: string;
  createdAt: string;
  paymentAt: string;
  isActive: boolean;
  name: string;
  totalValue: number;
  isPaid: boolean;
  status: PaymentPhase;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
}
