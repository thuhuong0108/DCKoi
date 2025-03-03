import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { quotationProjectActions } from "./QuotationProjectSlices";
import { getQuotationProject } from "@/api/project";

function* fetchQuotaionProjectWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotationProject, action.payload);
    if (data.isSuccess) {
      yield put(quotationProjectActions.fetchQuotationProjectSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(quotationProjectActions.fetchQuotationProjectFaild);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationProjectActions.fetchQuotationProjectFaild);
    console.log(error);
  }
}

function* fetchQuotaionProjectWatcher() {
  while (true) {
    const action = yield take(quotationProjectActions.fetchQuotationProject);
    yield fork(fetchQuotaionProjectWorker, action);
  }
}

export function* quotationProjectSaga() {
  yield fork(fetchQuotaionProjectWatcher);
}
