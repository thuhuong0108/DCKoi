import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MaintaineceType,
  MaintenancesTaskType,
} from "@/models/MaintenancesTpe";

import { IssueProjectType, StaffType } from "@/models";
import { TaskStage } from "@/models/enums/TaskStage";

export interface MaintainceConstructorState {
  loading: boolean;
  tasks: Pagination<MaintenancesTaskType>;
  detail: {
    loading: boolean;
    detail: MaintenancesTaskType;
  };
  status: string;

  issue: {
    loading: boolean;
    issue: Pagination<IssueProjectType>;
    detail: {
      loading: boolean;
      detail: IssueProjectType;
    };
  };
}

const initialState: MaintainceConstructorState = {
  loading: false,
  status: TaskStage.PROCESSING,
  tasks: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  },
  detail: {
    loading: false,
    detail: {
      maintenanceRequest: {
        name: "",
        address: "",
        area: 0,
        type: "",
        depth: 0,
        createdAt: "",
      },
    },
  },
  issue: {
    loading: false,
    issue: {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalRecords: 0,
    },
    detail: {
      loading: false,
      detail: {
        status: TaskStage.PROCESSING,
        maintenanceRequest: {
          name: "",
          address: "",
          area: 0,
          type: "",
          depth: 0,
          createdAt: "",
        },
      },
    },
  },
};

export const maintainceConstructorSlice = createSlice({
  name: "maintainceConstructor",
  initialState: initialState,
  reducers: {
    fetchMaintainceConstructor(
      state,
      action: PayloadAction<{ filter: Filter; status: string }>
    ) {
      state.status = action.payload.status;
      state.loading = true;
    },
    fetchMaintainceConstructorSuccess(
      state,
      action: PayloadAction<Pagination<MaintenancesTaskType>>
    ) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchMaintainceConstructorFailed(state) {
      state.loading = false;
    },
    fetchMaintainceDetail(state, action: PayloadAction<string>) {
      state.detail.loading = true;
    },
    fetchMaintainceDetailSuccess(
      state,
      action: PayloadAction<MaintaineceType>
    ) {
      state.detail.loading = false;
      state.detail.detail = action.payload;
    },
    fetchMaintainceDetailFailed(state) {
      state.detail.loading = false;
    },
    updateMaintenancesTask(
      state,
      action: PayloadAction<{ id: string; request: any }>
    ) {
      state.detail.loading = true;
    },
    updateMaintenancesTaskSuccess(state) {
      state.detail.loading = false;
    },
    updateMaintenancesTaskFailed(state) {
      state.detail.loading = false;
    },
    fetchIssue(
      state,
      action: PayloadAction<{ filter: Filter; status: string }>
    ) {
      state.issue.loading = true;
    },
    fetchIssueSuccess(
      state,
      action: PayloadAction<Pagination<IssueProjectType>>
    ) {
      state.issue.loading = false;
      state.issue.issue = action.payload;
    },
    fetchIssueFailed(state) {
      state.issue.loading = false;
    },

    fetchIssueDetail(state, action: PayloadAction<string>) {
      state.issue.detail.loading = true;
    },
    fetchIssueDetailSuccess(state, action: PayloadAction<IssueProjectType>) {
      state.issue.detail.loading = false;
      state.issue.detail.detail = action.payload;
    },
    fetchIssueDetailFailed(state) {
      state.issue.detail.loading = false;
    },
  },
});

// actions
export const maintainceConstructorActions = maintainceConstructorSlice.actions;

// reducer
export default maintainceConstructorSlice.reducer;
