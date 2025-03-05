import { ConstructionCard, Title } from "@/components";
import { Col, Row } from "antd";

const CustomerConstruction = () => {
    return (
        <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
            <Title name="Danh sách thi công" />

            <Row className="my-5 grid grid-cols-4 gap-4">
                <Col>
                    <ConstructionCard />
                </Col>
            </Row>
        </div>
    )
}

export default CustomerConstruction
