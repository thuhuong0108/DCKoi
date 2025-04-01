export interface BlogsType {
  id?: string;
  name: string;
  description: string;
  createdAt?: string;
  staff?: {
    fullName: string;
    avatar: string;
  };
}
