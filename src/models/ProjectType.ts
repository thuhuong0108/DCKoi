import { Position } from "./enums/Position";
import { ProjectStatus, QuotationStatus } from "./enums/Status";
import { PackageType } from "./PackageType";

export interface Staff {
  id: string;
  fullName: string;
  email: string;
  position: Position;
}

export interface ProjectType {
  id?: string;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  area: number;
  depth: number;
  packageName: string;
  standOut: boolean;
  note: string;
  status: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
  createdDate?: string;
  updatedDate?: string;
  imageUrl?: string;
  name?: string;
}

export interface ProjectDetailType {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  area: number;
  depth: number;
  standOut: boolean;
  note: string;
  status: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
  createdDate?: string;
  updatedDate?: string;
  staff: Staff[];
  package: PackageType;
}

export interface QuotationProjectType {
  id: string;
  projectId: string;
  templateConstructionId: string;
  version: number;
  createdDate: string;
  updatedDate: string;
  status: QuotationStatus;
  reason: string;
}
