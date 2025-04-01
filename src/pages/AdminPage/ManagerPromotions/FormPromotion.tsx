import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { PromotionType } from "@/models/PromotionType";
import dayjs from "dayjs";
import useForm from "@/hooks/useForm";
import { useAppDispatch } from "@/redux/store/hook";
import { promotionActions } from "@/redux/slices/promotion/promotionSlices";

interface FormPromotionProps {
  visible: boolean;
  onCancel: () => void;
  promotion?: PromotionType | null;
}

const FormPromotion: React.FC<FormPromotionProps> = ({
  visible,
  onCancel,
  promotion,
}) => {
  const initialValues = {
    name: "",
    code: "",
    startAt: dayjs(),
    expiredAt: dayjs(),
    discount: 0,
    deadlineAt: dayjs(),
  };

  useEffect(() => {
    if (promotion) {
      formik.setFieldValue("name", promotion.name);
      formik.setFieldValue("code", promotion.code);
      formik.setFieldValue("startAt", dayjs(promotion.startAt));
      formik.setFieldValue("expiredAt", dayjs(promotion.expiredAt));
      formik.setFieldValue("deadlineAt", dayjs(promotion.deadlineAt));
      formik.setFieldValue("discount", promotion.discount);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("code", "");
      formik.setFieldValue("startAt", dayjs());
      formik.setFieldValue("expiredAt", dayjs());
      formik.setFieldValue("deadlineAt", dayjs());
      formik.setFieldValue("discount", 0);
    }
  }, [promotion]);
  const dispatch = useAppDispatch();

  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        startAt: values.startAt.format("YYYY-MM-DD"),
        expiredAt: values.expiredAt.format("YYYY-MM-DD"),
        deadlineAt: values.deadlineAt.format("YYYY-MM-DD"),
      };

      if (promotion) {
        console.log("Update promotion:", {
          ...formattedValues,
          id: promotion.id,
        });

        dispatch(
          promotionActions.updatePromotion({
            ...formattedValues,
            id: promotion.id,
          })
        );
      } else {
        dispatch(promotionActions.createPromotion(formattedValues));
      }

      onCancel();
    },
    values: promotion
      ? {
          ...promotion,
          startAt: dayjs(promotion.startAt),
          expiredAt: dayjs(promotion.expiredAt),
          deadlineAt: dayjs(promotion.deadlineAt),
        }
      : initialValues,
  });

  return (
    <Modal
      title={promotion ? "Cập nhật khuyến mãi" : "Tạo mới khuyến mãi"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <form onSubmit={regHandleSubmit}>
        <Form layout="vertical">
          <Form.Item
            label="Tên khuyến mãi"
            validateStatus={formik.errors.name ? "error" : ""}
            help={regField("name").error}
          >
            <Input placeholder="Nhập tên khuyến mãi" {...regField("name")} />
          </Form.Item>

          <Form.Item
            label="Mã khuyến mãi"
            validateStatus={formik.errors.code ? "error" : ""}
            help={regField("code").error}
          >
            <Input placeholder="Nhập mã khuyến mãi" {...regField("code")} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Ngày bắt đầu"
              validateStatus={formik.errors.startAt ? "error" : ""}
              help={regField("startAt").error}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                value={formik.values.startAt}
                onChange={(date) => formik.setFieldValue("startAt", date)}
              />
            </Form.Item>

            <Form.Item
              label="Ngày kết thúc"
              validateStatus={formik.errors.expiredAt ? "error" : ""}
              help={regField("expiredAt").error}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                value={formik.values.expiredAt}
                onChange={(date) => formik.setFieldValue("expiredAt", date)}
              />
            </Form.Item>
            <Form.Item
              label="Thời gian kết thúc"
              validateStatus={formik.errors.deadlineAt ? "error" : ""}
              help={regField("deadlineAt").error}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                value={formik.values.deadlineAt}
                onChange={(date) => formik.setFieldValue("deadlineAt", date)}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Giảm giá"
            validateStatus={formik.errors.discount ? "error" : ""}
            help={regField("discount").error}
          >
            <Input
              type="number"
              placeholder="Nhập giảm giá"
              {...regField("discount")}
            />
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" loading={loading} onClick={regHandleSubmit}>
              {promotion ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </form>
    </Modal>
  );
};

export default FormPromotion;
