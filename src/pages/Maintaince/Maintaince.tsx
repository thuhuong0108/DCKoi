import { Title } from "@/components";
import { MaintaineceType } from "@/models/MaintenancesTpe";
import { maintainceActions } from "@/redux/slices/maintaince/maintainceSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseMaintenceStatus } from "@/utils/helpers";
import { Button, Modal, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import ModalPayment from "./ModalPayment";
import { useNavigate } from "react-router-dom";

const Maintaince = () => {
  const dispatch = useAppDispatch();
  const maintenances = useAppSelector((state) => state.maintenances);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedMaintaince, setSelectedMaintaince] = useState<MaintaineceType>(
    {} as MaintaineceType
  );
  const navigate = useNavigate();
  const columns: TableColumnsType<MaintaineceType> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Diện tích",
      dataIndex: "area",
      key: "area",
    },

    {
      title: "Độ sâu",
      dataIndex: "depth",
      key: "depth",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (totalValue) => {
        return totalValue.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return parseMaintenceStatus(status);
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (!record.isPaid) {
          return (
            <Button
              type="primary"
              onClick={() => {
                setOpenPayment(true);
              }}
            >
              Thanh toán
            </Button>
          );
        }
        if (record.isPaid) {
          return (
            <Button
              onClick={() => {
                navigate(`${record.id}`);
              }}
            >
              Chi tiết
            </Button>
          );
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(
      maintainceActions.fetchMaintenances({
        filter: {
          pageNumber: 1,
          pageSize: 10,
        },
      })
    );
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Bảo dưỡng" />
      <Table
        onRow={(record) => {
          return {
            onClick: () => setSelectedMaintaince(record),
          };
        }}
        columns={columns}
        dataSource={maintenances.maintenances.maintenances.data}
        loading={maintenances.maintenances.loading}
        pagination={{
          total: maintenances.maintenances.maintenances.totalRecords,
          current: maintenances.maintenances.maintenances.pageNumber,
          pageSize: maintenances.maintenances.maintenances.pageSize,
          onChange: (page) => {
            dispatch(
              maintainceActions.fetchMaintenances({
                filter: {
                  pageNumber: page,
                  pageSize: 10,
                },
              })
            );
          },
        }}
      />
      <Modal
        title={`Thanh toán ${
          selectedMaintaince ? selectedMaintaince.name : ""
        }`}
        centered
        open={openPayment}
        footer={false}
        onClose={() => setOpenPayment(false)}
        onOk={() => setOpenPayment(false)}
        onCancel={() => setOpenPayment(false)}
        width={800}
      >
        {selectedMaintaince && <ModalPayment payment={selectedMaintaince} />}
      </Modal>
    </div>
  );
};

export default Maintaince;
