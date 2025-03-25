import { call, fork, put, select, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";

import {
  TaskConstructorState,
  taskConstructorActions,
} from "./taskConstructorSlices";

import { Filter } from "@/models/Common";
import { getConstuctorTask } from "@/api/project";
import { getTaskById } from "@/api/construction";

function* fetchConstructionItemWorker(
  action: PayloadAction<{ filter: Filter; id: string }>
) {
  try {
    const data = yield call(
      getConstuctorTask,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(taskConstructorActions.fetchTasksSuccess(data));
    } else {
      yield put(taskConstructorActions.fetchTasksFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(taskConstructorActions.fetchTasksFailed());
  }
}

function* fectTaskWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getTaskById, action.payload);
    if (data.isSuccess) {
      yield put(taskConstructorActions.fetchTaskDetailSuccess(data.data));
    } else {
      yield put(taskConstructorActions.fetchTaskDetailFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(taskConstructorActions.fetchTaskDetailFailed());
  }
}

function* fetchConstructionItemWatcher() {
  while (true) {
    const action = yield take(taskConstructorActions.fetchTasks);
    yield call(fetchConstructionItemWorker, action);
  }
}

function* fetchTaskDetailWatcher() {
  while (true) {
    const action = yield take(taskConstructorActions.fetchTaskDetail);
    yield call(fectTaskWorker, action);
  }
}

export function* taskConstructorSaga() {
  yield fork(fetchConstructionItemWatcher);
  yield fork(fetchTaskDetailWatcher);
}
