import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { getQuotationProject } from "@/api/project";
import { quotationProjectActions } from "./quotationProjectSlices";
import { Filter } from "@/models/Common";

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

function* fetchQuotaionProjectWatcher() {
  while (true) {
    const action = yield take(quotationProjectActions.fetchQuotationProject);
    yield fork(fetchQuotaionProjectWorker, action);
  }
}

export function* quotationProjectSaga() {
  yield fork(fetchQuotaionProjectWatcher);
}
