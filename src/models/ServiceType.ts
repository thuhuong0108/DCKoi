export interface ServiceType {
  id?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  type: "Unit" | "m2" | "m3";
}
