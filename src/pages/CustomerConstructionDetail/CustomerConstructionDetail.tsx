import { ConstructionProgressCard, TableComponent, Title } from "@/components"
import { StaffType } from "@/models"
import { selectedLoading, selectedStaff, staffActions } from "@/redux/slices/staff/staffSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store/hook"
import { AssignmentOutlined, LocationOnOutlined, Phone } from "@mui/icons-material"
import { Card, Col, Row } from "antd"
import { useEffect } from "react"

const CustomerConstructionDetail = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectedLoading);
    const staff = useAppSelector(selectedStaff);

    useEffect(() => {
        dispatch(
            staffActions.fetchStaff({ pageNumber: 1, pageSize: 4 })
        )
    }, [dispatch])

    return (
        <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full space-y-4">
            <Title name="Chi tiết tiến độ thi công" />

            <Row className="my-5">
                <Col>
                    <ConstructionProgressCard />
                </Col>
            </Row>

            {/* Detail Project */}
            <h2 className="my-2 text-xl font-bold">Chi tiết dự án</h2>
            <Row className="w-2/3">
                <Card
                    hoverable
                    children={
                        <div className="h-full flex flex-col ">
                            <Row className="flex flex-col ">
                                <div className="flex flex-col justify-start gap-4 my-4">
                                    <label className="text-black font-bold text-3xl">
                                        CP00112233
                                    </label>
                                </div>

                                <Col className="flex flex-col gap-4">
                                    <label className="font-medium text-gray-600 text-lg">
                                        <span className="mx-1 text-blue-400"><Phone /></span>
                                        0773828226
                                    </label>
                                    <label className="font-medium text-gray-600 text-lg">
                                        <span className="mx-1 text-blue-400"><LocationOnOutlined /></span>
                                        27 Phan Bội Châu, Buôn Trấp, Krong Ana, Đăk Lăk
                                    </label>
                                    <label className="font-medium text-blue-400 text-lg">
                                        <span className="mx-1"><AssignmentOutlined /></span>
                                        Hợp đồng thi công hồ cá koi
                                    </label>
                                </Col>
                            </Row>
                        </div>
                    }
                    className="w-full h-full shadow-lg border rounded-2xl bg-white"
                />
            </Row>
            {/* Staff */}
            <h2 className="text-xl font-bold">Nhân viên</h2>
            <TableComponent<StaffType>
                columns={
                    [
                        "Họ và tên",
                        "Số điện thoại",
                        "Email",
                        "Chức vụ"
                    ]
                }
                data={staff.data}
                props={[
                    "fullName",
                    "phone",
                    "email",
                    "position"
                ]}
                loading={isLoading}
            />

        </div>
    )
}

export default CustomerConstructionDetail
