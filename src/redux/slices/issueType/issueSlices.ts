import { selectedIssue } from "./../issue/issueSlices";
import { RootState } from "./../../store/store";
import { IssueType, ServiceType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IssueTypeState {
  loading: boolean;
  issueTypes: Pagination<IssueType>;
}

const initialState: IssueTypeState = {
  loading: false,
  issueTypes: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};
export const issueTypeSlice = createSlice({
  name: "issueType",
  initialState: initialState,
  reducers: {
    fetchIssueType(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchIssueTypeSuccess(state, action: PayloadAction<Pagination<IssueType>>) {
      state.issueTypes = action.payload;
      state.loading = false;
    },
    fetchIssueTypeFaild(state) {
      state.loading = false;
    },

    createIssueType(state, action: PayloadAction<IssueType>) {},

    updateIssueType(state, action: PayloadAction<IssueType>) {},

    deleteIssueType(state, action: PayloadAction<string>) {},
  },
});

export const selectedIssueType = (state: RootState) =>
  state.issueType.issueTypes;

export const selectedLoading = (state: RootState) => state.issueType.loading;

export const issueTypeActions = issueTypeSlice.actions;

export default issueTypeSlice.reducer;
