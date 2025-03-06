import {
  approveQuotation,
  createQuotation,
  getQuotation,
  rejectQuotation,
  rewriteQuotation,
  updateQuotation,
} from "@/api/quotation";
import { messageError, messageSuccess } from "@/components";
import { ApproveQuotationType, RejectQuotationType } from "@/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { QuotaitonState, quotationActions } from "./quotationSlices";
import { QuotationRequest } from "@/models/Request/QuotationRequest";

function* fetchQuotationWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotation, action.payload);
    if (data.isSuccess) {
      yield put(quotationActions.fetchQuotationSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(quotationActions.fetchQuotationFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationActions.fetchQuotationFailed());
    console.log(error);
  }
}

function* createQuotationWorker(action: PayloadAction<QuotationRequest>) {
  try {
    const data = yield call(createQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess("Báo giá được gửi thành công");
      const quotationState: QuotaitonState = yield select(
        (state) => state.quotation
      );

      yield put(
        quotationActions.fetchQuotation({
          pageNumber: quotationState.quotation.pageNumber,
          pageSize: quotationState.quotation.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationActions.fetchQuotationFailed());
    console.log(error);
  }
}

function* rejectQuotationWorker(action: PayloadAction<RejectQuotationType>) {
  try {
    const data = yield call(rejectQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    }
    else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* approveQuotationWorker(action: PayloadAction<ApproveQuotationType>) {
  console.log(action.payload);
  try {
    const data = yield call(approveQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    }
    else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* rewriteQuotationWorker(action: PayloadAction<QuotationRequest>) {
  try {
    const data = yield call(rewriteQuotation, action.payload);

    if (data.isSuccess) {
      messageSuccess("Báo giá đã gửi thành công");
      yield put(quotationActions.rewriteQuotation(data));
    } else {
      messageError(data.message);
    }
  } catch (error) {
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

function* updateQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.updateQuotation);
    yield fork(updateQuotationWorker, action);
  }
}

function* rewriteQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.rewriteQuotation);
    yield fork(rewriteQuotationWorker, action);
  }
}

export function* quotationSaga() {
  yield fork(fetchQuotationWatcher);
  yield fork(createQuotationWatcher);
  yield fork(rejectAcceptQuotationWatcher);
  yield fork(approveQuotationWatcher);
  yield fork(updateQuotationWatcher);
  yield fork(rewriteQuotationWatcher);
}
