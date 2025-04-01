import { getBlog } from "@/api/blog";
import { BlogsType } from "@/models/BlogsType";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd"; // or any other loading/error components you prefer

const BlogsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBlog(id);
      if (res.isSuccess) {
        setBlog(res.data);
      } else {
        setError("Failed to fetch blog details");
      }
    } catch (err) {
      setError("An error occurred while fetching the blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Blog not found" type="warning" showIcon />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>

        {blog.staff && (
          <div className="flex items-center mb-6">
            <img
              src={blog.staff.avatar}
              alt={blog.staff.fullName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-600">{blog.staff.fullName}</span>
            {blog.createdAt && (
              <span className="text-gray-500 text-sm ml-4">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}

        <div className="text-gray-700 whitespace-pre-line">
          {blog.description}
        </div>
      </article>
    </div>
  );
};

export default BlogsDetail;
