import { ConstructionItem } from "../ConstructionType";

export interface ConstructionRequest {
  projectId: string;
  items: ConstructionItem[];
}
