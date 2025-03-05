import { Title } from "@/components";
import { projectActions, selectedLoading, selectedProject } from "@/redux/slices/project/projectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Pagination } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect } from "react";
import CustomerProjectDesignCard from "./CustomerProjectDesignCard";
import CustomerProjectDesignSkeleton from "./CustomerProjectDesignSkeleton";
import EmptyContent from "@/components/ui/EmptyContent";

const CustomerProjectDesign = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectedProject);
    const isLoading = useAppSelector(selectedLoading);

    useEffect(() => {
        dispatch(
            projectActions.fetchProject({ pageNumber: 1, pageSize: 10 })
        )
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
                <Title name="Chọn dự án cần xem thiết kế" />

                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <CustomerProjectDesignSkeleton key={item} />
                    ))}
                </div>
            </div>
        )
    }

    if (items.data.length === 0) {
        return (
            <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
                <Title name="Chọn dự án cần xem thiết kế" />

                <EmptyContent
                    imgUrl="https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-assignment-icon-png-image_1576577.jpg"
                    title="Hiện tại không có dự án cần xem" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
            <Title name="Chọn dự án cần xem thiết kế" />

            <Row className="my-5 grid grid-cols-5 gap-2">
                {items.data.map((item) => (
                    <Col>
                        <CustomerProjectDesignCard key={item.id} {...item} />
                    </Col>
                ))}
            </Row>

            <Pagination count={items.totalPages} color="primary" />
        </div>
    )
}

export default CustomerProjectDesign
