import { call, fork, put, select, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";
import { message } from "antd";
import {
  constructionItemActions,
  ConstructionItemState,
} from "./constructionItemSlices";
import {
  createTask,
  getItembyIdItem,
  getTaskById,
  getTaskByItem,
} from "@/api/construction";
import { Filter } from "@/models/Common";
import { TaskRequest } from "@/models/Request/TaskRequest";
import {
  ProjectStateDetail,
  projectStateDetailActions,
} from "../projectStateDetail/projectStateDetailSlices";

function* fetchConstructionItemWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getItembyIdItem, action.payload);
    if (data.isSuccess) {
      yield put(
        constructionItemActions.fetchConstructionItemSuccess(data.data)
      );
    } else {
      yield put(constructionItemActions.fetchConstructionItemFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(constructionItemActions.fetchConstructionItemFailed());
  }
}

function* fetchTasksWorker(
  action: PayloadAction<{ id: string; filter: Filter }>
) {
  try {
    const data = yield call(
      getTaskByItem,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(constructionItemActions.fetchTasksSuccess(data));
    } else {
      yield put(constructionItemActions.fetchTasksFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(constructionItemActions.fetchTasksFailed());
  }
}

function* createTaskWorker(
  action: PayloadAction<{ id: string; task: TaskRequest }>
) {
  try {
    const data = yield call(createTask, action.payload.id, action.payload.task);
    if (data.isSuccess) {
      const constructionItemState: ConstructionItemState = yield select(
        (state) => state.constructionItemStage
      );

      yield put(
        constructionItemActions.fetchTasks({
          id: constructionItemState.item.constructionItem.id,
          filter: {
            pageNumber: constructionItemState.task.tasks.pageNumber,
            pageSize: constructionItemState.task.tasks.pageSize,
          },
        })
      );
      const projectDetailtemState: ProjectStateDetail = yield select(
        (state) => state.projectStateDetail
      );
      yield put(
        projectStateDetailActions.fetchConstructions(
          projectDetailtemState.project.detail.id
        )
      );
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* fetchTaskWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getTaskById, action.payload);
    if (data.isSuccess) {
      yield put(constructionItemActions.fetchTaskSuccess(data.data));
    } else {
      yield put(constructionItemActions.fetchTasksFailed());
    }
  } catch (error) {
    message.error("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(constructionItemActions.fetchTasksFailed());
  }
}

function* fetchConstructionItemWatcher() {
  while (true) {
    const action = yield take(constructionItemActions.fetchConstructionItem);
    yield call(fetchConstructionItemWorker, action);
  }
}

function* fetchTasksWatcher() {
  while (true) {
    const action = yield take(constructionItemActions.fetchTasks);
    yield call(fetchTasksWorker, action);
  }
}

function* createTaskWatcher() {
  while (true) {
    const action = yield take(constructionItemActions.createTask);
    yield call(createTaskWorker, action);
  }
}

function* fetchTaskWatcher() {
  while (true) {
    const action = yield take(constructionItemActions.fetchTask);
    yield call(fetchTaskWorker, action);
  }
}

export function* constructionItemSaga() {
  yield fork(fetchConstructionItemWatcher);
  yield fork(fetchTasksWatcher);
  yield fork(createTaskWatcher);
  yield fork(fetchTaskWatcher);
}
