import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { transactionActions } from "./transactionSlices";
import { getPayment } from "@/api/payment";

function* fetchTransactionWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getPayment, action.payload);
    if (data.isSuccess) {
      yield put(transactionActions.fetchTransactionDetailSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(transactionActions.fetchTransactionDetailFaild());
    }
  } catch (error) {
    yield put(transactionActions.fetchTransactionDetailFaild());
    console.log("error", error);
  }
}

function* fetchTransactionWatcher() {
  while (true) {
    const action = yield take(transactionActions.fetchTransactionDetail);
    yield fork(fetchTransactionWorker, action);
  }
}

export function* transactionSaga() {
  yield fork(fetchTransactionWatcher);
}
