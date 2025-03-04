import { Pagination } from "@/models/Common";
import { QuotationProjectType } from "@/models/ProjectType";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuotaitonProjectState {
  loading: boolean;
  quotationProject: Pagination<QuotationProjectType>;
}

const initialState: QuotaitonProjectState = {
  loading: false,
  quotationProject: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const quotationProjectSlice = createSlice({
  name: "quotaionProject",
  initialState: initialState,
  reducers: {
    fetchQuotationProject(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchQuotationProjectSuccess(
      state,
      action: PayloadAction<Pagination<QuotationProjectType>>
    ) {
      state.quotationProject = action.payload;
      state.loading = false;
    },
    fetchQuotationProjectFaild(state) {
      state.loading = false;
    },
  },
});

export const selectedQuotationProject = (state: RootState) =>
  state.quotationProject.quotationProject;

export const selectedLoading = (state: RootState) =>
  state.quotationProject.loading;

export const quotationProjectActions = quotationProjectSlice.actions;

export default quotationProjectSlice.reducer;
