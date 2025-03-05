import { call, fork, put, take } from "redux-saga/effects";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { projectDetailActions } from "./projectDetailSlices";
import { getProject } from "@/api/project";

function* fetchProjectDetailWorker(action: PayloadAction<string>) {
  try {
    const res = yield call(getProject, action.payload);
    if (res.isSuccess) {
      yield put(projectDetailActions.fetchProjectDetailSuccess(res.data));
    } else {
      messageError(res.message);
      yield put(projectDetailActions.fetchProjectDetailFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(projectDetailActions.fetchProjectDetailFaild());
  }
}

function* fetchProjectDetailWatcher() {
  while (true) {
    const action = yield take(projectDetailActions.fetchProjectDetail);
    yield fork(fetchProjectDetailWorker, action);
  }
}
export function* projectDetailSaga() {
  yield fork(fetchProjectDetailWatcher);
}
