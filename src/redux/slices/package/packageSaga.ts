import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { PackageState } from "./packageSlices";
import {
  getPagingPackage,
  createPackage,
  updatePackage,
  deletePackage,
} from "@/api/package";
import { packageActions } from "./packageSlices";
import { Filter } from "@/models/Common";
import { PackageType } from "@/models";

function* fetchItemWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingPackage, action.payload);
    if (data.isSuccess) {
      yield put(packageActions.fetchPackagesSuccess(data));
    } else {
      messageError(data.message);
      yield put(packageActions.fetchPackagesFailed());
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(packageActions.fetchPackagesFailed());
  }
}

// create
function* createItemWorker(action: PayloadAction<PackageType>) {
  try {
    console.log(action.payload);
    const data = yield call(createPackage, action.payload);

    if (data.isSuccess) {
      messageSuccess(data.message);
      const packagesState: PackageState = yield select(
        (state) => state.package
      );

      yield put(
        packageActions.fetchPackages({
          pageNumber: packagesState.packages.pageNumber,
          pageSize: packagesState.packages.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

//update
function* updateItemWorker(action: PayloadAction<PackageType>) {
  try {
    const data = yield call(updatePackage, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const packagesState: PackageState = yield select(
        (state) => state.package
      );

      yield put(
        packageActions.fetchPackages({
          pageNumber: packagesState.packages.pageNumber,
          pageSize: packagesState.packages.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

//delete
function* deleteItemWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(deletePackage, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const packagesState: PackageState = yield select(
        (state) => state.package
      );

      yield put(
        packageActions.fetchPackages({
          pageNumber: packagesState.packages.pageNumber,
          pageSize: packagesState.packages.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* fetchItemWatcher() {
  while (true) {
    const action = yield take(packageActions.fetchPackages);
    yield fork(fetchItemWorker, action);
  }
}

function* createItemWatcher() {
  while (true) {
    const action = yield take(packageActions.createPackage);
    yield fork(createItemWorker, action);
  }
}

function* updateItemWatcher() {
  while (true) {
    const action = yield take(packageActions.updatePackage);
    yield fork(updateItemWorker, action);
  }
}

function* deleteItemWatcher() {
  while (true) {
    const action = yield take(packageActions.deletePackage);
    yield fork(deleteItemWorker, action);
  }
}

export function* packageSaga() {
  yield fork(fetchItemWatcher);
  yield fork(createItemWatcher);
  yield fork(updateItemWatcher);
  yield fork(deleteItemWatcher);
}
