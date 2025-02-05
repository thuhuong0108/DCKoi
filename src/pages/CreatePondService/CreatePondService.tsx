import { Banner, Title } from '@/components'
import useForm from '@/hooks/useForm';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd'
import Dragger from 'antd/es/upload/Dragger';

interface PondInfoProps {
    fullName: string,
    phoneNumber: string,
    email: string,
    address: string,
    area: number,
    depth: number,
    note?: string
};

const initialValues: PondInfoProps = {
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    area: 0,
    depth: 0,
    note: ""
};

const handleSubmit = (values: PondInfoProps) => {
    console.log("Submit values", values);
}

const CreatePondService = () => {
    const { loading, regField, regHandleSubmit } = useForm({
        values: initialValues,
        onSubmit: (values: PondInfoProps) => handleSubmit(values)
    })

    return (
        <div className="">
            <Banner title="Cập nhật thông tin hồ cá Koi" />
            <Row className="p-5">
                <Col span={16} offset={4}>
                    <Form layout="vertical" onFinish={regHandleSubmit}>
                        <Title name="BASE INFOMATION" />

                        {/* Full Name */}
                        <Form.Item
                            label="Họ và tên"
                            validateStatus={regField("fullName").error ? "error" : ""}
                            help={regField("fullName").error}
                        >
                            <Input
                                placeholder="Nhập họ và tên"
                                className="p-3 text-lg"
                                {...regField("fullName")}
                            />
                        </Form.Item>

                        {/* Phone Number */}
                        <Form.Item
                            label="Số điện thoại"
                            validateStatus={regField("phoneNumber").error ? "error" : ""}
                            help={regField("phoneNumber").error}
                        >
                            <Input
                                placeholder="Nhập số điện thoại"
                                className="p-3 text-lg"
                                {...regField("phoneNumber")}
                            />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            label="Email"
                            validateStatus={regField("email").error ? "error" : ""}
                            help={regField("email").error}
                        >
                            <Input
                                placeholder="Nhập địa chỉ email"
                                className="p-3 text-lg"
                                {...regField("email")}
                            />
                        </Form.Item>

                        {/* Address */}
                        <Form.Item
                            label="Địa chỉ"
                            validateStatus={regField("address").error ? "error" : ""}
                            help={regField("address").error}
                        >
                            <Input
                                placeholder="Nhập địa chỉ"
                                className="p-3 text-lg"
                                {...regField("address")}
                            />
                        </Form.Item>

                        <div className="flex gap-6">
                            {/* Area */}
                            <div className="flex-flex-col w-1/2">
                                <Form.Item
                                    label="Estimated area of ​​koi pond to be built"
                                    validateStatus={regField("area").error ? "error" : ""}
                                    help={regField("area").error}
                                >
                                    <Input
                                        type="number"
                                        className="p-3 text-lg"
                                        {...regField("area")}
                                    />
                                </Form.Item>
                            </div>

                            {/* Depth */}
                            <div className="flex flex-col w-1/2">
                                <Form.Item
                                    label="Koi pond construction depth"
                                    validateStatus={regField("depth").error ? "error" : ""}
                                    help={regField("depth").error}
                                >
                                    <Input
                                        type="number"
                                        className="p-3 text-lg"
                                        {...regField("depth")}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <Title name="DETAILS TECHNICAL DRAWING" />
                        <div className="my-4">
                            <Dragger listType="picture">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Drag your file(s) or <span className="text-blue-800 hover:underline">browse</span></p>
                                <p className="ant-upload-hint">
                                    Max 10 MB files are allowed
                                </p>
                            </Dragger>
                        </div>

                        <Title name="NOTE" />

                        {/* Note */}
                        <Form.Item
                            label="Special request"
                            validateStatus={regField("note").error ? "error" : ""}
                            help={regField("note").error}
                        >
                            <Input
                                className="p-3 text-lg"
                                {...regField("note")}
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="px-8 py-5 text-lg"
                                    disabled={loading}
                                    block
                                >
                                    {loading ? "Sending..." : "SEND REQUEST"}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default CreatePondService
