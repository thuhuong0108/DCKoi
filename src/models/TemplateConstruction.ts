export interface TemplateConstructionType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}
export interface TemplateConstructionItemType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  child: TemplateConstructionItemType[];
  estTime?: string;
  isPayment?: boolean;
}
export interface TemplateConstructionTypeDetail
  extends TemplateConstructionType {
  templateContructionItems: TemplateConstructionItemType[];
}
