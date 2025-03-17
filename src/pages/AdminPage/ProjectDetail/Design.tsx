import { DesignType } from "@/models";
import { Collapse, CollapseProps } from "antd";
import DesignCard from "./DesignCard";

const Design = ({ designs }: { designs: DesignType[] }) => {
  const design2D = designs.find((design) => design.type === "2D");

  const design3D = designs.find((design) => design.type === "3D");

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Bản vẽ 3D",
      children: (
        <div>
          <DesignCard design={design3D} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Bản vẽ kĩ thuật",
      children: (
        <div>
          <DesignCard design={design2D} />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Collapse items={items} />
    </div>
  );
};

export default Design;
