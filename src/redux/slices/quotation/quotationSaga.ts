import { approveQuotation, createQuotation, getQuotation, rejectQuotation } from "@/api/quotation";
import { messageError, messageSuccess } from "@/components";
import { ApproveQuotationType, QuotationType, RejectQuotationType } from "@/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { QuotaitonState, quotationActions } from "./quotationSlices";

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

function* rejectQuotationWorker(action: PayloadAction<RejectQuotationType>) {
  try {
    const data = yield call(rejectQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);

      yield put(quotationActions.rejectAcceptQuotation(data));
    }
    else {
      messageError(data.message);
    }
  }
  catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* approveQuotationWorker(action: PayloadAction<ApproveQuotationType>) {
  try {
    const data = yield call(approveQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);

      yield put(quotationActions.approveQuotation(data));
    }
    else {
      messageError(data.message);
    }
  }
  catch (error) {
    messageError("Hệ thống đang bị lỗi");
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

function* rejectAcceptQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.rejectAcceptQuotation);
    yield fork(rejectQuotationWorker, action);
  }
}

function* approveQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.approveQuotation);
    yield fork(approveQuotationWorker, action);
  }
}

export function* quotationSaga() {
  yield fork(fetchQuotationWatcher);
  yield fork(createQuotationWatcher);
  yield fork(rejectAcceptQuotationWatcher);
  yield fork(approveQuotationWatcher);
}
