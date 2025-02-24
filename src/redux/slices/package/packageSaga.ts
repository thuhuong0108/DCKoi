import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { PackageState } from "./packageSlices";
import { packageActions } from "./packageSlices";
import { Filter } from "@/models/Common";
import { getPagingPackage } from "@/api/package";

export function* fetchPackageWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingPackage, action.payload);
    if (data.isSuccess) {
      yield put(packageActions.getPackageSuccess(data));
    } else {
      messageError(data.message);
      yield put(packageActions.getPackageFailed());
    }
  } catch (error) {
    messageError("Fetch package failed");
    console.log(error);
    yield put(packageActions.getPackageFailed());
  }
}

// watcher
function* fetchPackageWatcher() {
  while (true) {
    const action = yield take(packageActions.getPackage);
    yield fork(fetchPackageWorker, action);
  }
}

export function* packageSaga() {
  yield fork(fetchPackageWatcher);
}
