import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { PackageItemState } from "./packageItemSlices";
import {
  getPagingPackageItem,
  createPackageItem,
  updatePackageItem,
  deletePackageItem,
} from "@/api/packageItem";
import { packageItemActions } from "./packageItemSlices";
import { Filter } from "@/models/Common";
import { PackageItemType } from "@/models";

function* fetchItemWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingPackageItem, action.payload);
    if (data.isSuccess) {
      yield put(packageItemActions.fetchPackageItemsSuccess(data));
    } else {
      messageError(data.message);
      yield put(packageItemActions.fetchPackageItemsFailed());
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(packageItemActions.fetchPackageItemsFailed());
  }
}

// create
function* createItemWorker(action: PayloadAction<PackageItemType>) {
  try {
    const data = yield call(createPackageItem, action.payload);

    if (data.isSuccess) {
      messageSuccess(data.message);
      const packageItemsState: PackageItemState = yield select(
        (state) => state.packageItem
      );

      yield put(
        packageItemActions.fetchPackageItems({
          pageNumber: packageItemsState.packageItems.pageNumber,
          pageSize: packageItemsState.packageItems.pageSize,
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
function* updateItemWorker(action: PayloadAction<PackageItemType>) {
  try {
    const data = yield call(updatePackageItem, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const packageItemsState: PackageItemState = yield select(
        (state) => state.packageItem
      );

      yield put(
        packageItemActions.fetchPackageItems({
          pageNumber: packageItemsState.packageItems.pageNumber,
          pageSize: packageItemsState.packageItems.pageSize,
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
    const data = yield call(deletePackageItem, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const packageItemsState: PackageItemState = yield select(
        (state) => state.packageItem
      );

      yield put(
        packageItemActions.fetchPackageItems({
          pageNumber: packageItemsState.packageItems.pageNumber,
          pageSize: packageItemsState.packageItems.pageSize,
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
    const action = yield take(packageItemActions.fetchPackageItems);
    yield fork(fetchItemWorker, action);
  }
}

function* createItemWatcher() {
  while (true) {
    const action = yield take(packageItemActions.createPackageItem);
    yield fork(createItemWorker, action);
  }
}

function* updateItemWatcher() {
  while (true) {
    const action = yield take(packageItemActions.updatePackageItem);
    yield fork(updateItemWorker, action);
  }
}

function* deleteItemWatcher() {
  while (true) {
    const action = yield take(packageItemActions.deletePackageItem);
    yield fork(deleteItemWorker, action);
  }
}

export function* packageItemSaga() {
  yield fork(fetchItemWatcher);
  yield fork(createItemWatcher);
  yield fork(updateItemWatcher);
  yield fork(deleteItemWatcher);
}
