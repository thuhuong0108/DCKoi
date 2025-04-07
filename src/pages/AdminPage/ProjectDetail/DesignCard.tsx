import { publicDesign } from "@/api/design";
import { DesignType } from "@/models";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { Button, Switch, Typography, message } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DesignCard = ({ design }: { design: DesignType }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleTogglePublic = async () => {
    const res = await publicDesign(design.id);
    if (res.isSuccess) {
      dispatch(
        projectStateDetailActions.publicDesignSuccess({
          id: design.id,
          isPublic: !design.isPublic,
        })
      );
    }
  };

  return (
    <div className="flex flex-col items-center full">
      <div className="flex justify-between items-center w-full mb-4">
        <Typography.Title level={4} className="mb-0">
          Thiết kế {design.type}
        </Typography.Title>
        {design.type === "3D" && (
          <div className="flex items-center">
            <span
              className="mr-2"
              style={{ color: design.isPublic ? "#52c41a" : "#ff4d4f" }}
            >
              {design.isPublic ? "Công khai" : "Riêng tư"}
            </span>

            <Switch
              checked={design.isPublic}
              onChange={handleTogglePublic}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              style={{
                backgroundColor: design.isPublic ? "#52c41a" : "#ff4d4f",
              }}
            />
          </div>
        )}
      </div>

      {design.designImages.length === 0 ? (
        <div className="h-96 flex items-center justify-center w-[600px]">
          <Typography.Text type="secondary">Không có hình ảnh</Typography.Text>
        </div>
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
    </div>
  );
};

export default DesignCard;
