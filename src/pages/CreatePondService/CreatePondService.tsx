import { Banner, Title } from '@/components'
import useForm from '@/hooks/useForm';
import { Button, Col, Form, Input, Row } from 'antd'

interface PondInfoProps {
    fullName: string,
    phoneNumber: string,
    email: string,
    address: string,
    area: number,
    depth: number
};

const initialValues: PondInfoProps = {
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    area: 0,
    depth: 0
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
                                {...regField("address")}
                            />
                        </Form.Item>

                        {/* Area */}
                        <Form.Item
                            label="Diện tích (m²)"
                            validateStatus={regField("area").error ? "error" : ""}
                            help={regField("area").error}
                        >
                            <Input
                                type="number"
                                placeholder="Nhập diện tích hồ"
                                {...regField("area")}
                            />
                        </Form.Item>

                        {/* Depth */}
                        <Form.Item
                            label="Độ sâu (m)"
                            validateStatus={regField("depth").error ? "error" : ""}
                            help={regField("depth").error}
                        >
                            <Input
                                type="number"
                                placeholder="Nhập độ sâu của hồ"
                                {...regField("depth")}
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={loading}
                                block
                            >
                                {loading ? "Đang xử lý..." : "Cập nhật thông tin"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default CreatePondService
