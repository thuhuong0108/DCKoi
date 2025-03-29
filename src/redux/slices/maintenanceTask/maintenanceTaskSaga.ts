import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import {
  MaintainceTaskState,
  maintainceTaskActions,
} from "./maintenanceTaskSlices";
import { MaintenancesTaskType } from "@/models/MaintenancesTpe";

import {
  getChildTask,
  getMaintennanceById,
  getTask,
} from "@/api/maintennances";
import { getFeedbacks, getFeedbacksMaintaince } from "@/api/feedback";

function* fetchMaintenancesTaskWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getMaintennanceById, action.payload);
    if (data.isSuccess) {
      yield put(maintainceTaskActions.fetchMaintainceTaskSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(maintainceTaskActions.fetchMaintainceTaskFailed());
    }
  } catch (error) {
    yield put(maintainceTaskActions.fetchMaintainceTaskFailed());
    console.log("error", error);
  }
}

function* fetchChildTaskWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getTask, action.payload);
    if (data.isSuccess) {
      yield put(maintainceTaskActions.fetchChildTaskSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(maintainceTaskActions.fetchChildTaskFailed());
    }
  } catch (error) {
    yield put(maintainceTaskActions.fetchChildTaskFailed());
    console.log("error", error);
  }
}

function* fetchFeedbackWorker(
  action: PayloadAction<{ id: string; filter: Filter }>
) {
  try {
    const data = yield call(
      getFeedbacksMaintaince,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(maintainceTaskActions.fetchFeedbackSuccess(data));
    } else {
      messageError(data.message);
      yield put(maintainceTaskActions.fetchFeedbackFailed());
    }
  } catch (error) {
    yield put(maintainceTaskActions.fetchFeedbackFailed());
    console.log("error", error);
  }
}

function* fetchMaintenancesTaskWatcher() {
  while (true) {
    const action = yield take(maintainceTaskActions.fetchMaintainceTask.type);
    yield fork(fetchMaintenancesTaskWorker, action);
  }
}

function* fetchChildTaskWatcher() {
  while (true) {
    const action = yield take(maintainceTaskActions.fetchChildTask.type);
    yield fork(fetchChildTaskWorker, action);
  }
}

function* fetchFeedbackWatcher() {
  while (true) {
    const action = yield take(maintainceTaskActions.fetchFeedback.type);
    yield fork(fetchFeedbackWorker, action);
  }
}

export function* maintainceTaskSaga() {
  yield fork(fetchMaintenancesTaskWatcher);
  yield fork(fetchChildTaskWatcher);
  yield fork(fetchFeedbackWatcher);
}
