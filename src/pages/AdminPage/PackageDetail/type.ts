import { GridColDef } from "@mui/x-data-grid";

export interface PriceTier {
  label: string;
  factor: number;
  editable?: boolean;
}

export const priceTiers: PriceTier[] = [
  { label: "Hồ từ 8-10 m3", factor: 1, editable: true },
  { label: "Hồ từ 10-20 m3", factor: 0.95 },
  { label: "Hồ từ 20-50 m3", factor: 0.95 * 0.95 },
  { label: "Hồ từ 50-100 m3", factor: 0.95 * 0.95 * 0.95 },
  { label: "Hồ trên 100 m3", factor: 0.95 * 0.95 * 0.95 * 0.95 },
];

export const columns: GridColDef[] = [
  { field: "name", headerName: "Tên hạng mục", width: 200 },
];
