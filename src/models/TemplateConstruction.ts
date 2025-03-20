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
  actualAt?: string;
  isPayment?: boolean;
  estimateAt?: string;
  status?: string;
  duration: number;
  category: string;
}
export interface TemplateConstructionTypeDetail
  extends TemplateConstructionType {
  templateContructionItems: TemplateConstructionItemType[];
}
