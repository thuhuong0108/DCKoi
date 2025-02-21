import { PackageItemType } from "./PackageItemType";

export interface PackageType {
  id?: number;
  name: string;
  description: string;
  price: number;
  items: [];
}
