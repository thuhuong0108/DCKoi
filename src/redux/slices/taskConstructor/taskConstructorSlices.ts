import { Filter, Pagination } from "@/models/Common";
import { TaskStage } from "@/models/enums/TaskStage";
import { TaskRequest } from "@/models/Request/TaskRequest";
import { TaskType } from "@/models/TaskType";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskConstructorState {
  task: {
    loading: boolean;
    tasks: Pagination<TaskType>;
  };
  taskDetail: {
    loading: boolean;
    task: TaskType;
  };
}

const initialState: TaskConstructorState = {
  task: {
    loading: false,
    tasks: {
      data: [],
      totalPages: 0,
      pageNumber: 1,
      pageSize: 10,
      totalRecords: 0,
    },
  },
  taskDetail: {
    loading: false,
    task: {
      id: "",
      name: "",
      status: TaskStage.DONE,
      reason: "",
      imageUrl: "",
      deadlineAt: "",
      updatedAt: "",
      constructionItem: {
        status: "DONE",
      },
      createdAt: "",
      staff: null,
      isActive: true,
    },
  },
};

const taskConstructorSlice = createSlice({
  name: "taskConstructor",
  initialState,
  reducers: {
    fetchTasks: (
      state,
      action: PayloadAction<{ filter: Filter; id: string }>
    ) => {
      state.task.loading = true;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Pagination<TaskType>>) => {
      state.task.loading = false;
      state.task.tasks = action.payload;
    },
    fetchTasksFailed: (state) => {
      state.task.loading = false;
    },
    fetchTaskDetail: (state, action: PayloadAction<string>) => {
      state.taskDetail.loading = true;
    },
    fetchTaskDetailSuccess: (state, action: PayloadAction<TaskType>) => {
      state.taskDetail.loading = false;
      state.taskDetail.task = action.payload;
    },
    fetchTaskDetailFailed: (state) => {
      state.taskDetail.loading = false;
    },
  },
});

export const taskConstructorActions = taskConstructorSlice.actions;

export default taskConstructorSlice.reducer;
