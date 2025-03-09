import { messageInfo } from "@/components";
import { uploadImage } from "@/utils/uploadImage";
import { Button, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

const TestUi = () => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const [fileList, setFileList] = useState<UploadFile<FileType>[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [loading, setLoading] = useState(false);

  const onPreview = async (file: UploadFile) => {
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
  };

  const handleUpload = async () => {
    // messageInfo("Upload...");
    setLoading(true);

    const urls = await Promise.all(
      fileList.map(async (file) => {
        const url = await uploadImage(file.originFileObj as File);
        return url;
      })
    );
    console.log(urls);

    setLoading(false);

    // messageInfo("Upload success");
  };

  return (
    <>
      {" "}
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {"+ Upload"}
        </Upload>
      </ImgCrop>
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: "16px" }}
        loading={loading}
      >
        Upload
      </Button>
    </>
  );
};

export default TestUi;
