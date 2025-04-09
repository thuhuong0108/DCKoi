import { TemplateConstructionItemType } from "@/models";
import { ItemConstructionStatus } from "@/models/enums/Status";
import { Steps } from "antd";
import React from "react";
import ReportConstruction from "./ReportConstruction";

const Constructions = ({
  constructionItem,
}: {
  constructionItem: TemplateConstructionItemType[];
}) => {
  return (
    <div>
      <Steps
        items={constructionItem.map((item, index) => ({
          title: item.name,
          description: `Thời gian ${item.actualAt ? "thực tế" : "dự kiến"}: ${
            item.actualAt ? item.actualAt : item.estimateAt
          }`,
          status:
            item.status === ItemConstructionStatus.DONE ? "finish" : "wait",
        }))}
      />
    </div>
  );
};

export default Constructions;
