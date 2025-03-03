import { ProjectDetailType } from "@/models/ProjectType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store/store";
import { ProjectStatus } from "@/models/enums/Status";

export interface ProjectDetailState {
  loading: boolean;
  projectDefault: ProjectDetailType;
}

const initialState: ProjectDetailState = {
  loading: false,
  projectDefault: {
    id: "",
    customerName: "",
    address: "",
    phone: "",
    email: "",
    area: 0,
    depth: 0,
    packageName: "",
    standOut: false,
    note: "",
    status: ProjectStatus.CONSTRUCTING,
    createdDate: "",
    updatedDate: "",
    staff: [],
    package: {
      id: "",
      name: "",
      description: "",
      isActive: false,
      price: [],
      items: [],
    },
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
      state.projectDefault = action.payload;
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
