import { TemplateConstructionType } from "@/models";
import { Card, Image, Typography } from "antd";
import React from "react";
import imgae from "@/assets/images/package.png";
import { displayActive } from "@/utils/parse";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({ item }: { item: TemplateConstructionType }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="shadow-md border border-black hover:shadow-xl hover:border-black drop-shadow-lg"
      hoverable
      style={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={() => navigate(`${item.id}`)}
    >
      <div className="flex flex-col justify-between w-full p-2">
        <div>
          <Card.Meta title={<span style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</span>} />
        </div>
        <div className="font-semibold">
          {item.isActive ? (
            <Typography.Text type="success">
              {displayActive(item.isActive)}
            </Typography.Text>
          ) : (
            <Typography.Text type="danger">
              {displayActive(item.isActive)}
            </Typography.Text>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col justify-between items-center p-2">
        <Image
          width={200}
          height={200}
          src={imgae}
          preview={false}
          alt="package"
        />
      </div>
    </Card>
  );
};

export default TemplateCard;
