import { IssueStatus } from "./enums/Status";

export interface IssueProjectType {
  id: string;
  name: string;
  description: string;
  cause: string;
  reason: string;
  solution: string;
  status: IssueStatus;
  issueType: IssueType;
  constructionItem: IssueConstructionItem;
  issueImage: string;
  confirmImage: string;
  staff: IssueStaff;
  createdAt: string;
  updatedAt: string;
}

export interface IssueStaff {
  id: string;
  fullName: string;
  email: string;
  position: string;
  avatar: string;
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
