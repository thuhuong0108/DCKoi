import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { TemplateConstructionTypeDetail } from "@/models";

export interface TemplateConstructionDetailState {
  loading: boolean;
  item: TemplateConstructionTypeDetail;
}

const initialState: TemplateConstructionDetailState = {
  loading: false,
  item: {
    id: "",
    name: "",
    description: "",
    isActive: false,
    templateContructionItems: [],
  },
};

export const templateConstructionDetailSlice = createSlice({
  name: "templateConstructionDetail",
  initialState: initialState,
  reducers: {
    getTemplateConstructionDetail(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getTemplateConstructionDetailSuccess(
      state,
      action: PayloadAction<TemplateConstructionTypeDetail>
    ) {
      state.loading = false;
      state.item = action.payload;
    },
    getTemplateConstructionDetailFailed(state) {
      state.loading = false;
    },
    activeTemplateConstructionDetail(state, action: PayloadAction<string>) {},
    createTemplateConstructionDetail(
      state,
      action: PayloadAction<TemplateConstructionTypeDetail>
    ) {},
    resetTemplateConstructionDetail(state) {
      state.loading = false;
      state.item = {
        id: "",
        name: "",
        description: "",
        isActive: false,
        templateContructionItems: [],
      };
    },
  },
});

// selectors
export const selectTemplateConstructionDetail = (state: RootState) =>
  state.templateConstructionDetail.item;
export const selectTemplateConstructionDetailLoading = (state: RootState) =>
  state.templateConstructionDetail.loading;

// actions
export const templateConstructionDetailActions =
  templateConstructionDetailSlice.actions;

// reducer
export default templateConstructionDetailSlice.reducer;
