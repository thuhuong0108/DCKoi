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
  const data = {
    work: [{ task: "Site preparation", time: "10 hrs 20 mins" }],
    description: [
      { detail: "Remove trees, shrubs, weeds, and other natural obstacles." },
      {
        detail:
          "Excavate the soil and level the ground to create a foundation.",
      },
      {
        detail:
          "Compact the soil to ensure the foundation is strong enough to bear loads and maintain stability.",
      },
    ],
    date: "Tue, October 10 2024",
  };

  return (
    <div>
      <Steps
        items={constructionItem.map((item, index) => ({
          title: item.name,
          description: `Thời gian dự kiến: ${item.estimateAt}`,
          status:
            item.status === ItemConstructionStatus.DONE ? "finish" : "wait",
        }))}
      />

      <div>
        <ReportConstruction data={data} />
      </div>
    </div>
  );
};

export default Constructions;
