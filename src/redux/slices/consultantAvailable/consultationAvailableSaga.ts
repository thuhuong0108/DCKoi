import { getAllConsultantAvailable } from "@/api/staff";
import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { consultantAvailableActions } from "./consultantAvailableSlice";
import { call, fork, put, take } from "redux-saga/effects";
import { messageError } from "@/components";

function* fetchConsultantAvailableWorker(action: PayloadAction<Filter>) {
    try {
        const data = yield call(getAllConsultantAvailable, action.payload);
        if (data.isSuccess) {
            yield put(consultantAvailableActions.fetchConsultantAvailableSuccess(data));
        } else {
            messageError(data.message);
            yield put(consultantAvailableActions.fetchConsultantAvailableFailed());
        }
    } catch (error) {
        yield put(consultantAvailableActions.fetchConsultantAvailableFailed());
        console.log("error", error);
    }
}

function* fetchConsultantAvailableWatcher() {
    while (true) {
        const action = yield take(consultantAvailableActions.fetchConsultantAvailable);
        yield fork(fetchConsultantAvailableWorker, action);
    }
}

export function* consultantAvailableSaga() {
    yield fork(fetchConsultantAvailableWatcher);
}
