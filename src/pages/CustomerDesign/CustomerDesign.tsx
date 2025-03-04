import { Title } from "@/components";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Pagination } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import DesignSkeleton from "../DesignerPages/DesignDashboard/DesignSkeleton";
import CustomerDesignCard from "./CustomerDesignCard";
import { ProjectType } from "@/models";
import { ProjectStatus } from "@/models/enums/Status";

// const CustomerDesign = () => {
//     const dispatch = useAppDispatch();
//     const items = useAppSelector((state) => state.project.projects);
//     const isLoading = useAppSelector((state) => state.project.loading);

//     useEffect(() => {
//         dispatch(
//             projectActions.fetchDesignProject({ pageNumber: 1, pageSize: 10 })
//         )
//     }, [dispatch]);

//     if (isLoading) {
//         return (
//             <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
//                 <Title name="Danh sách thiết kế" />

//                 <div className="grid grid-cols-4 gap-4">
//                     {[1, 2, 3, 4].map((item) => (
//                         <DesignSkeleton key={item} />
//                     ))}
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
//       <Title name="Danh sách thiết kế" />

//       <Row className="my-5 grid grid-cols-4 gap-4">
//         {items.data.map((item) => (
//             <Col>
//                 <CustomerDesignCard key={item.id} {...item} />
//             </Col>
//         ))}
//       </Row>

//       <Pagination count={items.totalPages} color="primary" />
//     </div>
//     )
// }

// export default CustomerDesign;

const CustomerDesign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<{ data: ProjectType[]; totalPages: number }>({
        data: [],
        totalPages: 1,
    });

    useEffect(() => {
        setTimeout(() => {
            setItems({
                data: [
                    {
                        id: "1",
                        imageUrl: "https://storage.googleapis.com/digital-platform/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5.jpg",
                        customerName: "Nguyễn Văn A",
                        address: "123 Đường ABC, TP.HCM",
                        phone: "0912345678",
                        email: "nguyenvana@example.com",
                        area: 50,
                        depth: 20,
                        packageName: "Gói tiêu chuẩn",
                        standOut: false,
                        note: "Khách yêu cầu thiết kế hiện đại",
                        status: ProjectStatus.FINISHED,
                        createdDate: "2024-01-15",
                        updatedDate: "2024-02-01",
                        name: "Thiết kế nhà phố",
                    },
                    {
                        id: "2",
                        imageUrl: "https://storage.googleapis.com/digital-platform/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5.jpg",
                        customerName: "Trần Thị B",
                        address: "456 Đường XYZ, Hà Nội",
                        phone: "0987654321",
                        email: "tranthib@example.com",
                        area: 80,
                        depth: 30,
                        packageName: "Gói cao cấp",
                        standOut: true,
                        note: "Yêu cầu thiết kế biệt thự sang trọng",
                        status: ProjectStatus.DESIGNING,
                        createdDate: "2023-12-10",
                        updatedDate: "2024-01-20",
                        name: "Biệt thự hiện đại",
                    },
                ],
                totalPages: 1,
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
                <Title name="Danh sách thiết kế" />
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <DesignSkeleton key={item} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
            <Title name="Danh sách thiết kế" />
            <Row className="my-5 grid grid-cols-4 gap-4">
                {items.data.map((item) => (
                    <Col>
                        <CustomerDesignCard key={item.id} {...item} />
                    </Col>
                ))}
            </Row>
            <Pagination count={items.totalPages} color="primary" />
        </div>
    );
};

export default CustomerDesign;
