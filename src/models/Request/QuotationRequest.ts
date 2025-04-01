import { EquipmentQuotationType, ServiceQuotationType } from "../QuotationType";

export interface QuotationServiceRequest {
  id: string;
  quantity: number;
  category: string;
  note: string;
}

export interface QuotationEquipmentRequest {
  id: string;
  quantity: number;
  category: string;
  note: string;
  price: number;
}

export interface QuotationRequest {
  id?: string;
  projectId: string;
  templateConstructionId: string;
  services: QuotationServiceRequest[];
  equipments: QuotationEquipmentRequest[];
  promotionId?: string;
}
