import { messageError } from "@/components";

const uploadFile = async (file: File, fileType: string) => {
  const cloudName = "dxztbchud";
  const presetKey = "ml_default";

  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", presetKey);

  // check size of file pdf < 10mb
  if (fileType === "PDF" && file.size > 10 * 1024 * 1024) {
    messageError("File size must be less than 10MB");
    return null;
  }
  try {
    let endPoint =
      fileType === "image"
        ? `https://api.cloudinary.com/v1_1/${cloudName}/upload`
        : `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
    const response = await fetch(endPoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload ${fileType}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error(`Upload ${fileType} error:`, error);
    messageError(`Upload ${fileType} failed`);
    return null;
  }
};

export const uploadImage = async (file: File) => {
  return uploadFile(file, "image");
};

export const uploadFilePDF = async (file: File) => {
  return uploadFile(file, "PDF");
};
