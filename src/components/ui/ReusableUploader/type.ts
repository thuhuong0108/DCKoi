export interface ReusableUploaderProps {
  onUploadSuccess?: (urls: string[]) => void;
  onUploadError?: (error: any) => void;
  buttonText?: string;
  uploadText?: string;
  maxFiles?: number;
  accept?: ".pdf" | ".docx" | ".txt" | "image/*";
  listType?: "text" | "picture" | "picture-card";
  disabled?: boolean;
}
