import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import {
  acceptContract,
  createContract,
  getContract,
  rejectContract,
  verifyContract,
} from "@/api/contract";
import { contractActions, ContractState } from "./contractSlices";
import { ContractRequest } from "@/models/Request/ContractRequest";
import { VerifyContractType } from "@/models";

function* fetchContractWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getContract, action.payload);
    if (data.isSuccess) {
      yield put(contractActions.fetchContractSuccess(data));
    } else {
      yield put(contractActions.fetchContractFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(contractActions.fetchContractFailed());
    console.log(error);
  }
}

function* createContractWorker(action: PayloadAction<ContractRequest>) {
  try {
    const data = yield call(createContract, action.payload);
    if (data.isSuccess) {
      messageSuccess("Hợp đồng được gửi thành công");
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(contractActions.fetchContractFailed());
    console.log(error);
  }
}

function* rejectContractWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(rejectContract, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);

      yield put(contractActions.rejectContract(data));
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* acceptContractWorker(action: PayloadAction<string>) {
  console.log(action.payload);
  try {
    const data = yield call(acceptContract, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);

      yield put(contractActions.acceptContract(data));
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* verifyContractWorker(action: PayloadAction<VerifyContractType>) {
  try {
    const data = yield call(verifyContract, action.payload);

    if (data.isSuccess) {
      messageSuccess("Hợp đồng đã có hiệu lực");

      yield put(contractActions.verifyContract(data));
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* fetchContractWatcher() {
  while (true) {
    const action = yield take(contractActions.fetchContract);
    yield fork(fetchContractWorker, action);
  }
}

function* createContractWatcher() {
  while (true) {
    const action = yield take(contractActions.createContract);
    yield fork(createContractWorker, action);
  }
}

function* rejectContractWatcher() {
  while (true) {
    const action = yield take(contractActions.rejectContract);
    yield fork(rejectContractWorker, action);
  }
}

function* acceptContractWatcher() {
  while (true) {
    const action = yield take(contractActions.acceptContract);
    yield fork(acceptContractWorker, action);
  }
}

function* verifyContractWatcher() {
  while (true) {
    const action = yield take(contractActions.verifyContract);
    yield fork(verifyContractWorker, action);
  }
}

export function* contractSaga() {
  yield fork(fetchContractWatcher);
  yield fork(createContractWatcher);
  yield fork(rejectContractWatcher);
  yield fork(acceptContractWatcher);
  yield fork(verifyContractWatcher);
}
