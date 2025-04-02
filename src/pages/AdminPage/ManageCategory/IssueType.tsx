import useForm from "@/hooks/useForm";
import { IssueType } from "@/models";
import { DocsType } from "@/models/DocsType";
import { docsTypeActions } from "@/redux/slices/docsType/docsTypeSlices";
import { issueTypeActions } from "@/redux/slices/issueType/issueSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validatePackageItem } from "@/validations/validate";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";

const IssueType = () => {
  const issueTypeState = useAppSelector((state) => state.issueType);
  const dispatch = useAppDispatch();
  const colunms: TableColumnsType<IssueType> = [
    {
      title: "Loại vấn đề",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value, record) => {
        return (
          <div>
            <Button onClick={() => {}}>Xóa</Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(
      issueTypeActions.fetchIssueType({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: (values) => {
      dispatch(issueTypeActions.createIssueType(values));
      setVisible(false);
    },
    values: {
      name: "",
    },
    validationSchema: validatePackageItem,
  });
  const [visible, setVisible] = useState(false);
  return (
    <div className="m-2">
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm mới
      </Button>
      <Table
        loading={issueTypeState.loading}
        columns={colunms}
        dataSource={issueTypeState.issueTypes.data}
        pagination={{
          total: issueTypeState.issueTypes.totalRecords,
          pageSize: issueTypeState.issueTypes.pageSize,
          current: issueTypeState.issueTypes.pageNumber,
        }}
        onChange={(pagination) => {
          dispatch(
            issueTypeActions.fetchIssueType({
              pageNumber: pagination.current || 1,
              pageSize: pagination.pageSize || 10,
            })
          );
        }}
      />

      <Modal
        title="Tạo loại vấn đề"
        visible={visible}
        onOk={() => regHandleSubmit()}
        onCancel={() => setVisible(false)}
        okButtonProps={{ loading: loading }}
      >
        <Form layout="vertical">
          <Form.Item
            required
            label="Tên loại vấn đề"
            help={regField("name").error}
            validateStatus={regField("name").error ? "error" : "success"}
          >
            <Input {...regField("name")} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IssueType;
