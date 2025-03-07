import React from "react";

import { Card } from "antd";

const CardProject = () => {
  return (
    <Card title="Card Title">
      <Card.Grid className=" text-left flex flex-col">
        Thông tin nhân viên
      </Card.Grid>
      <Card.Grid className=" text-left flex flex-col">
        Thông tin thi công
      </Card.Grid>
      <Card.Grid className=" text-left flex flex-col">Hợp đồng</Card.Grid>
    </Card>
  );
};

export default CardProject;
