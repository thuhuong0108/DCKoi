import {
  createEquipment,
  deleteEquipment,
  getAllEquipment,
  updateEquipment,
} from "@/api/equipment";
import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { equipmentActions, EquipmentState } from "./equipmentSlice";
import { messageError, messageSuccess } from "@/components";
import { EquipmentType } from "@/models";

function* fetchEquipmentWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getAllEquipment, action.payload);
    if (data.isSuccess) {
      yield put(equipmentActions.fetchEquipmentSuccess(data));
    } else {
      messageError(data.message);
      yield put(equipmentActions.fetchEquipmentFailed());
    }
  } catch (error) {
    yield put(equipmentActions.fetchEquipmentFailed());
    console.log("error", error);
  }
}

// create
function* createEquipmentWorker(action: PayloadAction<EquipmentType>) {
  try {
    const data = yield call(createEquipment, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const equipmentState: EquipmentState = yield select(
        (state) => state.equipment
      );

      yield put(
        equipmentActions.fetchEquipment({
          pageNumber: equipmentState.equipments.pageNumber,
          pageSize: equipmentState.equipments.pageSize,
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

// //update
function* updateEquipmentWorker(action: PayloadAction<EquipmentType>) {
  try {
    const data = yield call(updateEquipment, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const equipmentState: EquipmentState = yield select(
        (state) => state.equipment
      );

      yield put(
        equipmentActions.fetchEquipment({
          pageNumber: equipmentState.equipments.pageNumber,
          pageSize: equipmentState.equipments.pageSize,
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

//delete
function* deleteEquipmentWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(deleteEquipment, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const equipmentState: EquipmentState = yield select(
        (state) => state.equipment
      );

      yield put(
        equipmentActions.fetchEquipment({
          pageNumber: equipmentState.equipments.pageNumber,
          pageSize: equipmentState.equipments.pageSize,
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

function* fetchEquipmentWatcher() {
  while (true) {
    const action = yield take(equipmentActions.fetchEquipment);
    yield fork(fetchEquipmentWorker, action);
  }
}

function* createEquipmentWatcher() {
  while (true) {
    const action = yield take(equipmentActions.createEquipment);
    yield fork(createEquipmentWorker, action);
  }
}

function* updateEquipmentWatcher() {
  while (true) {
    const action = yield take(equipmentActions.updateEquipment);
    yield fork(updateEquipmentWorker, action);
  }
}

function* deleteEquipmentWatcher() {
  while (true) {
    const action = yield take(equipmentActions.deleteEquipment);
    yield fork(deleteEquipmentWorker, action);
  }
}

export function* equipmentSaga() {
  yield fork(fetchEquipmentWatcher);
  yield fork(createEquipmentWatcher);
  yield fork(updateEquipmentWatcher);
  yield fork(deleteEquipmentWatcher);
}
