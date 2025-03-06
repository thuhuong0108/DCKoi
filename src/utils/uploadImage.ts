import { messageError } from "@/components";

export const uploadImage = async (file: File) => {
  const cloudName = "dxztbchud";
  const presetKey = "ml_default";

  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", presetKey);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload image error:", error);
    messageError("Upload image failed");
    return null;
  }
};
