import { EquipmentQuotationType, ServiceQuotationType } from "../QuotationType";

export interface QuotationRequest {
  id?: string;
  projectId: string;
  templateConstructionId: string;
  services: ServiceQuotationType[];
  equipments: EquipmentQuotationType[];
}
