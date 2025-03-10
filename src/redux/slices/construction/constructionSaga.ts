import { call, fork, put, take } from "redux-saga/effects";
import { ConstructionRequest } from "./../../../models/Request/ConstructionRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";
import { createConstruction, getConstruction } from "@/api/construction";
import { constructionActions } from "./constructionSlices";

function* fetchConstructionWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getConstruction, action.payload);
    if (data.isSuccess) {
      yield put(constructionActions.fetchConstructionSuccess(data.data));
    } else {
      yield put(constructionActions.fetchConstructionFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(constructionActions.fetchConstructionFailed());
  }
}

function* createConstructionWorker(action: PayloadAction<ConstructionRequest>) {
  try {
    const data = yield call(createConstruction, action.payload);
    if (data.isSuccess) {
      yield put(constructionActions.fetchConstructionSuccess(data.data));
      messageSuccess(data.message);
    } else {
      yield put(constructionActions.fetchConstructionFailed());
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(constructionActions.fetchConstructionFailed());
  }
}

function* createConstructionWatcher() {
  while (true) {
    const action = yield take(constructionActions.createConstruction);
    yield call(createConstructionWorker, action);
  }
}

function* fetchConstructionWatcher() {
  while (true) {
    const action = yield take(constructionActions.fetchConstruction);
    yield call(fetchConstructionWorker, action);
  }
}
export function* constructionSaga() {
  yield fork(fetchConstructionWatcher);
  yield fork(createConstructionWatcher);
}
