import { ProjectType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store/store";

export interface ProjectBoardState {
  loading: boolean;
  projects: Pagination<ProjectType>;
}

const initialState: ProjectBoardState = {
  loading: false,
  projects: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const projectBoardSlice = createSlice({
  name: "projectBoard",
  initialState: initialState,
  reducers: {
    fetchProjectBoardAdmin(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchProjectBoard(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchProjectBoardSuccess(
      state,
      action: PayloadAction<Pagination<ProjectType>>
    ) {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectBoardFaild(state) {
      state.loading = false;
    },
    reloadProjectBoard(state) {
      state.loading = true;
    },
  },
});

export const projectBoardActions = projectBoardSlice.actions;

export default projectBoardSlice.reducer;
