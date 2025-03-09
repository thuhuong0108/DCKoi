import { Title } from "@/components";
import { customerDesignActions, selectCustomerDesign, selectCustomerDesignLoading } from "@/redux/slices/customerDesign/customerDesignSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Pagination } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import DesignSkeleton from "../DesignerPages/DesignDashboard/DesignSkeleton";
import CustomerDesignCard from "./CustomerDesignCard";
import { useParams } from "react-router-dom";
import EmptyContent from "@/components/ui/EmptyContent";

const CustomerDesign = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCustomerDesign);
    const isLoading = useAppSelector(selectCustomerDesignLoading);

    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            customerDesignActions.fetchCustomerDesign({ id: id, filter: { pageNumber: page, pageSize: 10 } })
        )
    }, [dispatch, id, page]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
                <Title name="Danh sách bản thiết kế" />

                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <DesignSkeleton key={item} />
                    ))}
                </div>
            </div>
        )
    }

    if (items.data.length === 0) {
        return (
            <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
                <Title name="Danh sách thiết kế" />

                <EmptyContent
                    imgUrl="https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-assignment-icon-png-image_1576577.jpg"
                    title="Hiện tại không có bản thiết kế" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
            <Title name="Danh sách bản thiết kế" />

            <Row className="my-5 grid grid-cols-4 gap-4">
                {items.data.map((item) => (
                    <Col>
                        <CustomerDesignCard key={item.id} {...item} />
                    </Col>
                ))}
            </Row>

            <Pagination
                page={page}
                count={items.totalPages}
                color="primary"
                onChange={(event, value) => setPage(value)} />
        </div>
    )
}

export default CustomerDesign;
