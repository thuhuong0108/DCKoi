import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { BlogsType } from "@/models/BlogsType";
import { Filter, Pagination } from "@/models/Common";
import create from "@ant-design/icons/lib/components/IconFont";

export interface BlogState {
  loading: boolean;
  blogs: Pagination<BlogsType>;
}

const initialState: BlogState = {
  loading: false,
  blogs: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    fetchBlog(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchBlogSuccess(state, action: PayloadAction<Pagination<BlogsType>>) {
      state.blogs = action.payload;
      state.loading = false;
    },
    fetchBlogFailed(state) {
      state.loading = false;
    },
    createBlog(state, action: PayloadAction<BlogsType>) {
      state.loading = true;
    },
  },
});

// actions
export const blogActions = blogSlice.actions;

// reducer
export default blogSlice.reducer;
