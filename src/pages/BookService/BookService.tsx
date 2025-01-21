import { Banner } from "@/components"
import { Button, Col, Row } from "antd"
import { NavLink } from "react-router-dom"

const BookService = () => {
    return (
        <div className="">
            <Banner title="Book Service" />
            <Row className="p-5">
                <Col span={16} offset={4}>
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-indigo-800">CHỌN HỒ ĐỂ ĐẶT DỊCH VỤ</h2>
                        <p className="text-gray-500 text-md">Hiện tại bạn chưa có hồ để đặt dịch vụ. Vui lòng tạo hồ!</p>
                        <NavLink to="create">
                            <Button type="primary" size="large" className="w-1/4 font-semibold mt-3">TẠO HỒ</Button>
                        </NavLink>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BookService