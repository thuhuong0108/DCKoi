import { QuotationStatus } from "./enums/Status";

export interface QuotationType {
  id?: string;
  projectId: string;
  templateConstructionId: string;
  version: number;
  createdDate: string;
  updatedDate: string;
  status: QuotationStatus;
  reason?: string;
  services: ServiceQuotationType[];
  equipments: EquipmentQuotationType[];
}

export interface ServiceQuotationType {
  id?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  type: string;
  quantity: number;
  note: string;
  category: string;
}

export interface EquipmentQuotationType {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  note: string;
  category: string;
}

export interface ApproveQuotationType {
  id?: string;
  isAcpprove: boolean;
  reason: string;
}

export interface RejectQuotationType {
  id?: string;
  isAccept: boolean;
  reason: string;
}
