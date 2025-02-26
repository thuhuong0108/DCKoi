export interface PriceTier {
  label: string;
}

export const priceTiers: PriceTier[] = [
  { label: "Hồ từ 8-10 m3" },
  { label: "Hồ từ 10-20 m3" },
  { label: "Hồ từ 20-50 m3" },
  { label: "Hồ từ 50-100 m3" },
  { label: "Hồ trên 100 m3" },
];

export interface EstimatePrice {
  volume: number;
  totalPrice: number;
  price: number;
}
