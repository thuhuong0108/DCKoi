import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import {
  PackageMaintainceState,
  packageMaintainceActions,
} from "./packageMaintainceSlices";

import { Filter } from "@/models/Common";
import { getPagingPackageMaintance } from "@/api/packageMaintance";

function* fetchPackageMaintainceWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingPackageMaintance, action.payload);
    if (data.isSuccess) {
      yield put(packageMaintainceActions.getPackageMaintainceSuccess(data));
    } else {
      messageError(data.message);
      yield put(packageMaintainceActions.getPackageMaintainceFailed());
    }
  } catch (error) {
    yield put(packageMaintainceActions.getPackageMaintainceFailed());
    console.log("error", error);
  }
}

function* fetchPackageMaintainceWatcher() {
  while (true) {
    const action = yield take(
      packageMaintainceActions.getPackageMaintaince.type
    );
    yield fork(fetchPackageMaintainceWorker, action);
  }
}

export function* packageMaintainceSaga() {
  yield fork(fetchPackageMaintainceWatcher);
}
