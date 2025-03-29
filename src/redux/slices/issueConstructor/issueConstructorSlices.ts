import { Filter, Pagination } from "@/models/Common";
import { TaskStage } from "@/models/enums/TaskStage";
import { TaskRequest } from "@/models/Request/TaskRequest";
import { IssueProjectType } from "@/models/IssueProjectType";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IssueStatus } from "@/models/enums/Status";

export interface IssueConstructorState {
  issue: {
    loading: boolean;
    issues: Pagination<IssueProjectType>;
  };
  issueDetail: {
    loading: boolean;
    issue: IssueProjectType;
  };
}

const initialState: IssueConstructorState = {
  issue: {
    loading: false,
    issues: {
      data: [],
      totalPages: 0,
      pageNumber: 1,
      pageSize: 10,
      totalRecords: 0,
    },
  },
  issueDetail: {
    loading: false,
    issue: {
      id: "",
      name: "",
      status: IssueStatus.DONE,
      reason: "",
      description: "",
      cause: "",
      solution: "",
      confirmImage: "",
      constructionItem: null,
      issueImage: "",
      issueType: null,
      updatedAt: "",
      createdAt: "",
      staff: null,
    },
  },
};

const issueConstructorSlice = createSlice({
  name: "issueConstructor",
  initialState,
  reducers: {
    fetchIssues: (
      state,
      action: PayloadAction<{ filter: Filter; id: string }>
    ) => {
      state.issue.loading = true;
    },
    fetchIssuesSuccess: (
      state,
      action: PayloadAction<Pagination<IssueProjectType>>
    ) => {
      state.issue.loading = false;
      state.issue.issues = action.payload;
    },
    fetchIssuesFailed: (state) => {
      state.issue.loading = false;
    },
    fetchIssueDetail: (state) => {
      state.issueDetail.loading = true;
    },
    fetchIssueDetailSuccess: (
      state,
      action: PayloadAction<IssueProjectType>
    ) => {
      state.issueDetail.loading = false;
      state.issueDetail.issue = action.payload;
    },
    fetchIssueDetailFailed: (state) => {
      state.issueDetail.loading = false;
    },
  },
});

export const issueConstructorActions = issueConstructorSlice.actions;

export default issueConstructorSlice.reducer;
