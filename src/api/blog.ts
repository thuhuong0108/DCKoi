import http from "@/utils/http";
import { ApiResult, ApiResultWithAData, Filter } from "@/models/Common";

import { endPoint } from "@/utils/endPoint";
import { BlogsType } from "@/models/BlogsType";

const getBlogs = async (
  filter: Filter
): Promise<ApiResultWithAData<BlogsType>> => {
  const response = await http.get(
    `${endPoint.blogs.getBlogs}?PageSize=${filter.pageSize}&PageNumber=${filter.pageNumber}`
  );

  return response;
};

const createBlogs = async (item: BlogsType): Promise<ApiResult> => {
  const response = await http.post(endPoint.blogs.createBlog, item);
  return response;
};

const getBlog = async (id: string): Promise<ApiResultWithAData<BlogsType>> => {
  const response = await http.get(endPoint.blogs.getBlog(id));

  return response;
};

export { getBlogs, createBlogs, getBlog };
