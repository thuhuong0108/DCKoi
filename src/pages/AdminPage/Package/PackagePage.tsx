import React from "react";
import { PackgeCard, Title } from "@/components";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
const PackagePage = () => {
  const navigate = useNavigate();
  const handleClick = (name: string) => {
    navigate(`/admin/packages/${name.toLowerCase()}`);
  };
  const data = ["PACKAGES", "PACKAGE-ITEMS"];
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Package" />
      <Row>
        {data.map((item, index) => (
          <PackgeCard name={item} key={index} onClick={handleClick} />
        ))}
      </Row>
    </div>
  );
};

export default PackagePage;
