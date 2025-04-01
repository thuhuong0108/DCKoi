import { QuotationStatus } from "./enums/Status";
import { PromotionType } from "./PromotionType";

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
  totalPrice: number;
  promotion?: PromotionType;
}

export interface ServiceQuotationType {
  id?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  type?: string;
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
  isApprove: boolean;
  reason: string;
}

export interface RejectQuotationType {
  id?: string;
  isAccept: boolean;
  reason: string;
}

export interface FieldQuotationDetailType {
  id?: string;
  name: string;
  description: string;
  price: number;
  unit: string | "PSC" | "Chiếc";
  type?: string;
  quantity: number;
  note: string;
  category: string;
  isService?: boolean;
}
