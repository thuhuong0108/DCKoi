import { KeyboardDoubleArrowRightOutlined } from "@mui/icons-material";
import { Col, Row, Select } from "antd"
import { useState } from "react";
import ImgBlueprint from "@/assets/images/blueprint.png";

const AddDesignPage = () => {
    const [perspective, setPerspective] = useState<string>("3D");

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
                                <img src={ImgBlueprint} alt="Blueprint" width="80%"/>
                            </div>

                            <div className="">

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
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddDesignPage
