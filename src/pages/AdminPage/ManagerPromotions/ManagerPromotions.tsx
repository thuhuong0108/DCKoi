import { confirmAlert, Title } from "@/components";
import { PromotionType } from "@/models/PromotionType";
import { promotionActions } from "@/redux/slices/promotion/promotionSlices";
import { useAppSelector } from "@/redux/store/hook";
import { Button, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import FormPromotion from "./FormPromotion";

const ManagerPromotions = () => {
  const promotionSatate = useAppSelector((state) => state.promotion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(promotionActions.fetchPromotion({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionType | null>(null);

  const handleEdit = (promotion: PromotionType) => {
    setSelectedPromotion(promotion);
    setVisible(true);
  };

  const handleCreate = () => {
    setSelectedPromotion(null);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setSelectedPromotion(null);
  };

  const columns: TableColumnsType<PromotionType> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "discount",
      dataIndex: "discount",
      key: "discount",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button className="btn-primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button
            className="btn-danger"
            onClick={() => {
              confirmAlert({
                message: "Bạn có chắc chắn muốn xóa không?",
                title: "Xác nhận",
                yes() {
                  dispatch(promotionActions.deletePromotion(record.id));
                },
              });
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full space-y-4">
      <Title name="Đợt khuyến mãi" />

      <div className="flex justify-end">
        <Button className="btn-primary" onClick={handleCreate}>
          Thêm mới
        </Button>
      </div>

      <div className="w-full">
        <Table
          columns={columns}
          dataSource={promotionSatate.promotions.data}
          pagination={{
            total: promotionSatate.promotions.totalRecords,
            pageSize: promotionSatate.promotions.pageSize,
            current: promotionSatate.promotions.pageNumber,
            onChange: (page) => {
              dispatch(
                promotionActions.fetchPromotion({
                  pageNumber: page,
                  pageSize: 10,
                })
              );
            },
          }}
        />

        <FormPromotion
          visible={visible}
          onCancel={handleClose}
          promotion={selectedPromotion}
        />
      </div>
    </div>
  );
};

export default ManagerPromotions;
