import { messageInfo } from "@/components";
import { uploadFilePDF, uploadImage } from "@/utils/uploadImage";
import { Button, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { ReusableUploaderProps } from "./type";

const ReusableUploader: React.FC<ReusableUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  buttonText = "Upload",
  uploadText = "+ Upload",
  maxFiles = 5,
  accept = "image/*",
  listType = "picture-card",
  disabled = false,
}) => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const [fileList, setFileList] = useState<UploadFile<FileType>[]>([]);
  const [loading, setLoading] = useState(false);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > maxFiles) {
      messageInfo(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    if (file.type?.startsWith("image/")) {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as FileType);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    } else if (file.type === "application/pdf") {
      const pdfUrl =
        file.url || URL.createObjectURL(file.originFileObj as File);
      window.open(pdfUrl);
    } else {
    }
  };
  const handleUpload = async () => {
    setLoading(true);

    try {
      const urls = await Promise.all(
        fileList.map(async (file) => {
          if (accept === "image/*") {
            const url = await uploadImage(file.originFileObj as File);
            return url;
          } else if (accept === ".pdf") {
            const url = await uploadFilePDF(file.originFileObj);
            return url;
          }
        })
      );

      if (onUploadSuccess) {
        onUploadSuccess(urls);
      }

      console.log(urls);
      //   messageInfo("Upload success");
    } catch (error) {
      if (onUploadError) {
        onUploadError(error);
      }
      messageInfo("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Upload
        listType={listType}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept={accept}
      >
        {fileList.length >= maxFiles ? null : uploadText}
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: "16px" }}
        loading={loading}
        disabled={fileList.length === 0 || disabled}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ReusableUploader;
