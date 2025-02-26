import { assignConsultant, getProjectForConsultation } from "@/api/consultation";
import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { consultationActions, ConsultationState } from "./consultationSlice";
import { messageError, messageSuccess } from "@/components";
import { call, fork, put, select, take } from "redux-saga/effects";
import { ConsultationStaff } from "@/models/Consultation";

function* fetchConsultationWorker(action: PayloadAction<Filter>) {
    try {
        const data = yield call(getProjectForConsultation, action.payload);
        if (data.isSuccess) {
            yield put(consultationActions.fetchConsultationSuccess(data));
        } else {
            messageError(data.message);
            yield put(consultationActions.fetchConsultationFailed());
        }
    } catch (error) {
        yield put(consultationActions.fetchConsultationFailed());
        console.log("error", error);
    }
}

function* assignConsultantWorker(action: PayloadAction<{ projectId: string; staff: ConsultationStaff }>) {
    try {
        const { projectId, staff } = action.payload;
        const data = yield call(assignConsultant, projectId, staff);

        if (data.isSuccess) {
            messageSuccess(data.message);
            const consultationState: ConsultationState = yield select(
                (state) => state.consultation
            );

            yield put(
                consultationActions.fetchConsultation({
                    pageNumber: consultationState.consultations.pageNumber,
                    pageSize: consultationState.consultations.pageSize
                })
            )
        } else {
            messageError(data.message);
        }
    } catch (error) {
        messageError("Hệ thống đang bị lỗi");
        console.log("error", error);
    }
}

function* fetchConsultationWatcher() {
    while (true) {
        const action = yield take(consultationActions.fetchConsultation);
        yield fork(fetchConsultationWorker, action);
    }
}

function* assignConsultantWatcher() {
    while (true) {
        const action = yield take(consultationActions.assignConsultant);
        yield fork(assignConsultantWorker, action);
    }
}

export function* consultationSaga() {
    yield fork(fetchConsultationWatcher);
    yield fork(assignConsultantWatcher);
}