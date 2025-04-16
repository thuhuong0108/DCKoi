import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MaintaineceType,
  MaintenancesTaskType,
} from "@/models/MaintenancesTpe";

import { Position } from "@/models/enums/Position";
import { FeedbackType } from "@/models/FeedbackType";
import { IssueProjectType, StaffType } from "@/models";

export interface MaintainceTaskState {
  loading: boolean;
  maintenanceRequestTasks: MaintenancesTaskType[];
  detail: {
    id: string;
    name: string;
    description: string;
    area: number;
    depth: number;
    address: string;
    totalValue: number;
    type: string;
    isPaid: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  feedback: {
    loading: boolean;
    feedbacks: Pagination<FeedbackType>;
  };

  childTask: {
    loading: boolean;
    tasks: MaintenancesTaskType[];
    staffs: StaffType[];
  };
  issue: {
    loading: boolean;
    issues: Pagination<IssueProjectType>;
  };
}

const initialState: MaintainceTaskState = {
  loading: false,
  maintenanceRequestTasks: [],

  detail: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "string",
    description: "string",
    area: 0,
    depth: 0,
    address: "string",
    totalValue: 0,
    type: "string",
    isPaid: true,
    status: "string",
    createdAt: "2025-03-27T14:43:48.095Z",
    updatedAt: "2025-03-27T14:43:48.095Z",
  },
  feedback: {
    loading: false,
    feedbacks: {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  },
  childTask: {
    loading: false,
    tasks: [],
    staffs: [],
  },
  issue: {
    loading: false,
    issues: {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  },
};

export const maintainceTaskSlice = createSlice({
  name: "maintainceTask",
  initialState: initialState,
  reducers: {
    fetchMaintainceTask(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchMaintainceTaskSuccess(state, action: PayloadAction<MaintaineceType>) {
      state.loading = false;
      state.maintenanceRequestTasks = action.payload.maintenanceRequestTasks;
      state.detail = action.payload;
    },
    fetchMaintainceTaskFailed(state) {
      state.loading = false;
    },

    fetchChildTask(state, action: PayloadAction<string>) {
      state.childTask.loading = true;
    },
    fetchChildTaskSuccess(state, action: PayloadAction<MaintenancesTaskType>) {
      state.childTask.loading = false;
      state.childTask.tasks = action.payload.childs;
      state.childTask.staffs = action.payload.staffs;
    },
    fetchChildTaskFailed(state) {
      state.childTask.loading = false;
    },
    fetchFeedback(
      state,
      action: PayloadAction<{ id: string; filter: Filter }>
    ) {
      state.feedback.loading = true;
    },
    fetchFeedbackSuccess(
      state,
      action: PayloadAction<Pagination<FeedbackType>>
    ) {
      state.feedback.loading = false;
      state.feedback.feedbacks = action.payload;
    },
    fetchFeedbackFailed(state) {
      state.feedback.loading = false;
    },
    fetchIssue(state, action: PayloadAction<{ id: string; filter: Filter }>) {
      state.issue.loading = true;
    },
    fetchIssueSuccess(
      state,
      action: PayloadAction<Pagination<IssueProjectType>>
    ) {
      state.issue.loading = false;
      state.issue.issues = action.payload;
    },
    fetchIssueFailed(state) {
      state.issue.loading = false;
    },
  },
});

// actions
export const maintainceTaskActions = maintainceTaskSlice.actions;

//reducer
export default maintainceTaskSlice.reducer;
