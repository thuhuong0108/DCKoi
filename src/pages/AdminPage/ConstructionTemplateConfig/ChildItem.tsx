import { TemplateConstructionItemType } from "@/models";
import React from "react";

const ChildItem = ({ item }: { item: TemplateConstructionItemType }) => {
  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md w-[250px] h-full">
      <div className="text-lg font-bold">{item.name}</div>
      {/* line */}
    </div>
  );
};

export default ChildItem;
