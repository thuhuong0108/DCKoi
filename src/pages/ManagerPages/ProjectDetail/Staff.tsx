import { Staff } from "@/models/ProjectType";
import { Button, Table } from "antd";
import React from "react";
import { staffConlumns } from "./type";

const Staff = ({ staff }: { staff: Staff[] }) => {
  return (
    <div>
      <Table<Staff>
        columns={staffConlumns}
        dataSource={staff}
        pagination={false}
      />
    </div>
  );
};

export default Staff;
