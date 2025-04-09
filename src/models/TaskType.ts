import { StaffType } from "./StaffType";
import { TemplateConstructionItemType } from "./TemplateConstruction";

export interface TaskType {
  id: string;
  name: string;
  status: string;
  isActive: boolean;
  deadlineAt: string;
  createdAt: string;
  updatedAt: string;
  staff: StaffType;
  constructionItem?: TemplateConstructionItemType;
  imageUrl?: string;
  reason?: string;
  deadlineActualAt?: string;
}
