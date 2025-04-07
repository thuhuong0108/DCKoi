import { blogActions } from "@/redux/slices/blog/blogSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import {
  Card,
  List,
  Pagination,
  Spin,
  Typography,
  Divider,
  Avatar,
} from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import BlogsCard from "./BlogsCard";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/helpers";
import Banner from "./Banner";

const { Title, Text } = Typography;

const Blogs = () => {
  const dispatch = useAppDispatch();
  const { blogs, loading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(blogActions.fetchBlog({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  const handlePageChange = (page: number, pageSize?: number) => {
    dispatch(
      blogActions.fetchBlog({ pageNumber: page, pageSize: pageSize || 10 })
    );
  };

  return (
    <div className="h-screen flex flex-col justify-start items-start ">
      <Banner />
      <div className="   mx-auto  ">
        <List
          loading={loading}
          itemLayout="vertical"
          grid={{ gutter: 16, column: 3 }}
          size="large"
          dataSource={blogs.data}
          renderItem={(blog) => (
            <List.Item key={blog.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src={blog.staff?.avatar} icon={<UserOutlined />} />
                }
                title={<Link to={`/blogs/${blog.id}`}>{blog.name}</Link>}
                description={
                  <div className="flex items-center space-x-4">
                    <Text>
                      <UserOutlined />{" "}
                      {blog.staff?.fullName || "Unknown Author"}
                    </Text>
                    <Text>
                      <CalendarOutlined />{" "}
                      {formatDate(new Date(blog.createdAt))}
                    </Text>
                  </div>
                }
              />
              <BlogsCard blog={blog} />
              <Divider />
            </List.Item>
          )}
        />

        <div className="">
          <Pagination
            defaultCurrent={1}
            total={blogs.totalRecords}
            pageSize={10}
            onChange={handlePageChange}
            showSizeChanger={false}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
