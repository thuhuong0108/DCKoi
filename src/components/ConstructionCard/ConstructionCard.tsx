import { Button, Card } from "antd";
import { CircularProgress } from "../ui";
import { useNavigate } from "react-router-dom";

const ConstructionCard = () => {
    const navigate = useNavigate();

    const handleActionClick = (id: string) => {
        navigate(`/construction/${id}`);
    }

    return (
        <Card
            className="rounded-lg bg-white w-[300px] "
            hoverable
            cover={
                <img
                    alt="example"
                    src={`https://storage.googleapis.com/digital-platform/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5.jpg`}
                    className="rounded-t-lg"
                    style={{
                        height: "200px"
                    }}
                />
            }
        >
            <div className="flex items-center justify-between">
                <Card.Meta title="project123" />
                <CircularProgress value={40} />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col justify-between mt-2 space-y-2">
                    {/* date */}
                    <div className="flex items-center justify-between">
                        <span className="ml-2 text-md font-semibold">
                            Ngày bắt đầu:
                        </span>
                        <span className="ml-2 text-md font-semibold">
                            02/10/2023
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="ml-2 text-md font-semibold">
                            Dự kiến hoàn thành:
                        </span>
                        <span className="ml-2 text-md font-semibold">
                            02/10/2024
                        </span>
                    </div>

                    {/* size */}
                    <div className="flex items-center">
                        <span className="ml-2 text-md font-semibold">
                            Khối lượng xây dựng:
                        </span>
                        <span className="ml-2 text-md font-semibold">
                            200m3
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Button
                    onClick={() => handleActionClick("112")}
                    block
                    type="primary"
                    className="py-4 font-semibold">
                    Xem chi tiết
                </Button>
            </div>
        </Card>
    )
}

export default ConstructionCard
