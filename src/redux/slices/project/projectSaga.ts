import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { Filter } from "@/models/Common";
import { getPagingProject, getProject } from "@/api/project";
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

// function* getProjectWorker(action: PayloadAction<string>) {
//     try {
//       const data = yield call(getProject, action.payload);
//       if (data.isSuccess) {
//         yield put(projectActions.fetchProjectSuccess(data));
//       } else {
//         messageError(data.message);
//         yield put(projectActions.fetchProjectFaild());
//       }
//     } catch (error) {
//       messageError("Lấy dữ liệu dự án bị lỗi");
//       console.log("Error load project: ",error);
//       yield put(projectActions.fetchProjectFaild());
//     }
//   }

// create
// function* createProjectWorker(action: PayloadAction<ProjectType>) {
//   try {
//     const data = yield call(createProject, action.payload);

//     if (data.isSuccess) {
//       messageSuccess(data.message);
//       const projectState: ProjectState = yield select(
//         (state) => state.project
//       );

//       yield put(
//         projectActions.fetchProject({
//           pageNumber: projectState.projects.pageNumber,
//           pageSize: projectState.projects.pageSize,
//         })
//       );
//     } else {
//       messageError(data.message);
//     }
//   } catch (error) {
//     messageError("Hệ thống đang bị lỗi");
//     console.log("Error create project:",error);
//   }
// }

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
}
