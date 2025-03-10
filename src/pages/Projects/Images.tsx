import { ImageDesignResponse } from "@/models/Response/ImageDesignResponse";

import { useState } from "react";

const Images = ({ images }: { images: ImageDesignResponse[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col items-center full ">
      {images.length === 0 ? (
        <div className="h-96 flex items-center justify-center w-[600px]"></div>
      ) : (
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {images.map((image, index) => (
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
      )}
    </div>
  );
};

export default Images;
