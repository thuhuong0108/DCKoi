export interface PackageRequest {
  name: string;
  description: string;
  price: number;
  items: {
    idPackageItem: string;
    quantity: number;
    description: string;
  }[];
}
