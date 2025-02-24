interface items {
  idPackageItem: string;
  quantity: number;
  description: string;
  name: string;
}
export interface PackageType {
  id?: number;
  name: string;
  description: string;
  isActive: boolean;
  price: number[];
  items: items[];
}
