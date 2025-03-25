import { IssueProjectType } from "./../../../models/IssueProjectType";
import { IssueRequest } from "@/models/Request/IssueRequest";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IssueState {
  issue: {
    loading: boolean;
    issues: IssueRequest;
  };
}

const initialState: IssueState = {
  issue: {
    loading: false,
    issues: {
      name: "",
      description: "",
      cause: "",
      reason: "",
      solution: "",
      issueImages: "",
      confirmImage: "",
      estimateAt: "",
      actualAt: "",
      issueTypeId: "",
      staffId: "",
    },
  },
};

export const issuelSlice = createSlice({
  name: "issue",
  initialState: initialState,
  reducers: {
    //create
    createIssue(
      state,
      action: PayloadAction<{ issue: IssueRequest; constructionItemId: string }>
    ) {},

    //update
    updateIssue(state, action: PayloadAction<IssueProjectType>) {},

    //delete
    deleteIssue(state, action: PayloadAction<string>) {},

    confirmIssue(state, action: PayloadAction<string>) {},
  },
});

// selectors
export const selectIssue = (state: RootState) => state.issue.issues;
export const selectLoading = (state: RootState) => state.issue.loading;

// actions
export const issueActions = issuelSlice.actions;

// reducer
export default issuelSlice.reducer;
