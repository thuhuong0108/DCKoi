import { RootState } from "./../../store/store";
import { ProjectDetailType } from "@/models/ProjectType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResultWithAData } from "@/models/Common";

export interface ProjectDetailState {
  loading: boolean;
  projectDefault: ApiResultWithAData<ProjectDetailType>;
}

const initialState: ProjectDetailState = {
  loading: false,
  projectDefault: {
    isSuccess: false,
    statusCode: 0,
    message: "",
    data: {} as ProjectDetailType,
  },
};
export const projectDetailSlice = createSlice({
  name: "projectDetail",
  initialState: initialState,
  reducers: {
    fetchProjectDetail(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchProjectDetailSuccess(state, action: PayloadAction<ProjectDetailType>) {
      state.projectDefault.data = action.payload;
      state.loading = false;
    },
    fetchProjectDetailFaild(state) {
      state.loading = false;
    },
  },
});

export const selectedProjectDetail = (state: RootState) =>
  state.projectDetail.projectDefault;

export const selectedLoading = (state: RootState) =>
  state.projectDetail.loading;

export const projectDetailActions = projectDetailSlice.actions;

export default projectDetailSlice.reducer;
