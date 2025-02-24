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
}
export interface TemplateConstructionTypeDetail
  extends TemplateConstructionType {
  templateContructionItems: TemplateConstructionItemType[];
}
