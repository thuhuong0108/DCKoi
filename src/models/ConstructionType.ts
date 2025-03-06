export interface ConstructionType {
  id?: string;
  projectId: string;
  items: ConstructionItem[];
}

export interface ConstructionItem {
  templateItemId: string;
  esDate: string;
  isPayment: boolean;
  child?: ConstructionItem[];
}
