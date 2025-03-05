import { getDesign } from "@/api/design";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { designDetailActions } from "./designDetailSlices";
import { messageError, messageSuccess } from "@/components";

function* fetchQuotaionDetailWorker(action: PayloadAction<string>) {
    try {
      const data = yield call(getDesign, action.payload);
      if (data.isSuccess) {
        yield put(designDetailActions.fetchDesignDetailSuccess(data.data));
      } else {
        messageSuccess(data.message);
        yield put(designDetailActions.fetchDesignDetailFailed);
      }
    } catch (error) {
      messageError("Hệ thống đang bị lỗi");
      yield put(designDetailActions.fetchDesignDetailFailed);
      console.log(error);
    }
  }
  
  function* fetchQuotaionDetailWatcher() {
    while (true) {
      const action = yield take(designDetailActions.fetchDesignDetail);
      yield fork(fetchQuotaionDetailWorker, action);
    }
  }
  
  export function* designDetailSaga() {
    yield fork(fetchQuotaionDetailWatcher);
  }
  