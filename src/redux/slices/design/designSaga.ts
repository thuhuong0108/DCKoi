import { postDesign, updateDesign } from "@/api/design";
import { getDesignOfProject } from "@/api/project";
import { messageError, messageSuccess } from "@/components";
import { DesignRequest } from "@/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { designActions } from "./designSlices";

function* fetchDesignWorker(action: PayloadAction<string>) {
  try {
    const response = yield call(getDesignOfProject, action.payload);

    if (response.isSuccess) {
      yield put(designActions.fetchDesignSuccess(response));
    } else {
      yield put(designActions.fetchDesignFailed());
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(designActions.fetchDesignFailed());
  }
}

function* postDesignWorker(action: PayloadAction<DesignRequest>) {
  try {
    const response = yield call(postDesign, action.payload);
    if (response.isSuccess) {
      yield put(designActions.fetchDesign(action.payload.projectId));
      messageSuccess(response.message);
    } else {
      yield put(designActions.fetchDesignFailed());
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(designActions.fetchDesignFailed());
  }
}

function* updateDesignWorker(
  action: PayloadAction<DesignRequest & { id: string }>
) {
  try {
    const response = yield call(
      updateDesign,
      action.payload.id,
      action.payload
    );
    if (response.isSuccess) {
      console.log(action.payload.projectId);

      yield put(designActions.fetchDesign(action.payload.projectId));
      messageSuccess(response.message);
    } else {
      yield put(designActions.fetchDesignFailed());
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(designActions.fetchDesignFailed());
  }
}

function* watchUpdateDesign() {
  while (true) {
    const action = yield take(designActions.updateDesign);
    yield call(updateDesignWorker, action);
  }
}

function* watchFetchDesign() {
  while (true) {
    const action = yield take(designActions.fetchDesign);
    yield call(fetchDesignWorker, action);
  }
}

function* watchPostDesign() {
  while (true) {
    const action = yield take(designActions.postDesign);
    yield call(postDesignWorker, action);
  }
}

export function* designSaga() {
  yield fork(watchFetchDesign);
  yield fork(watchPostDesign);
  yield fork(watchUpdateDesign);
}
