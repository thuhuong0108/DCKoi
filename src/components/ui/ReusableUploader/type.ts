export interface ReusableUploaderProps {
  onUploadSuccess?: (urls: string[]) => void;
  onUploadError?: (error: any) => void;
  buttonText?: string;
  uploadText?: string;
  maxFiles?: number;
  accept?: string;
}
