interface ImageDesign {
  id: string;
  imageUrl: string;
  createdAt: string;
}

export interface DesignDetailType {
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  version: number;
  reason: string;
  status: string;
  isPublic: boolean;
  type: string;
  customerName: string;
  projectId: string;
  staffId: string;
  designImages: ImageDesign[];
}
