import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { TemplateConstructionState } from "./templateContrutionSlices";
import {
  createTemlateConstruction,
  getPagingTemlateConstruction,
  getTemlateConstruction,
  getTemplateConstructionActive,
} from "@/api/templateConstruction";
import { templateConstructionActions } from "./templateContrutionSlices";
import { Filter } from "@/models/Common";
import { TemplateConstructionType } from "@/models";

function* fetchItemWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getPagingTemlateConstruction, action.payload);
    if (data.isSuccess) {
      yield put(
        templateConstructionActions.getTemplateConstructionSuccess(data)
      );
    } else {
      messageError(data.message);
      yield put(templateConstructionActions.getTemplateConstructionFailed());
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(templateConstructionActions.getTemplateConstructionFailed());
  }
}

// create

function* createItemWorker(action: PayloadAction<TemplateConstructionType>) {
  try {
    console.log(action.payload);
    const data = yield call(createTemlateConstruction, action.payload);

    if (data.isSuccess) {
      messageSuccess(data.message);
      const templateConstructionState: TemplateConstructionState = yield select(
        (state) => state.templateConstruction
      );

      yield put(
        templateConstructionActions.getTemplateConstruction({
          pageNumber:
            templateConstructionState.templateConstructions.pageNumber,
          pageSize: templateConstructionState.templateConstructions.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* fetchItemActiveWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getTemplateConstructionActive, action.payload);
    if (data.isSuccess) {
      yield put(
        templateConstructionActions.getTemplateConstructionSuccess(data)
      );
    } else {
      messageError(data.message);
      yield put(templateConstructionActions.getTemplateConstructionFailed());
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(templateConstructionActions.getTemplateConstructionFailed());
  }
}

//watcher

function* fetchItemWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionActions.getTemplateConstruction
    );
    yield fork(fetchItemWorker, action);
  }
}

function* createItemWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionActions.createTemplateConstruction
    );
    yield fork(createItemWorker, action);
  }
}

function* fetchItemActiveWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionActions.getTemlateConstructionActive
    );
    yield fork(fetchItemActiveWorker, action);
  }
}

export function* templateConstructionSaga() {
  yield fork(fetchItemWatcher);
  yield fork(createItemWatcher);
  yield fork(fetchItemActiveWatcher);
}
