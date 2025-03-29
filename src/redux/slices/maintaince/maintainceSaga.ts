import { call, fork, put, select, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";

import { MaintenancesState, maintainceActions } from "./maintainceSlices";
import { Filter } from "@/models/Common";
import {
  getPagingMaintenance,
  getPagingMaintenanceByStatus,
} from "@/api/maintennances";
import { MaintainceStatus } from "@/models/enums/Status";

function* fetchMaintenancesWorker(action: PayloadAction<{ filter: Filter }>) {
  try {
    const data = yield call(getPagingMaintenance, action.payload.filter);
    if (data.isSuccess) {
      yield put(maintainceActions.fetchMaintenancesSuccess(data));
    } else {
      messageError(data.message);
      yield put(maintainceActions.fetchMaintenancesFailed());
    }
  } catch (error) {
    yield put(maintainceActions.fetchMaintenancesFailed());
    console.log("error", error);
  }
}
function* fetchMaintenancesByStatusWorker(
  action: PayloadAction<{ filter: Filter; status: MaintainceStatus }>
) {
  try {
    const data = yield call(
      getPagingMaintenanceByStatus,
      action.payload.filter,
      action.payload.status
    );
    if (data.isSuccess) {
      yield put(maintainceActions.fetchMaintenancesSuccess(data));
    } else {
      messageError(data.message);
      yield put(maintainceActions.fetchMaintenancesFailed());
    }
  } catch (error) {
    yield put(maintainceActions.fetchMaintenancesFailed());
    console.log("error", error);
  }
}

function* fetchMaintenancesWatcher() {
  while (true) {
    const action = yield take(maintainceActions.fetchMaintenances.type);
    yield fork(fetchMaintenancesWorker, action);
  }
}

function* fetchMaintenancesByStatusWatcher() {
  while (true) {
    const action = yield take(maintainceActions.fetchMaintenancesByStatus.type);
    yield fork(fetchMaintenancesByStatusWorker, action);
  }
}

export function* maintainceSaga() {
  yield fork(fetchMaintenancesWatcher);
  yield fork(fetchMaintenancesByStatusWatcher);
}
