import { Title } from "@/components";
import { BlogsType } from "@/models/BlogsType";
import { blogActions } from "@/redux/slices/blog/blogSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Button, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";

const BlogManager = () => {
  const blogsState = useAppSelector((state) => state.blog);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      blogActions.fetchBlog({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);
  const columns: TableColumnsType<BlogsType> = [
    {
      title: "Tiêu đề ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full space-y-4 w-full">
      <Title name="Blogs" />

      <div>
        {" "}
        <Button type="primary" onClick={() => setVisible(true)}>
          Thêm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={blogsState.blogs.data}
        pagination={{
          total: blogsState.blogs.totalRecords,
          pageSize: blogsState.blogs.pageSize,
          current: blogsState.blogs.pageNumber,
        }}
        loading={blogsState.loading}
        onChange={(pagination) => {
          dispatch(
            blogActions.fetchBlog({
              pageNumber: pagination.current || 1,
              pageSize: pagination.pageSize || 10,
            })
          );
        }}
      />
      <CreateBlog open={visible} setOpen={setVisible} />
    </div>
  );
};

export default BlogManager;
