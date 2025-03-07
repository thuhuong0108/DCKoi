import { call, fork, put, select, take } from "redux-saga/effects";
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
    console.log("Error load project: ", error);
    yield put(projectDetailActions.fetchProjectDetailFaild());
  }
}

function* reloadProjectDetailWorker(action: PayloadAction<string>) {
  try {
    const projectDetailState = yield select((state) => state.projectDetail);
    const data = yield call(getProject, action.payload);
    if (data.isSuccess) {
      yield put(projectDetailActions.fetchProjectDetailSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectDetailActions.fetchProjectDetailFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectDetailActions.fetchProjectDetailFaild());
  }
}

function* fetchProjectDetailWatcher() {
  while (true) {
    const action = yield take(projectDetailActions.fetchProjectDetail);
    yield fork(fetchProjectDetailWorker, action);
  }
}

function* reloadProjectDetailWatcher() {
  while (true) {
    const action = yield take(projectDetailActions.reloadProjectDetail);
    yield take(projectDetailActions.reloadProjectDetail);
    yield fork(reloadProjectDetailWorker, action);
  }
}
export function* projectDetailSaga() {
  yield fork(fetchProjectDetailWatcher);
  yield fork(reloadProjectDetailWatcher);
}
