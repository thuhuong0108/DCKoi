import { ServiceType } from "./../../../models/ServiceType";
import { call, fork, put, select, take } from "redux-saga/effects";
import { serviceActions, ServiceState } from "./serviceSlice";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import {
  createService,
  deleteService,
  getAllService,
  updateService,
} from "@/api/service";

function* fetchServiceWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getAllService, action.payload);
    if (data.isSuccess) {
      yield put(serviceActions.fetchServiceSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(serviceActions.fetchServiceFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(serviceActions.fetchServiceFaild());
    console.log(error);
  }
}

function* createServiceWorker(action: PayloadAction<ServiceType>) {
  try {
    const data = yield call(createService, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const serviceState: ServiceState = yield select((state) => state.service);

      yield put(
        serviceActions.fetchService({
          pageNumber: serviceState.services.pageNumber,
          pageSize: serviceState.services.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(serviceActions.fetchServiceFaild());
    console.log(error);
  }
}

function* updateServiceWorker(action: PayloadAction<ServiceType>) {
  try {
    const data = yield call(updateService, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const serviceState: ServiceState = yield select((state) => state.service);
      yield put(
        serviceActions.fetchService({
          pageNumber: serviceState.services.pageNumber,
          pageSize: serviceState.services.pageSize,
        })
      );
    } else {
      messageSuccess(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(serviceActions.fetchServiceFaild());
    console.log(error);
  }
}

function* deleteServiceWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(deleteService, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const serviceState: ServiceState = yield select((state) => state.service);
      yield put(
        serviceActions.fetchService({
          pageNumber: serviceState.services.pageNumber,
          pageSize: serviceState.services.pageSize,
        })
      );
    } else {
      messageSuccess(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(serviceActions.fetchServiceFaild());
    console.log(error);
  }
}

function* fetchServiceWatcher() {
  while (true) {
    const action = yield take(serviceActions.fetchService);
    yield fork(fetchServiceWorker, action);
  }
}

function* createServiceWatcher() {
  while (true) {
    const action = yield take(serviceActions.createService);
    yield fork(createServiceWorker, action);
  }
}

function* updateServiceWatcher() {
  while (true) {
    const action = yield take(serviceActions.updateService);
    yield fork(updateServiceWorker, action);
  }
}

function* deleteServiceWatcher() {
  while (true) {
    const action = yield take(serviceActions.deleteService);
    yield fork(deleteServiceWorker, action);
  }
}

export function* serviceSaga() {
  yield fork(fetchServiceWatcher);
  yield fork(createServiceWatcher);
  yield fork(updateServiceWatcher);
  yield fork(deleteServiceWatcher);
}
