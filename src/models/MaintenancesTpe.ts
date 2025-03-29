import { FeedbackType } from "./FeedbackType";
import { StaffType } from "./StaffType";

export interface MaintaineceType {
  id: string;
  name: string;
  description: string;
  area: number;
  depth: number;
  address: string;
  totalValue: number;
  type: string;
  isPaid: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  cusomer?: StaffType;
  maintenanceRequestTasks?: MaintenancesTaskType[];

  feedback?: FeedbackType[];
}
export interface MaintenancesTaskType {
  id: string;
  name: string;
  description: string;
  status: string;
  estimateAt: string;
  reason: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  staff: StaffType;
  staffs?: StaffType[];
  maintenanceItem: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };
  maintenanceRequest: MaintaineceType & {
    customer: StaffType;
  };
  childs: MaintenancesTaskType[];
}
