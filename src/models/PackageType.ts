export interface PackageType {
  id?: number;
  name: string;
  description: string;
  price: number;
  items: {
    idPackageItem: string;
    quantity: number;
    description: string;
  }[];
}
