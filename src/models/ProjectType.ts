import { Position } from "./enums/Position";
import { Project } from "./enums/Status";
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
  status: Project;
  createdDate: string;
  updatedDate: string;
}

export interface ProjectDetailType {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  area: number;
  depth: number;
  packageName: string;
  standOut: boolean;
  note: string;
  status: Project;
  createdDate: string;
  updatedDate: string;
  staff: Staff[];
  packageDetail: PackageType;
}

export interface QuotationProjectType {
  id: string;
  projectId: string;
  templateConstructionId: string;
  version: number;
  createdDate: string;
  updatedDate: string;
  status: Project;
  reason: string;
}
