import { loginApi } from "@/api/auth";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, take } from "redux-saga/effects";
import {} from "./packageItemSlices";
import { getPagingPackageItem } from "@/api/packageItem";
import { packageItemActions } from "./packageItemSlices";
import { Filter } from "@/models/Common";

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

function* fetchItemWatcher() {
  while (true) {
    const action = yield take(packageItemActions.fetchPackageItems);
    yield fork(fetchItemWorker, action);
  }
}

export function* packageItemSaga() {
  yield fork(fetchItemWatcher);
}
