import { ProjectType } from "@/models";
import { Button, Card, Modal } from "antd";
import React, { useState } from "react";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import DrawIcon from "@mui/icons-material/Draw";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { assignConsultant } from "@/api/project";
import { messageError } from "@/components";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { RoleUser } from "@/models/enums/RoleUser";
import { useNavigate } from "react-router-dom";
const DesignCard = ({
  imageUrl,
  customerName,
  address,
  area,
  depth,
  name,
  phone,
  standOut,
  id,
  staffs,
}: ProjectType) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const handleAddDesigner = async (idStaff: string) => {
    const res = await assignConsultant(id, { staffId: idStaff });
    if (res.isSuccess) {
      setVisible(false);
      dispatch(projectActions.reloadDesignProject());
    } else {
      messageError(res.message);
      setVisible(false);
    }
  };

  return (
    <Card
      className="rounded-lg bg-white w-[300px] "
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

        <Button
          type="primary"
          className="rounded-lg"
          onClick={() => {
            navigate(`${id}`);
          }}
        >
          Xem chi tiết
        </Button>
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
  );
};

export default DesignCard;
