import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { Filter } from "@/models/Common";
import { getPagingProject, getProject, getProjectDesign } from "@/api/project";
import { projectActions } from "./projectSlices";

function* fetchProjectWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingProject, action.payload);
    if (data.isSuccess) {
      yield put(projectActions.fetchProjectSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectActions.fetchProjectFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectActions.fetchProjectFaild());
  }
}

function* reloadProjectWorker() {
  try {
    const projectState = yield select((state) => state.project);
    const data = yield call(getPagingProject, {
      pageNumber: projectState.projects.pageNumber,
      pageSize: projectState.projects.pageSize,
    });
    if (data.isSuccess) {
      yield put(projectActions.fetchProjectSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectActions.fetchProjectFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectActions.fetchProjectFaild());
  }
}

function* fetchDesignProjectWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getProjectDesign, action.payload);
    if (data.isSuccess) {
      yield put(projectActions.fetchDesignProjectSuccess(data));
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectActions.fetchDesignProjectFaild());
  }
}

function* reloadDesignProjectWorker() {
  try {
    const projectState = yield select((state) => state.project);
    const data = yield call(getProjectDesign, {
      pageNumber: projectState.projects.pageNumber,
      pageSize: projectState.projects.pageSize,
    });
    if (data.isSuccess) {
      yield put(projectActions.fetchDesignProjectSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectActions.fetchDesignProjectFaild());
    }
  } catch (error) {
    messageError("Tải dữ liệu dự án bị lỗi");
    console.log("Error load project: ", error);
    yield put(projectActions.fetchDesignProjectFaild());
  }
}

function* fetchProjectWatcher() {
  while (true) {
    const action = yield take(projectActions.fetchProject);
    yield fork(fetchProjectWorker, action);
  }
}

function* reloadProjectWatcher() {
  while (true) {
    yield take(projectActions.reloadProject);
    yield fork(reloadProjectWorker);
  }
}

function* reloadDesignProjectWatcher() {
  while (true) {
    yield take(projectActions.reloadDesignProject);
    yield fork(reloadDesignProjectWorker);
  }
}

function* fetchDesignProjectWatcher() {
  while (true) {
    const action = yield take(projectActions.fetchDesignProject);
    yield fork(fetchDesignProjectWorker, action);
  }
}

// function* createItemWatcher() {
//   while (true) {
//     const action = yield take(projectActions.createProject);
//     yield fork(createProjectWorker, action);
//   }
// }

export function* projectSaga() {
  yield fork(fetchProjectWatcher);
  //   yield fork(createItemWatcher);
  yield fork(reloadProjectWatcher);
  yield fork(fetchDesignProjectWatcher);
  yield fork(reloadDesignProjectWatcher);
}
