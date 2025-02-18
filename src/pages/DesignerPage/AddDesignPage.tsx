import ImgBlueprint from "@/assets/images/blueprint.png";
import ImgPreview from "@/assets/images/preview.png";
import { CloudUploadOutlined } from "@ant-design/icons";
import { DesignServices, KeyboardDoubleArrowRightOutlined } from "@mui/icons-material";
import { Button, Col, Image, Row, Select, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { toast } from "react-toastify";

const AddDesignPage = () => {
    const [perspective, setPerspective] = useState<string>("3D");
    const [uploadImage, setUploadImage] = useState<string | null>(ImgPreview);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const uploadProps: UploadProps = {
        name: "file",
        multiple: false,
        showUploadList: false,
        beforeUpload(file) {
            const isImage = file.type.startsWith("image/");
            const isUnder10MB = file.size <= 10 * 1024 * 1024;
            if (!isImage) {
                toast.error("You can only upload image files!");
                return false;
            }

            if (!isUnder10MB) {
                toast.error("File size must be 10MB or smaller!");
                return false;
            }

            // Generate preview URL
            const previewUrl = URL.createObjectURL(file);
            setUploadImage(previewUrl);
            setIsUploaded(true);

            return false; // Prevent auto-upload
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                toast.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                toast.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    }

    return (
        <div className="bg-white w-full p-5 m-5 shadow-md rounded-lg space-y-8">
            <h1 className="font-bold text-xl">Add Design</h1>
            <div className="">
                <Row>
                    <Col span={12}>
                        <div className="space-y-8">
                            <div className="flex items-center space-x-2">
                                <span className="bg-gray-300 rounded-2xl px-2 py-2"><KeyboardDoubleArrowRightOutlined /></span>
                                <h1 className="w-2/3 font-bold text-lg bg-gray-300 rounded-2xl px-2 py-2">DS123456789</h1>
                            </div>

                            <div className="">
                                <img src={ImgBlueprint} alt="Blueprint" width="80%" />
                            </div>

                            <div className="bg-white w-5/6 p-5 border-2 border-dashed">
                                <div className="flex justify-between">
                                    <div className="flex items-center space-x-2">
                                        <DesignServices />
                                        <p className="text-xl">Detailed requirements for koi pond construction</p>
                                    </div>
                                    <div className="">
                                        <a className="text-xl text-blue-600 hover:underline">See more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="space-y-4">
                            <Select
                                defaultValue={perspective}
                                value={perspective}
                                options={[
                                    { value: "3D", label: "3D Perspective" },
                                    { value: "2D", label: "2D Perspective" },
                                ]}
                                onChange={(value) => setPerspective(value)}
                                className="w-full h-full" />

                            <div className="space-y-4">
                                <div className="">
                                    <Dragger {...uploadProps}>
                                        <p className="ant-upload-drag-icon">
                                            <CloudUploadOutlined />
                                        </p>
                                        <p className="ant-upload-text">Drag your file(s) or <span className="text-blue-700 font-bold">browse</span></p>
                                        <p className="ant-upload-hint">
                                            Max 10 MB files are allowed
                                        </p>
                                    </Dragger>
                                </div>
                                {/* Preview Image */}
                                <div className="">
                                    {uploadImage && (
                                        <div className="mt-5 space-y-2">
                                            <p className="font-bold text-lg">Preview</p>
                                            <Image src={uploadImage} preview={isUploaded} width={"100%"} height={200} alt="Preview" className="object-cover rounded-lg" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button type="default" size="large" className="w-1/6 font-semibold">CANCEL</Button>
                                <Button type="primary" size="large" className="w-1/6 font-semibold">SAVE</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddDesignPage
