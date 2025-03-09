import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, select, take } from "redux-saga/effects";

import { acceptDesign, getDesign, rejectDesign } from "@/api/design";
import { imageDesignActions } from "./imageDesignSlices";
import { designActions } from "../design/designSlices";

function* fetchDesignWorker(action: PayloadAction<string>) {
  try {
    const response = yield call(getDesign, action.payload);
    if (response.isSuccess) {
      yield put(imageDesignActions.fetchImageDesignSuccess(response.data));
    } else {
      yield put(imageDesignActions.fetchImageDesignFailed());
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(imageDesignActions.fetchImageDesignFailed());
  }
}

function* rejectDesignWorker(
  action: PayloadAction<{ id: string; reason: string; idProject: string }>
) {
  try {
    const response = yield call(
      rejectDesign,
      action.payload.id,
      action.payload.reason
    );
    if (response.isSuccess) {
      messageSuccess(response.message);
      yield put(imageDesignActions.fetchImageDesign(action.payload.id));
      yield put(designActions.fetchDesign(action.payload.idProject));
    } else {
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
  }
}

function* acceptDesignWorker(
  action: PayloadAction<{ id: string; idProject: string }>
) {
  try {
    const response = yield call(acceptDesign, action.payload.id);
    if (response.isSuccess) {
      messageSuccess(response.message);
      yield put(imageDesignActions.fetchImageDesign(action.payload.id));
      yield put(designActions.fetchDesign(action.payload.idProject));
    } else {
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
  }
}

function* watchFetchDesign() {
  while (true) {
    const action = yield take(imageDesignActions.fetchImageDesign);
    yield call(fetchDesignWorker, action);
  }
}

function* watchRejectDesign() {
  while (true) {
    const action = yield take(imageDesignActions.rejectDesign);
    yield call(rejectDesignWorker, action);
  }
}

function* watchAcceptDesign() {
  while (true) {
    const action = yield take(imageDesignActions.acceptDesign);
    yield call(acceptDesignWorker, action);
  }
}

export function* designImageSaga() {
  yield fork(watchFetchDesign);
  yield fork(watchRejectDesign);
  yield fork(watchAcceptDesign);
}
