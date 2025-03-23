import { Title } from "@/components";
import React from "react";
import CardIssue from "./CardIssue";
import { Pagination } from "@mui/material";

const IssueProject = () => {
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách vấn đề thi công" />
      <CardIssue />
      <CardIssue />
      <CardIssue />

      <Pagination count={10} color="primary" />
      {/* <Pagination count={items.totalPages} color="primary" /> */}
    </div>
  );
};

export default IssueProject;
