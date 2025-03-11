import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { constructionProjectActions } from "./constructionProjectSlices";
import { getProjectConstruction } from "@/api/project";
import { messageError } from "@/components";
function* fetchConstructionProjectWorker(action: PayloadAction<string>) {
  try {
    const response = yield call(getProjectConstruction, action.payload);
    if (response.isSuccess) {
      yield put(
        constructionProjectActions.fetchConstructionProjectSuccess(
          response.data
        )
      );
    } else {
      messageError(response.message);
      yield put(constructionProjectActions.fetchConstructionProjectFailed());
    }
  } catch (error) {
    yield put(constructionProjectActions.fetchConstructionProjectFailed());
    console.log("error", error);
  }
}

function* watchFetchConstructionProject() {
  while (true) {
    const action = yield take(
      constructionProjectActions.fetchConstructionProject
    );
    yield fork(fetchConstructionProjectWorker, action);
  }
}

export function* constructionProjectSaga() {
  yield fork(watchFetchConstructionProject);
}
