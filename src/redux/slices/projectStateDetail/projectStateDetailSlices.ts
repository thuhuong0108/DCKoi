import {
  DesignType,
  ProjectType,
  TemplateConstructionItemType,
} from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store/store";
import { ProjectStatus } from "@/models/enums/Status";
import { ProjectDetailType } from "@/models/ProjectType";

export interface ProjectStateDetail {
  project: {
    loading: boolean;
    detail: ProjectDetailType;
  };
  design: {
    loading: boolean;
    designs: DesignType[];
  };
  construction: {
    loading: boolean;
    constructions: TemplateConstructionItemType[];
  };
}

const initialState: ProjectStateDetail = {
  project: {
    loading: false,
    detail: {
      id: "",
      name: "",
      address: "",
      area: 0,
      depth: 0,
      phone: "",
      customerName: "",
      staff: [],
      standOut: false,
      email: "",
      note: "",
      package: null,
      status: ProjectStatus.CONSTRUCTING,
    },
  },
  design: {
    loading: false,
    designs: [],
  },
  construction: {
    loading: false,
    constructions: [],
  },
};

export const projectStateDetailSlice = createSlice({
  name: "projectStateDetail",
  initialState: initialState,
  reducers: {
    fetchProjectDetail(state, action: PayloadAction<string>) {
      state.project.loading = true;
    },
    fetchProjectDetailSuccess(state, action: PayloadAction<ProjectDetailType>) {
      state.project.detail = action.payload;
      state.project.loading = false;
    },
    fetchProjectDetailFailed(state) {
      state.project.loading = false;
    },
    fetchDesigns(state, action: PayloadAction<string>) {
      state.design.loading = true;
    },
    fetchDesignsSuccess(state, action: PayloadAction<DesignType[]>) {
      state.design.designs = action.payload;
      state.design.loading = false;
    },
    fetchDesignsFailed(state) {
      state.design.loading = false;
    },
    fetchConstructions(state, action: PayloadAction<string>) {
      state.construction.loading = true;
    },
    fetchConstructionsSuccess(
      state,
      action: PayloadAction<TemplateConstructionItemType[]>
    ) {
      state.construction.constructions = action.payload;
      state.construction.loading = false;
    },
    fetchConstructionsFailed(state) {
      state.construction.loading = false;
    },
  },
});

export const projectStateDetailActions = projectStateDetailSlice.actions;

export default projectStateDetailSlice.reducer;
