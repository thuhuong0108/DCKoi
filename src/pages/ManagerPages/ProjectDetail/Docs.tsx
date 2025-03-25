import { postDocs } from "@/api/docs";
import { getDocsType } from "@/api/docsType";
import { Uploader } from "@/components";
import useForm from "@/hooks/useForm";
import { DocsProjectType, DocsType } from "@/models/DocsType";
import { DocsRequest } from "@/models/Request/DocsRequest";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateDocs } from "@/validations/validate";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Docs = () => {
  const { id } = useParams();
  const docs = useAppSelector((state) => state.projectStateDetail.docs);
  const [docsType, setDocsType] = useState<DocsType[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      projectStateDetailActions.fetchDocs({
        id: id,
        filter: { pageNumber: 1, pageSize: 5 },
      })
    );
  }, []);
  const conlumns: TableProps<DocsProjectType>["columns"] = [
    {
      title: "Tên tài liệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại tài liệu",
      dataIndex: "docType",
      key: "docType",
      render: (type) => {
        return type.name;
      },
    },
    {
      title: "Hình ảnh tài liệu",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        return <Image src={url} width={50} height={50} />;
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const request: DocsRequest = {
        name: values.name,
        url: values.url,
        docTypeId: values.docTypeId,
        projectId: id,
      };
      const res = await postDocs(request);
      if (res.isSuccess) {
        dispatch(
          projectStateDetailActions.fetchDocs({
            id: id,
            filter: {
              pageNumber: docs.docs.pageNumber,
              pageSize: docs.docs.pageSize,
            },
          })
        );
        setVisible(false);
      }
    },
    values: {
      name: "",
      url: "",
      docTypeId: "",
    },
    validationSchema: validateDocs,
  });

  const onUploadSuccess = (url: string) => {
    formik.setFieldValue("url", url);
    setTimeout(() => {
      regHandleSubmit();
    }, 0);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          const res = await getDocsType();
          if (res.isSuccess) {
            setDocsType(res.data);
          }
          setVisible(true);
        }}
      >
        Thêm tài liệu
      </Button>
      <Table<DocsProjectType>
        columns={conlumns}
        dataSource={docs.docs.data}
        pagination={
          docs.docs.totalRecords > 2
            ? {
                total: docs.docs.totalRecords,
                pageSize: docs.docs.pageSize,
                current: docs.docs.pageNumber,
                onChange: (page) => {
                  dispatch(
                    projectStateDetailActions.fetchDocs({
                      id: id,
                      filter: { pageNumber: page, pageSize: 5 },
                    })
                  );
                },
              }
            : false
        }
      />

      <Modal
        title="Thêm tài liệu"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form.Item
          label="Tên tài liệu"
          help={regField("name").error}
          validateStatus={regField("name").error ? "error" : "success"}
        >
          <Input {...regField("name")} />
        </Form.Item>
        <Form.Item
          label="Loại tài liệu"
          help={regField("docTypeId").error}
          validateStatus={regField("docTypeId").error ? "error" : "success"}
        >
          <Select
            onChange={(value) => {
              formik.setFieldValue("docTypeId", value);
            }}
            placeholder="Chọn loại vấn đề"
          >
            {docsType.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Uploader
          maxFiles={1}
          buttonText="Thêm tài liệu"
          onUploadSuccess={(url) => onUploadSuccess(url[0])}
        />
      </Modal>
    </div>
  );
};

export default Docs;
