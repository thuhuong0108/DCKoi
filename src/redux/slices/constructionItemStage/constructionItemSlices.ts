import { TemplateConstructionItemType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { TaskStage } from "@/models/enums/TaskStage";
import { TaskRequest } from "@/models/Request/TaskRequest";
import { TaskType } from "@/models/TaskType";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConstructionItemState {
  item: {
    loading: boolean;
    constructionItem: TemplateConstructionItemType;
  };
  task: {
    loading: boolean;
    tasks: Pagination<TaskType>;
  };
  selectedTask: {
    task: TaskType;
    loading: boolean;
  };
}

const initialState: ConstructionItemState = {
  item: {
    loading: false,
    constructionItem: {
      id: "",
      name: "",
      child: [],
      description: "",
      isActive: true,
      childs: [],
    },
  },
  task: {
    loading: false,
    tasks: {
      data: [],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 0,
    },
  },
  selectedTask: {
    task: {
      id: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      deadlineAt: "",
      isActive: true,
      staff: null,
      constructionItem: null,
      status: TaskStage.OPEN,
    },
    loading: false,
  },
};

export const constructionItemSlice = createSlice({
  name: "constructionItem",
  initialState: initialState,
  reducers: {
    fetchConstructionItem(state, action: PayloadAction<string>) {
      state.item.loading = true;
    },
    fetchConstructionItemSuccess(
      state,
      action: PayloadAction<TemplateConstructionItemType>
    ) {
      state.item.constructionItem = action.payload;
      state.item.loading = false;
    },
    fetchConstructionItemFailed(state) {
      state.item.loading = false;
    },
    fetchTasks(state, action: PayloadAction<{ id: string; filter: Filter }>) {
      state.task.loading = true;
    },
    fetchTasksSuccess(state, action: PayloadAction<Pagination<TaskType>>) {
      state.task.tasks = action.payload;
      state.task.loading = false;
    },
    fetchTasksFailed(state) {
      state.task.loading = false;
    },
    createTask(
      state,
      action: PayloadAction<{ id: string; task: TaskRequest }>
    ) {
      state.task.loading = true;
    },
    updateTask(state, action: PayloadAction<TaskType>) {
      console.log("update task: ", action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      console.log("delete task: ", action.payload);
    },
    fetchTask(state, action: PayloadAction<string>) {
      state.selectedTask.loading = true;
    },
    fetchTaskSuccess(state, action: PayloadAction<TaskType>) {
      state.selectedTask.task = action.payload;
      state.selectedTask.loading = false;
    },
    fetchTaskFailed(state) {
      state.selectedTask.loading = false;
    },
  },
});

// actions
export const constructionItemActions = constructionItemSlice.actions;

// reducers

export default constructionItemSlice.reducer;
