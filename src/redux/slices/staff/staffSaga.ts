import { createStaff, getAllStaff } from "@/api/staff";
import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { staffActions, StaffState } from "./staffSlice";
import { messageError, messageSuccess } from "@/components";
import { StaffType } from "@/models";

function* fetchStaffWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getAllStaff, action.payload);
    if (data.isSuccess) {
      yield put(staffActions.fetchStaffSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(staffActions.fetchStaffFaild);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(staffActions.fetchStaffFaild);
    console.log(error);
  }
}

function* createStaffWorker(action: PayloadAction<StaffType>) {
  try {
    const data = yield call(createStaff, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const staffState: StaffState = yield select((state) => state.staff);

      yield put(
        staffActions.fetchStaff({
          pageNumber: staffState.staffs.pageNumber,
          pageSize: staffState.staffs.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(staffActions.fetchStaffFaild);
    console.log(error);
  }
}

function* fetchStaffWatcher() {
  while (true) {
    const action = yield take(staffActions.fetchStaff);
    yield fork(fetchStaffWorker, action);
  }
}

function* createStaffWatcher() {
  while (true) {
    const action = yield take(staffActions.createStaff);
    yield fork(createStaffWorker, action);
  }
}

export function* staffSaga() {
  yield fork(fetchStaffWatcher);
  yield fork(createStaffWatcher);
}
