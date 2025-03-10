import useForm from "@/hooks/useForm";
import { DesignDetailType } from "@/models";
import { validateDeny } from "@/validations/validate";
import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { confirmAlert, confirmWarning } from "@/components";
import { useAppDispatch } from "@/redux/store/hook";
import { useParams } from "react-router-dom";
import { designActions } from "@/redux/slices/design/designSlices";
import { imageDesignActions } from "@/redux/slices/imageDesign/imageDesignSlices";
import { DesignState } from "@/models/enums/DesignState";

const Images = ({ design }: { design: DesignDetailType }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: (values) => {
      confirmAlert({
        title: "Xác nhận",
        message: "Bạn có chắc chắn muốn từ chối thiết kế này?",
        yes: () => {
          dispatch(
            imageDesignActions.rejectDesign({
              id: design.id,
              reason: values.reason,
              idProject: id,
            })
          );
          handleDispatch();
        },
      });
    },
    values: {
      reason: "",
    },
    validationSchema: validateDeny,
  });

  const dispatch = useAppDispatch();

  const handleDispatch = async () => {
    await dispatch(designActions.fetchDesign(id));
  };

  const handleAccept = () => {
    confirmWarning({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn chấp nhận thiết kế này?",
      yes: () => {
        dispatch(
          imageDesignActions.acceptDesign({
            id: design.id,
            idProject: id,
          })
        );
      },
    });
  };

  if (design.version === 0) {
    return (
      <div className="flex flex-col items-center full">
        <Typography.Text type="warning"></Typography.Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center full">
      <Typography.Title level={4}>
        Thiết kế {design.type} phiên bản {design.version}
      </Typography.Title>

      {design.designImages.length === 0 ? (
        <div className="h-96 flex items-center justify-center w-[600px]"></div>
      ) : (
        <img
          src={design.designImages[currentImage].imageUrl}
          alt="Product Image"
          style={{
            width: "600px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />
      )}

      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {design.designImages.map((image, index) => (
          <img
            key={index}
            onClick={() => setCurrentImage(index)}
            src={image.imageUrl}
            alt={`Product Image ${index + 1}`}
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              border: `2px solid ${
                index === currentImage ? "#1890ff" : "transparent"
              }`,
              marginRight: "8px",
              cursor: "pointer",
              display: "inline-block",
            }}
          />
        ))}
      </div>

      {design.status === DesignState.OPENING && (
        <form className="mt-3" onSubmit={regHandleSubmit}>
          <Form.Item
            validateStatus={Boolean(regField("reason").error) ? "error" : ""}
            help={regField("reason").error}
          >
            <Input
              {...regField("reason")}
              className="w-[600px] h-36 border border-gray-300 rounded-lg p-2"
              placeholder="Nhập lý do từ chối"
            ></Input>
          </Form.Item>

          <div className="flex justify-between">
            <Button
              type="primary"
              className="mt-2 bg-green-600"
              onClick={handleAccept}
            >
              Chấp nhận
            </Button>
            <Button
              type="primary"
              className="mt-2 bg-red-600"
              loading={loading}
              htmlType="submit"
            >
              Từ chối
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Images;
