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
  const managers = useAppSelector((state) => state.staff.staffs);
  const loading = useAppSelector((state) => state.staff.loading);

  const navigate = useNavigate();
  const hasDesigner = staffs?.some(
    (staff) => staff.position === RoleUser.DESIGNER.toString()
  );

  const [visible, setVisible] = useState(false);

  const handleOpenDesignerModal = () => {
    dispatch(staffActions.fetchDesignerStaff({ pageNumber: 1, pageSize: 10 }));
    setVisible(true);
  };

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

  const renderModal = () => {
    return (
      <Modal
        visible={visible}
        title="Chọn quản lí"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="flex flex-row justify-between items-center">
          {/* no. , staff code, fullName, action*/}
          <Typography.Text strong aria-level={2}>
            <label>STT</label>
          </Typography.Text>
          <div className="flex items-center gap-2 w-36">
            <span className="text-sm font-medium">Họ và tên</span>
          </div>
          <label>Thao tác</label>
        </div>
        <div>
          {managers.data.map((manager, index) => (
            <div
              key={manager.id}
              className="flex flex-row justify-between items-center"
            >
              <label>{index + 1}</label>
              <div className="flex items-center gap-2 w-36">
                <span className="text-sm">{manager.fullName}</span>
              </div>
              <Button
                type="primary"
                onClick={() => handleAddDesigner(manager.id)}
              >
                Chọn
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    );
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
            if (!hasDesigner) {
              handleOpenDesignerModal();
            } else {
              navigate(`/manager/design/${id}`);
            }
          }}
        >
          {hasDesigner ? "Xem chi tiết" : "Chọn thiết kế"}
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

      {renderModal()}
    </Card>
  );
};

export default DesignCard;
