import { createBlogs } from "@/api/blog";
import { messageError } from "@/components";
import useForm from "@/hooks/useForm";
import { BlogsType } from "@/models/BlogsType";
import { blogActions } from "@/redux/slices/blog/blogSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateBlog } from "@/validations/validate";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const CreateBlog = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const BlogState = useAppSelector((state) => state.blog);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const data: BlogsType = {
        name: values.name,
        description: values.description,
      };
      console.log(data);

      const res = await createBlogs(data);
      if (res.isSuccess) {
        dispatch(
          blogActions.fetchBlog({
            pageNumber: BlogState.blogs.pageNumber,
            pageSize: BlogState.blogs.pageSize,
          })
        );
        setOpen(false);
      } else {
        messageError(res.message);
      }
    },
    values: {
      name: "",
      description: "",
    },
    validationSchema: validateBlog,
  });
  return (
    <Modal
      title="Tạo blog"
      visible={open}
      onOk={() => regHandleSubmit()}
      onCancel={() => setOpen(false)}
      okButtonProps={{ loading: loading }}
      width={2000}
    >
      <Form layout="vertical">
        <Form.Item
          label="Tiêu đề"
          help={regField("name").error}
          validateStatus={regField("name").error ? "error" : "success"}
        >
          <Input {...regField("name")} />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          help={regField("description").error}
          validateStatus={regField("description").error ? "error" : "success"}
        >
          <TextArea {...regField("description")} rows={20} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBlog;
