import { TyppOfService } from "./enums/TypeOfService";

export interface ServiceType {
  id?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  type: TyppOfService;
}
