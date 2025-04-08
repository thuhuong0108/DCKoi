import { BlogsType } from "@/models/BlogsType";
import { Card } from "antd";
import React from "react";

const BlogsCard = ({ blog }: { blog: BlogsType }) => {
  return (
    <div className="w-[290px]">
      <Card
        className="h-full"
        cover={
          <img
            className="h-[178px]"
            alt="example"
            src="https://product.hstatic.net/200000653273/product/ca-koi-1_4c51c03c41d14231b77d788c54e07213.jpg"
          />
        }
      >
        {/* float status render */}
      </Card>
    </div>
  );
};

export default BlogsCard;
