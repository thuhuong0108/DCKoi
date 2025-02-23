import { PackageItemType } from "./PackageItemType";

export interface PackageType {
  id?: string;
  name: string;
  description: string;
  price: number[];
  items: [];
}
