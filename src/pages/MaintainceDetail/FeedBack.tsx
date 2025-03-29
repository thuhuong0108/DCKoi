import { createFeedback } from "@/api/feedback";
import { messageError } from "@/components";
import useForm from "@/hooks/useForm";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateFeedback } from "@/validations/validate";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useParams } from "react-router-dom";

const FeedBack = () => {
  const { feedback } = useAppSelector((state) => state.maintenanceTask);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const data = {
        no: id,
        rating: values.rating,
        description: values.description,
        type: "MAINTENANCE",
      };
      console.log(data);

      const res = await createFeedback(data);
      if (res.isSuccess) {
        formik.resetForm();
        dispatch(
          maintainceTaskActions.fetchFeedback({
            filter: {
              pageNumber: feedback.feedbacks.pageNumber,
              pageSize: feedback.feedbacks.pageSize,
            },
            id: id,
          })
        );
      } else {
        messageError(res.message);
      }
    },
    values: {
      rating: 0,
      description: "",
    },
    validationSchema: validateFeedback,
  });
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <Form>
        <Form.Item
          label="Đánh giá"
          help={regField("rating").error}
          validateStatus={regField("rating").error ? "error" : "success"}
        >
          <Rate
            value={formik.values.rating}
            onChange={(value) => formik.setFieldValue("rating", value)}
            // only decimal number
          />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          help={regField("description").error}
          validateStatus={regField("description").error ? "error" : "success"}
        >
          <TextArea
            {...regField("description")}
            rows={4}
            placeholder="Nhập nội dung phản hồi"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={loading}
            onClick={regHandleSubmit}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Gửi phản hồi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedBack;
