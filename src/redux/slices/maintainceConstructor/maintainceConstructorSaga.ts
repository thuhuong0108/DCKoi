import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import {
  maintainceConstructorActions,
  MaintainceConstructorState,
} from "./maintainceConstructorSlices";
import { MaintenancesTaskType } from "@/models/MaintenancesTpe";
import {
  getTask,
  getTaskMaintenancesConsstructor,
  updateMaintenancesTask,
} from "@/api/maintennances";

function* fetchMaintainceConstructorWorker(
  action: PayloadAction<{ filter: Filter; status: string }>
) {
  try {
    const data = yield call(
      getTaskMaintenancesConsstructor,
      action.payload.filter,
      action.payload.status
    );
    if (data.isSuccess) {
      yield put(
        maintainceConstructorActions.fetchMaintainceConstructorSuccess(data)
      );
    } else {
      messageError(data.message);
      yield put(
        maintainceConstructorActions.fetchMaintainceConstructorFailed()
      );
    }
  } catch (error) {
    yield put(maintainceConstructorActions.fetchMaintainceConstructorFailed());
    console.log("error", error);
  }
}

function* fetchMaintainceDetailWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getTask, action.payload);
    if (data.isSuccess) {
      yield put(
        maintainceConstructorActions.fetchMaintainceDetailSuccess(data.data)
      );
    } else {
      messageError(data.message);
      yield put(maintainceConstructorActions.fetchMaintainceDetailFailed());
    }
  } catch (error) {
    yield put(maintainceConstructorActions.fetchMaintainceDetailFailed());
    console.log("error", error);
  }
}

function* updateMaintenancesTasklWorker(
  action: PayloadAction<{ id: string; request: any }>
) {
  try {
    const data = yield call(
      updateMaintenancesTask,
      action.payload.id,
      action.payload.request
    );
    if (data.isSuccess) {
      yield put(maintainceConstructorActions.updateMaintenancesTaskSuccess());
      const maintainceConstructorState: MaintainceConstructorState =
        yield select((state) => state.maintainceConstructor);
      yield put(
        maintainceConstructorActions.fetchMaintainceConstructor({
          filter: {
            pageNumber: maintainceConstructorState.tasks.pageNumber,
            pageSize: maintainceConstructorState.tasks.pageSize,
          },
          status: maintainceConstructorState.status,
        })
      );
      yield put(
        maintainceConstructorActions.fetchMaintainceDetail(action.payload.id)
      );
      messageSuccess(data.message);
    } else {
      messageError(data.message);
      yield put(maintainceConstructorActions.updateMaintenancesTaskFailed());
    }
  } catch (error) {
    yield put(maintainceConstructorActions.updateMaintenancesTaskFailed());
    console.log("error", error);
  }
}

function* fetchMaintainceConstructorDetailWatcher() {
  while (true) {
    const action = yield take(
      maintainceConstructorActions.fetchMaintainceDetail.type
    );
    yield fork(fetchMaintainceDetailWorker, action);
  }
}

function* fetchMaintainceConstructorWatcher() {
  while (true) {
    const action = yield take(
      maintainceConstructorActions.fetchMaintainceConstructor.type
    );
    yield fork(fetchMaintainceConstructorWorker, action);
  }
}

function* updateMaintenancesTaskWatcher() {
  while (true) {
    const action = yield take(
      maintainceConstructorActions.updateMaintenancesTask.type
    );
    yield fork(updateMaintenancesTasklWorker, action);
  }
}

export function* maintainceConstructorSaga() {
  yield fork(fetchMaintainceConstructorWatcher);
  yield fork(fetchMaintainceConstructorDetailWatcher);
  yield fork(updateMaintenancesTaskWatcher);
}
