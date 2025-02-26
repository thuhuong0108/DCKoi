export interface ProjectRequest {
  customerName: string;
  note: string;
  address: string;
  phone: string;
  email: string;
  area: number;
  depth: number;
  packageId: string;
  templatedesignid: string | null;
}
