import { call, fork, put, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { contractProjectActions } from "./contractProjectSlices";
import { getContractOfProject } from "@/api/project";
import { Filter } from "@/models/Common";

function* fetchContractProjectWorker(
  action: PayloadAction<{ filter: Filter; id: string }>
) {
  try {
    const data = yield call(
      getContractOfProject,
      action.payload.filter,
      action.payload.id
    );
    if (data.isSuccess) {
      yield put(contractProjectActions.fetchContractProjectSuccess(data));
    } else {
      messageError(data.message);
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
