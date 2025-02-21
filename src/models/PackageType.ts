import { PackageItemType } from "./PackageItemType";

export interface PackageType {
  name: string;
  description: string;
  price: number;
  items: PackageItemType[];
}
