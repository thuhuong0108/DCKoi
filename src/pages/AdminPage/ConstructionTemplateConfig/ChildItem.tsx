import { TemplateConstructionItemType } from "@/models";
import Typography from "antd/es/typography/Typography";
import React from "react";

const ChildItem = ({ item }: { item: TemplateConstructionItemType }) => {
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full my-1 border hover:border-black">
      <div className="text-lg font-bold">{item.name}</div>
      <Typography>Hệ số ước tính thi công: {item.duration}</Typography>
      {/* line */}
    </div>
  );
};

export default ChildItem;
