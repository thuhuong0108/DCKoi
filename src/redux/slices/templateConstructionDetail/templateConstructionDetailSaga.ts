import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";

import { getTemlateConstruction } from "@/api/templateConstruction";
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

// watcher
function* fetchItemWatcher() {
  while (true) {
    const action = yield take(
      templateConstructionDetailActions.getTemplateConstructionDetail
    );
    yield fork(fetchItemWorker, action);
  }
}

export function* templateConstructionDetailSaga() {
  yield fork(fetchItemWatcher);
}
