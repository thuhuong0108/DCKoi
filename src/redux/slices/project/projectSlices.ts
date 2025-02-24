import { Filter, Pagination } from "@/models/Common";
import { RootState } from "../../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "@/models";

export interface ProjectState {
    loading: boolean;
    project: Pagination<ProjectType>;
}

const initialState: ProjectState = {
    loading: false,
    project: {
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
        fetchProjectSuccess(
            state,
            action: PayloadAction<Pagination<ProjectType>>
        ) {
            state.project = action.payload;
            state.loading = false;
        },
        fetchProjectFailed(state) {
            state.loading = false;
        },

        //create
        createProject(state, action: PayloadAction<ProjectType>) {
            state.project.data.unshift(action.payload);
        },
        //update
        updateProject(state, action: PayloadAction<ProjectType>) {
            console.log("update project", action.payload);
            
        },
        //delete
        deleteProject(state, action: PayloadAction<ProjectType>) {
            console.log("delete project", action.payload);
        }
    },
});

//selectors
export const selectProject = (state: RootState) =>
    state.project.project;
  export const selectLoading = (state: RootState) => state.project.loading;

//actions
export const projectActions = projectSlice.actions;

//reducers
export default projectSlice.reducer;