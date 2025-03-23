import { Button, TableComponent } from "@/components";
import { IssueStatus } from "@/models/enums/Status";
import { parseIssueStatus } from "@/utils/helpers";
import { Image } from "antd";
import React from "react";

const ModalIssue = ({ issue }) => {
  const parseValue = (
    value: IssueStatus | string,
    prop: string
  ): string | React.ReactNode => {
    if (prop === "status") {
      return parseIssueStatus(value as IssueStatus);
    }
    console.log(prop === "issueImage");
    if (prop === "issueImage") {
      return <Image width={200} src={value as string} alt="Hình ảnh vấn đề" />;
    }
    return value;
  };
  const formatTableData = (data) => {
    return data.map((item) => ({
      ...item,
      constructionItemName: item.constructionItem?.name || "Không có dữ liệu",
      staffFullName: item.staff?.fullName || "Không có dữ liệu",
    }));
  };

  const handleConfirm = () => {};
  return (
    <div>
      <Button primary title="Thêm vấn đề" />
      <TableComponent
        columns={[
          "Vấn đề",
          "Thuộc hàng mục công việc",
          "Mô tả chi tiết",
          "Nguyên nhân",
          "Giải pháp",
          "Trạng thái",
          "Hình ảnh",
          "Người chịu trách nhiệm",
          "Xác nhận",
        ]}
        data={formatTableData(issue.issues)}
        props={[
          "name",
          "constructionItemName",
          "description",
          "cause",
          "solution",
          "status",
          "issueImage",
          "staffFullName",
          "confirmImage",
        ]}
        actions={true}
        actionTexts={["Xác nhận"]}
        actionFunctions={[handleConfirm]}
        formatValue={parseValue}
        loading={issue.loading}
        enablePagination={false}
      />
    </div>
  );
};

export default ModalIssue;
