import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, select, take } from "redux-saga/effects";

import { getDesign } from "@/api/design";
import { imageDesignActions } from "./imageDesignSlices";

function* fetchDesignWorker(action: PayloadAction<string>) {
  try {
    const response = yield call(getDesign, action.payload);
    if (response.isSuccess) {
      yield put(
        imageDesignActions.fetchImageDesignSuccess(response.data.designImages)
      );
    } else {
      yield put(imageDesignActions.fetchImageDesignFailed());
      messageError(response.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(imageDesignActions.fetchImageDesignFailed());
  }
}

function* watchFetchDesign() {
  while (true) {
    const action = yield take(imageDesignActions.fetchImageDesign);
    yield call(fetchDesignWorker, action);
  }
}

export function* designImageSaga() {
  yield fork(watchFetchDesign);
}
