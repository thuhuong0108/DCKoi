import { ProjectType } from "@/models";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import DrawIcon from "@mui/icons-material/Draw";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { Button, Card, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDesignCard = ({
    id,
    imageUrl,
    customerName,
    address,
    area,
    depth,
    name,
    phone
}: ProjectType) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector((state) => state.staff.staffs);
    const loading = useAppSelector((state) => state.staff.loading);

    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const handleCardClick = () => {
        if (id) {
            navigate(`/design/${id}`);
        }
    };

    return (
        <Card
            className="rounded-lg bg-white w-[300px] "
            hoverable
            onClick={handleCardClick}
            cover={
                <img
                    alt="example"
                    src={imageUrl}
                    className="rounded-t-lg"
                    style={{ height: "200px" }}
                />
            }
        >
            <Card.Meta title={name ? name : "project Name ACB"} />

            <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col justify-between mt-2">
                    {/* location */}
                    <div className="flex items-center">
                        <EditLocationIcon />
                        <span className="ml-2 text-sm">{address}</span>
                    </div>

                    {/* size */}
                    <div className="flex items-center">
                        <DrawIcon />
                        <span className="ml-2 text-sm">
                            {area}m x {depth}m
                        </span>
                    </div>
                </div>
            </div>

            {/* line */}
            <div>
                <hr className="my-2" />
            </div>

            {/* customer */}

            <div className="flex items-center flex-row justify-between">
                <Typography.Text strong aria-level={2}>
                    {customerName}
                </Typography.Text>

                <Typography className="text-sm">{phone}</Typography>
            </div>
        </Card>
    )
}

export default CustomerDesignCard
