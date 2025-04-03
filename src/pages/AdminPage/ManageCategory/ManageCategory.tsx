import React from "react";
import DocsType from "./DocsType";
import IssueType from "./IssueType";
import { Card } from "antd";

const ManageCategory = () => {
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full space-y-4 w-full">
      <div className="flex flex-row  w-full" title="Danh mục văn bản">
        <Card className="flex flex-col w-1/2">
          <h1 className="text-2xl font-semibold">Danh mục văn bản</h1>
          <DocsType />
        </Card>
        <Card className="flex flex-col w-1/2">
          <h1 className="text-2xl font-semibold">Danh mục vấn đề</h1>
          <IssueType />
        </Card>
      </div>
    </div>
  );
};

export default ManageCategory;
