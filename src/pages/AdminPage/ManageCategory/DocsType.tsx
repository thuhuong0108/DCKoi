import useForm from "@/hooks/useForm";
import { DocsType } from "@/models/DocsType";
import { docsTypeActions } from "@/redux/slices/docsType/docsTypeSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validatePackageItem } from "@/validations/validate";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";

const DocsType = () => {
  const docsTypeState = useAppSelector((state) => state.docsType);
  const dispatch = useAppDispatch();
  const colunms: TableColumnsType<DocsType> = [
    {
      title: "Tên loại văn bản",
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
      docsTypeActions.getDocsType({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);
  const [visible, setVisible] = useState(false);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: (values) => {
      dispatch(docsTypeActions.createDocsType(values));
      setVisible(false);
    },
    values: {
      name: "",
    },
    validationSchema: validatePackageItem,
  });
  return (
    <div className="m-2">
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm mới
      </Button>
      <Table
        loading={docsTypeState.loading}
        columns={colunms}
        dataSource={docsTypeState.docsType.data}
        pagination={{
          total: docsTypeState.docsType.totalRecords,
          pageSize: docsTypeState.docsType.pageSize,
          current: docsTypeState.docsType.pageNumber,
        }}
        onChange={(pagination) => {
          dispatch(
            docsTypeActions.getDocsType({
              pageNumber: pagination.current || 1,
              pageSize: pagination.pageSize || 10,
            })
          );
        }}
      />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => regHandleSubmit()}
      >
        <Form layout="vertical">
          <Form.Item
            required
            label="Tên loại văn bản"
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

export default DocsType;
