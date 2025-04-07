import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { PackageItemState } from "./packageMaintenceItemSlices";
import {
  getPagingPackageItem,
  createPackageItem,
  updatePackageItem,
  deletePackageItem,
} from "@/api/packageItem";
import { packageMaintenceItemActions } from "./packageMaintenceItemSlices";
import { Filter } from "@/models/Common";
import { PackageItemType } from "@/models";
import {
  createPackageMaintanceItem,
  getItemPackageMaintance,
} from "@/api/packageMaintance";

function* fetchItemWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getItemPackageMaintance, action.payload);
    if (data.isSuccess) {
      yield put(packageMaintenceItemActions.fetchPackageItemsSuccess(data));
    } else {
      messageError(data.message);
      yield put(packageMaintenceItemActions.fetchPackageItemsFailed());
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(packageMaintenceItemActions.fetchPackageItemsFailed());
  }
}

// create
function* createItemWorker(action: PayloadAction<PackageItemType>) {
  try {
    const data = yield call(createPackageMaintanceItem, action.payload);

    if (data.isSuccess) {
      messageSuccess(data.message);
      const packageItemsState: PackageItemState = yield select(
        (state) => state.packageMaintenceItem
      );

      yield put(
        packageMaintenceItemActions.fetchPackageItems({
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
        packageMaintenceItemActions.fetchPackageItems({
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
        packageMaintenceItemActions.fetchPackageItems({
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
    const action = yield take(packageMaintenceItemActions.fetchPackageItems);
    yield fork(fetchItemWorker, action);
  }
}

function* createItemWatcher() {
  while (true) {
    const action = yield take(packageMaintenceItemActions.createPackageItem);
    yield fork(createItemWorker, action);
  }
}

function* updateItemWatcher() {
  while (true) {
    const action = yield take(packageMaintenceItemActions.updatePackageItem);
    yield fork(updateItemWorker, action);
  }
}

function* deleteItemWatcher() {
  while (true) {
    const action = yield take(packageMaintenceItemActions.deletePackageItem);
    yield fork(deleteItemWorker, action);
  }
}

export function* packageMaintenceItemSaga() {
  yield fork(fetchItemWatcher);
  yield fork(createItemWatcher);
  yield fork(updateItemWatcher);
  yield fork(deleteItemWatcher);
}
