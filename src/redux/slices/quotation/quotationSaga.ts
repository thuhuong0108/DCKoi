import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { QuotaitonState, quotationActions } from "./quotationSlices";
import { createQuotation, getQuotation } from "@/api/quotation";
import { QuotationType } from "@/models";

function* fetchQuotationWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotation, action.payload);
    console.log("dât", data);
    if (data.isSuccess) {
      yield put(quotationActions.fetchQuotationSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(quotationActions.fetchQuotationFaild);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationActions.fetchQuotationFaild);
    console.log(error);
  }
}

function* createQuotationWorker(action: PayloadAction<QuotationType>) {
  try {
    const data = yield call(createQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const quotationState: QuotaitonState = yield select(
        (state) => state.quotation
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationActions.fetchQuotationFaild);
    console.log(error);
  }
}

function* fetchQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.fetchQuotation);
    yield fork(fetchQuotationWorker, action);
  }
}

function* createQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.createQuotation);
    yield fork(createQuotationWorker, action);
  }
}

export function* quotationSaga() {
  yield fork(fetchQuotationWatcher);
  yield fork(createQuotationWatcher);
}
