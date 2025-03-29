interface items {
  idPackageItem: string;
  quantity: number;
  description: string;
  name: string;
}
export interface PackageType {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  price: number[];
  items: items[];
}

export interface PackageMaintanceItemType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface PackageMaintainType {
  id: string;
  name: string;
  description: string;
  priceList: number[];
  maintenanceItems: PackageMaintanceItemType[];
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
