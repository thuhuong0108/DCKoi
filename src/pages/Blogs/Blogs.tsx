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
  Image,
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
    <div className=" min-h-screen flex flex-col">
      <Banner />
      <div className="mx-autow-full px-4 py-8">
        <List
          loading={loading}
          grid={{ gutter: 24, column: 3 }}
          size="large"
          dataSource={blogs.data}
          renderItem={(blog) => (
            <List.Item key={blog.id}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src={blog.staff?.avatar}
                      icon={<UserOutlined />}
                      size="large"
                    />
                  }
                  title={
                    <Link
                      to={`/blogs/${blog.id}`}
                      style={{ fontWeight: "bold", fontSize: 16 }}
                    >
                      {blog.name}
                    </Link>
                  }
                  description={
                    <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <UserOutlined />
                        <Text>{blog.staff?.fullName || "Unknown Author"}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarOutlined />
                        <Text>{formatDate(new Date(blog.createdAt))}</Text>
                      </div>
                    </div>
                  }
                />
                <Divider style={{ margin: "12px 0" }} />
                <Image
                  src={
                    "https://product.hstatic.net/200000653273/product/ca-koi-1_4c51c03c41d14231b77d788c54e07213.jpg"
                  }
                  alt={blog.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 12,
                  }}
                  preview={false}
                />
              </Card>
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
