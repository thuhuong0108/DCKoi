import { Position } from "./enums/Position";

export interface StaffType {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  position: Position;
}
