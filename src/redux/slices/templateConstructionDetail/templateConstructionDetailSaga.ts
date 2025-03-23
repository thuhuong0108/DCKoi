import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";

import {
  activeTemplateConstructionDetail,
  getTemlateConstruction,
} from "@/api/templateConstruction";
import { templateConstructionDetailActions } from "./templateConstructionDetailSlices";

function* fetchItemWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getTemlateConstruction, action.payload);
    if (data.isSuccess) {
      yield put(
        templateConstructionDetailActions.getTemplateConstructionDetailSuccess(
          data.data
        )
      );
    } else {
      messageError(data.message);
      yield put(
        templateConstructionDetailActions.getTemplateConstructionDetailFailed()
      );
    }
  } catch (error) {
    messageError("Fetch package item failed");
    console.log(error);
    yield put(
      templateConstructionDetailActions.getTemplateConstructionDetailFailed()
    );
  }
}

function* activeTemplateConstructionDetailWorker(
  action: PayloadAction<string>
) {
  try {
    const data = yield call(activeTemplateConstructionDetail, action.payload);
    if (data.isSuccess) {
      yield put(
        templateConstructionDetailActions.getTemplateConstructionDetail(
          action.payload
        )
      );
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Active failed");
    console.log(error);
  }
}

// watcher
function* fetchItemWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionDetailActions.getTemplateConstructionDetail
    );
    yield fork(fetchItemWorker, action);
  }
}

// watcher
function* activeTemplateConstructionDetailWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionDetailActions.activeTemplateConstructionDetail
    );
    yield fork(activeTemplateConstructionDetailWorker, action);
  }
}

export function* templateConstructionDetailSaga() {
  yield fork(fetchItemWatcher);
  yield fork(activeTemplateConstructionDetailWatcher);
}
