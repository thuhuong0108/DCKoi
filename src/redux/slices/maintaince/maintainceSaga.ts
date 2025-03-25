import { call, fork, put, select, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";

import { MaintenancesState, maintainceActions } from "./maintainceSlices";
import { Filter } from "@/models/Common";
import { getPagingMaintenance } from "@/api/maintennances";

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

function* fetchMaintenancesWatcher() {
  while (true) {
    const action = yield take(maintainceActions.fetchMaintenances.type);
    yield fork(fetchMaintenancesWorker, action);
  }
}

export function* maintainceSaga() {
  yield fork(fetchMaintenancesWatcher);
}
