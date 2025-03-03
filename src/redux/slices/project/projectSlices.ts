import { ProjectType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store/store";

export interface ProjectState {
  loading: boolean;
  projects: Pagination<ProjectType>;
}

const initialState: ProjectState = {
  loading: false,
  projects: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};
export const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    fetchProject(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchProjectSuccess(state, action: PayloadAction<Pagination<ProjectType>>) {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectFaild(state) {
      state.loading = false;
    },

    reloadProject(state) {
      state.loading = true;
    },

    // createProject(state, action: PayloadAction<ProjectType>) {
    //   console.log("create Project: ", action.payload);
    // },
  },
});

export const selectedProject = (state: RootState) => state.project.projects;

export const selectedLoading = (state: RootState) => state.project.loading;

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
