export interface IssueRequest {
  id?: string;
  name: string;
  description: string;
  reason: string;
  solution: string;
  status: string;
  isSolved: boolean;
  issueTypeId: string;
  issueImages: IssueImagesRequest[];
}

export interface IssueImagesRequest {
  name: string;
  imageUrl: string;
}
