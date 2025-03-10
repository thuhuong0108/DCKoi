export interface DesignType {
    id?: string;
    isActive: boolean;
    version: number;
    reason: string;
    status: string;
    isPublic: boolean;
    type: string;
    customerName: string;
    projectId: string;
    staffId: string;
    designImages: DesignImages[];
}

export interface DesignImages {
    id?: string;
    imageUrl: string;
}

export interface ReasonDesignType {
    id?: string;
    reason: string;
}
