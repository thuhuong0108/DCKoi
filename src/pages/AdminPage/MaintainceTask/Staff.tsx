import { Staff } from "@/models/ProjectType";
import { Button, List, Modal, Pagination, Table, Typography } from "antd";
import React, { useState } from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { assignConsultant } from "@/api/project";
import { useParams } from "react-router-dom";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { messageError } from "@/components";
import { updateMaintenancesTask } from "@/api/maintennances";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";

const Staff = ({
  staff,
  idTaskParent,
}: {
  staff: Staff[];
  idTaskParent: string;
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const optionStaff = useAppSelector((state) => state.staff);

  const handleOpenOption = () => {
    dispatch(
      staffActions.fetchConstructorStaff({ pageNumber: 1, pageSize: 5 })
    );
    setVisible(true);
  };

  const renderModal = () => {
    return (
      <Modal
        title="Chọn người thực hiện"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        <List
          itemLayout="horizontal"
          dataSource={optionStaff.staffs.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={async () => {
                    const res = await updateMaintenancesTask(idTaskParent, {
                      staffId: item.id,
                    });
                    if (res.isSuccess) {
                      await dispatch(
                        maintainceTaskActions.fetchChildTask(idTaskParent)
                      );
                      setVisible(false);
                    } else {
                      messageError(res.message);
                    }
                  }}
                >
                  Chọn
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.fullName}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </Modal>
    );
  };

  return (
    <>
      <Avatar.Group
        size="large"
        max={{
          count: 2,
          style: { color: "#f56a00", backgroundColor: "#fde3cf" },
        }}
      >
        {staff.map((item) => (
          <Avatar src={item.avatar} />
        ))}
      </Avatar.Group>
      <Tooltip title="Thêm nhân viên">
        <Button
          onClick={() => {
            handleOpenOption();
          }}
          type="primary"
          shape="circle"
          icon={<UserOutlined />}
          className="ml-2"
        />
      </Tooltip>

      {renderModal()}
    </>
  );
};

export default Staff;
