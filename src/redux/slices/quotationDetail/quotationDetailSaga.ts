import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { quotationDetailActions } from "./quotationDetailSlices";
import { getQuotation } from "@/api/quotation";

function* fetchQuotaionDetailWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotation, action.payload);
    if (data.isSuccess) {
      yield put(quotationDetailActions.fetchQuotationDetailSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(quotationDetailActions.fetchQuotationDetailFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationDetailActions.fetchQuotationDetailFailed());
    console.log(error);
  }
}

function* fetchQuotaionDetailWatcher() {
  while (true) {
    const action = yield take(quotationDetailActions.fetchQuotationDetail);
    yield fork(fetchQuotaionDetailWorker, action);
  }
}

export function* quotationDetailSaga() {
  yield fork(fetchQuotaionDetailWatcher);
}
