import {
  acceptDesign,
  getDesign,
  rejectDesign,
  requestEditDesign,
} from "@/api/design";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { designDetailActions } from "./designDetailSlices";
import { messageError, messageSuccess } from "@/components";
import { ReasonDesignType } from "@/models/DesignType";

function* fetchDesignDetailWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getDesign, action.payload);
    if (data.isSuccess) {
      yield put(designDetailActions.fetchDesignDetailSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(designDetailActions.fetchDesignDetailFailed);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(designDetailActions.fetchDesignDetailFailed);
    console.log(error);
  }
}

function* rejectDesignWorker(action: PayloadAction<ReasonDesignType>) {
  try {
    const data = yield call(rejectDesign, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* acceptDesignWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(acceptDesign, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* requestEditDesignWorker(action: PayloadAction<ReasonDesignType>) {
  try {
    const data = yield call(requestEditDesign, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* fetchDesignDetailWatcher() {
  while (true) {
    const action = yield take(designDetailActions.fetchDesignDetail);
    yield fork(fetchDesignDetailWorker, action);
  }
}

function* rejectDesignWatcher() {
  while (true) {
    const action = yield take(designDetailActions.rejectDesign);
    yield fork(rejectDesignWorker, action);
  }
}

function* acceptDesignWatcher() {
  while (true) {
    const action = yield take(designDetailActions.acceptDesign);
    yield fork(acceptDesignWorker, action);
  }
}

function* requestEditDesignWatcher() {
  while (true) {
    const action = yield take(designDetailActions.requestEditDesign);
    yield fork(requestEditDesignWorker, action);
  }
}

export function* designDetailSaga() {
  yield fork(fetchDesignDetailWatcher);
  yield fork(rejectDesignWatcher);
  yield fork(acceptDesignWatcher);
  yield fork(requestEditDesignWatcher);
}
