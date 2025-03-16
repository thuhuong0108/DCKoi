export interface TaskRequest {
  id?: string;
  deadlineAt: string;
  name: string;
  staffId?: string;
  reason?: string;
  imageUrl?: string;
}
