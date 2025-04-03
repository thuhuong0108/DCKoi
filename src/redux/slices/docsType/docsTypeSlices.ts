import { RootState } from "./../../store/store";
import { DocsType } from "@/models/DocsType";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DocsTypeState {
  loading: boolean;
  docsType: Pagination<DocsType>;
}

const initialState: DocsTypeState = {
  loading: false,
  docsType: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  },
};

const docsTypeSlice = createSlice({
  name: "docsType",
  initialState,
  reducers: {
    getDocsType(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    getDocsTypeSuccess(state, action: PayloadAction<Pagination<DocsType>>) {
      state.loading = false;
      state.docsType = action.payload;
    },
    getDocsTypeFail(state) {
      state.loading = false;
    },
    createDocsType(state, action: PayloadAction<DocsType>) {
      state.loading = true;
    },
    createDocsTypeSuccess(state) {
      state.loading = false;
    },
    createDocsTypeFail(state) {
      state.loading = false;
    },
    updateDocsType(state, action: PayloadAction<DocsType>) {
      state.loading = true;
    },
    updateDocsTypeSuccess(state) {
      state.loading = false;
    },
    updateDocsTypeFail(state) {
      state.loading = false;
    },
    deleteDocsType(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    deleteDocsTypeSuccess(state) {
      state.loading = false;
    },
    deleteDocsTypeFail(state) {
      state.loading = false;
    },
  },
});

export const docsTypeActions = docsTypeSlice.actions;

export default docsTypeSlice.reducer;
