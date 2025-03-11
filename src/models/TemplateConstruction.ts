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
  childs: TemplateConstructionItemType[];
  estTime?: string;
  isPayment?: boolean;
  estimateAt?: string;
  status?: string;
}
export interface TemplateConstructionTypeDetail
  extends TemplateConstructionType {
  templateContructionItems: TemplateConstructionItemType[];
}
