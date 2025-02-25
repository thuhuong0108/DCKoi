import { TemplateConstructionItemType } from "@/models";
import React from "react";

const ChildItem = ({ item }: { item: TemplateConstructionItemType }) => {
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full my-1 border hover:border-black">
      <div className="text-lg font-bold">{item.name}</div>
      {/* line */}
    </div>
  );
};

export default ChildItem;
