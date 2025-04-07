import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { projectBoardActions } from "./projectBoardSlices";
import { getProjectAdmin, getProjects } from "@/api/project";
import { Filter } from "@/models/Common";

function* fetchProjectBoardWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getProjects, action.payload);
    if (data.isSuccess) {
      yield put(projectBoardActions.fetchProjectBoardSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectBoardActions.fetchProjectBoardFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectBoardActions.fetchProjectBoardFaild());
  }
}
function* fetchProjectBoardAdminWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getProjectAdmin, action.payload);
    if (data.isSuccess) {
      yield put(projectBoardActions.fetchProjectBoardSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectBoardActions.fetchProjectBoardFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectBoardActions.fetchProjectBoardFaild());
  }
}

function* reloadProjectBoardWorker() {
  try {
    const projectBoardState = yield select((state) => state.projectBoard);
    const data = yield call(getProjects, {
      pageNumber: projectBoardState.projects.pageNumber,
      pageSize: projectBoardState.projects.pageSize,
    });
    if (data.isSuccess) {
      yield put(projectBoardActions.fetchProjectBoardSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectBoardActions.fetchProjectBoardFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectBoardActions.fetchProjectBoardFaild());
  }
}

function* watchFetchProjectBoard() {
  while (true) {
    const action = yield take(projectBoardActions.fetchProjectBoard);
    yield fork(fetchProjectBoardWorker, action);
  }
}

function* watchReloadProjectBoard() {
  while (true) {
    yield take(projectBoardActions.reloadProjectBoard);
    yield fork(reloadProjectBoardWorker);
  }
}
function* watchFetchProjectBoardAdmin() {
  while (true) {
    const action = yield take(projectBoardActions.fetchProjectBoardAdmin);
    yield fork(fetchProjectBoardAdminWorker, action);
  }
}

export function* projectBoardSaga() {
  yield fork(watchFetchProjectBoard);
  yield fork(watchReloadProjectBoard);
  yield fork(watchFetchProjectBoardAdmin);
}
