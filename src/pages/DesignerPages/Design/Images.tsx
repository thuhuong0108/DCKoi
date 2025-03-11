import { DesignDetailType } from "@/models";
import { ImageDesignResponse } from "@/models/Response/ImageDesignResponse";
import { ImageList, ImageListItem } from "@mui/material";
import { Typography } from "antd";

import React, { useState } from "react";

const Images = ({ design }: { design: DesignDetailType }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col items-center full ">
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
    </div>
  );
};

export default Images;
