export interface PromotionType {
  id?: string;
  name: string;
  code: string;
  discount: number;
  startAt: string;
  expiredAt: string;
  deadlineAt: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: true;
}
