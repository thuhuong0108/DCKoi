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
import { QuotationRequest } from "@/models/Request/QuotationRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import {
  QuotaitonProjectState,
  quotationProjectActions,
} from "../quotationProject/quotationProjectSlices";
import { quotationActions } from "./quotationSlices";

function* fetchQuotationWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotation, action.payload);
    if (data.isSuccess) {
      yield put(quotationActions.fetchQuotationSuccess(data));
    } else {
      messageError(data.message);
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
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationActions.fetchQuotationFailed());
    console.log(error);
  }
}

function* rejectAcceptQuotationWorker(
  action: PayloadAction<RejectQuotationType>
) {
  try {
    const data = yield call(rejectQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const quotaitonProjectState: QuotaitonProjectState = yield select(
        (state) => state.quotationProject
      );

      yield put(
        quotationProjectActions.fetchQuotationProject({
          Filter: {
            pageNumber: quotaitonProjectState.quotationProject.pageNumber,
            pageSize: quotaitonProjectState.quotationProject.pageSize,
          },
          id: quotaitonProjectState.quotationProject.data[0].projectId,
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

function* approveEditQuotationWorker(
  action: PayloadAction<ApproveQuotationType>
) {
  console.log(action.payload);
  try {
    const data = yield call(approveQuotation, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);

      const quotaitonProjectState: QuotaitonProjectState = yield select(
        (state) => state.quotationProject
      );

      yield put(
        quotationProjectActions.fetchQuotationProject({
          Filter: {
            pageNumber: quotaitonProjectState.quotationProject.pageNumber,
            pageSize: quotaitonProjectState.quotationProject.pageSize,
          },
          id: quotaitonProjectState.quotationProject.data[0].projectId,
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

function* rewriteQuotationWorker(action: PayloadAction<QuotationRequest>) {
  try {
    const data = yield call(rewriteQuotation, action.payload);

    if (data.isSuccess) {
      messageSuccess("Báo giá đã gửi thành công");
      yield put(quotationActions.rewriteQuotation(data));

      const quotaitonProjectState: QuotaitonProjectState = yield select(
        (state) => state.quotationProject
      );

      yield put(
        quotationProjectActions.fetchQuotationProject({
          Filter: {
            pageNumber: quotaitonProjectState.quotationProject.pageNumber,
            pageSize: quotaitonProjectState.quotationProject.pageSize,
          },
          id: quotaitonProjectState.quotationProject.data[0].projectId,
        })
      );
    } else {
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* updateQuotationWorker(action: PayloadAction<QuotationRequest>) {
  try {
    const data = yield call(updateQuotation, action.payload);

    if (data.isSuccess) {
      messageSuccess("Báo giá đã gửi thành công");
      yield put(quotationActions.updateQuotation(data));

      const quotaitonProjectState: QuotaitonProjectState = yield select(
        (state) => state.quotationProject
      );

      yield put(
        quotationProjectActions.fetchQuotationProject({
          Filter: {
            pageNumber: quotaitonProjectState.quotationProject.pageNumber,
            pageSize: quotaitonProjectState.quotationProject.pageSize,
          },
          id: quotaitonProjectState.quotationProject.data[0].projectId,
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
    yield fork(rejectAcceptQuotationWorker, action);
  }
}

function* approveEditQuotationWatcher() {
  while (true) {
    const action = yield take(quotationActions.approveQuotation);
    yield fork(approveEditQuotationWorker, action);
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
  yield fork(approveEditQuotationWatcher);
  yield fork(updateQuotationWatcher);
  yield fork(rewriteQuotationWatcher);
}
