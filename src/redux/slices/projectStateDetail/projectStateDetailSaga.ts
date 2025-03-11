import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { projectStateDetailActions } from "./projectStateDetailSlices";
import {
  getDesignApproval,
  getProject,
  getProjectConstruction,
} from "@/api/project";
import { Filter } from "@/models/Common";
import { getDesign } from "@/api/design";

function* fetchProjectDetailWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getProject, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchProjectDetailSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchProjectDetailFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchProjectDetailFailed());
    console.log("error", error);
  }
}

function* fetchDesignWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getDesignApproval, action.payload);

    if (data.isSuccess) {
      const updatedData = yield Promise.all(
        data.data.map(async (item) => {
          const design = await getDesign(item.id);
          if (design.isSuccess) {
            item = design.data;
          }
          return item;
        })
      );

      yield put(projectStateDetailActions.fetchDesignsSuccess(updatedData));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchDesignsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchDesignsFailed());
    console.log("error", error);
  }
}

function* fetchConstructionWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getProjectConstruction, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchConstructionsSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchConstructionsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchConstructionsFailed());
    console.log("error", error);
  }
}

function* fetchProjectDetailWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchProjectDetail
    );
    yield fork(fetchProjectDetailWorker, action);
  }
}

function* fetchDesignWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchDesigns
    );
    yield fork(fetchDesignWorker, action);
  }
}

function* fetchConstructionWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchConstructions
    );
    yield fork(fetchConstructionWorker, action);
  }
}

export function* projectStateDetailSaga() {
  yield fork(fetchProjectDetailWatcher);
  yield fork(fetchDesignWatcher);
  yield fork(fetchConstructionWatcher);
}
