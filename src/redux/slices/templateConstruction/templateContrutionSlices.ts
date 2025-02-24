import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { TemplateConstructionType } from "@/models";

export interface TemplateConstructionState {
  loading: boolean;
  templateConstructions: Pagination<TemplateConstructionType>;
}

const initialState: TemplateConstructionState = {
  loading: false,
  templateConstructions: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  },
};

export const templateConstructionSlice = createSlice({
  name: "templateConstruction",
  initialState: initialState,
  reducers: {
    getTemplateConstruction(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    getTemplateConstructionSuccess(
      state,
      action: PayloadAction<Pagination<TemplateConstructionType>>
    ) {
      state.loading = false;
      state.templateConstructions = action.payload;
    },
    getTemplateConstructionFailed(state) {
      state.loading = false;
    },
    createTemplateConstruction(
      state,
      action: PayloadAction<TemplateConstructionType>
    ) {},
  },
});

// selectors
export const selectTemplateConstruction = (state: RootState) =>
  state.templateConstruction.templateConstructions;
export const selectTemplateConstructionLoading = (state: RootState) =>
  state.templateConstruction.loading;

// actions
export const templateConstructionActions = templateConstructionSlice.actions;

// reducer
export default templateConstructionSlice.reducer;
