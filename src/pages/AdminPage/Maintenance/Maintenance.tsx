import { Title } from "@/components";
import { MaintainceStatus } from "@/models/enums/Status";
import { MaintaineceType } from "@/models/MaintenancesTpe";
import { maintainceActions } from "@/redux/slices/maintaince/maintainceSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseMaintenceStatus } from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Table, TableColumnsType, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Maintaince = () => {
  const dispatch = useAppDispatch();
  const maintenances = useAppSelector((state) => state.maintenances);
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>(MaintainceStatus.REQUESTING);
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
      title: "Địa chỉ",
      dataIndex: "type",
      key: "type",
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
        return (
          <Tooltip title="Chi tiết">
            <Button
              onClick={() => {
                navigate(`${record.id}`);
              }}
              type="primary"
              icon={<EyeOutlined />}
            ></Button>
          </Tooltip>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      maintainceActions.fetchMaintenancesByStatus({
        filter: {
          pageNumber: 1,
          pageSize: 10,
        },
        status: status as MaintainceStatus,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      maintainceActions.fetchMaintenancesByStatus({
        filter: {
          pageNumber: 1,
          pageSize: 10,
        },
        status: status as MaintainceStatus,
      })
    );
  }, [status]);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Bảo dưỡng" />

      <div>
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          className="mb-5 w-[200px]"
        >
          <Select.Option value={MaintainceStatus.PROCESSING}>
            {parseMaintenceStatus(MaintainceStatus.PROCESSING)}
          </Select.Option>
          <Select.Option value={MaintainceStatus.REQUESTING}>
            {parseMaintenceStatus(MaintainceStatus.REQUESTING)}
          </Select.Option>
          <Select.Option value={MaintainceStatus.DONE}>
            {parseMaintenceStatus(MaintainceStatus.DONE)}
          </Select.Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={maintenances.maintenances.maintenances.data}
        loading={maintenances.maintenances.loading}
        pagination={{
          total: maintenances.maintenances.maintenances.totalRecords,
          current: maintenances.maintenances.maintenances.pageNumber,
          pageSize: maintenances.maintenances.maintenances.pageSize,
          onChange: (page) => {
            dispatch(
              maintainceActions.fetchMaintenancesByStatus({
                filter: {
                  pageNumber: page,
                  pageSize: 10,
                },
                status: status as MaintainceStatus,
              })
            );
          },
        }}
      />
    </div>
  );
};

export default Maintaince;
