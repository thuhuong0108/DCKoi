export interface IssueProjectType {
  id: string;
  name: string;
  description: string;
  reason: string;
  solution: string;
  status: string;
  issueType: IssueType;
  constructionItem: IssueConstructionItem;
  issueImages: IssueImage[];
  user: IssueUser;
  createdAt: string;
  updatedAt: string;
}

export interface IssueImage {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueUser {
  id: string;
  fullName: string;
  email: string;
  position: string;
  avatar: string;
}

export interface IssueType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueConstructionItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  status: string;
  estimateAt: string;
  actualAt: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
}
