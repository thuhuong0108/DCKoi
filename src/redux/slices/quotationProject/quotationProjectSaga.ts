import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { getQuotationActiveProject, getQuotationProject } from "@/api/project";
import { quotationProjectActions } from "./quotationProjectSlices";
import { Filter } from "@/models/Common";
import { quotationDetailActions } from "../quotationDetail/quotationDetailSlices";

function* fetchQuotaionProjectWorker(
  action: PayloadAction<{ Filter: Filter; id: string }>
) {
  try {
    const data = yield call(
      getQuotationProject,
      action.payload.Filter,
      action.payload.id
    );
    if (data.isSuccess) {
      yield put(quotationProjectActions.fetchQuotationProjectSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(quotationProjectActions.fetchQuotationProjectFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationProjectActions.fetchQuotationProjectFaild());
    console.log(error);
  }
}

function* fetchQuotaionActiveProjectWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getQuotationActiveProject, action.payload);

    if (data.isSuccess) {
      yield put(
        quotationProjectActions.fetchQuotationActiveProjectSuccess(data)
      );
      yield put(quotationDetailActions.fetchQuotationDetail(data.data[0].id));
    } else {
      messageSuccess(data.message);
      yield put(quotationProjectActions.fetchQuotationActiveProjectFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(quotationProjectActions.fetchQuotationActiveProjectFaild());
    console.log(error);
  }
}

function* fetchQuotaionProjectWatcher() {
  while (true) {
    const action = yield take(quotationProjectActions.fetchQuotationProject);
    yield fork(fetchQuotaionProjectWorker, action);
  }
}

function* fetchQuotaionActiveProjectWatcher() {
  while (true) {
    const action = yield take(
      quotationProjectActions.fetchQuotationActiveProject
    );
    yield fork(fetchQuotaionActiveProjectWorker, action);
  }
}

export function* quotationProjectSaga() {
  yield fork(fetchQuotaionProjectWatcher);
  yield fork(fetchQuotaionActiveProjectWatcher);
}
