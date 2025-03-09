import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { contractProjectActions } from "./contractProjectSlices";
import { getContractOfProject } from "@/api/project";

function* fetchContractProjectWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getContractOfProject, action.payload);
    if (data.isSuccess) {
      yield put(contractProjectActions.fetchContractProjectSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(contractProjectActions.fetchContractProjectFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(contractProjectActions.fetchContractProjectFaild());
    console.log(error);
  }
}

function* fetchContractProjectWatcher() {
  while (true) {
    const action = yield take(contractProjectActions.fetchContractProject);
    yield fork(fetchContractProjectWorker, action);
  }
}

export function* contractProjectSaga() {
  yield fork(fetchContractProjectWatcher);
}
