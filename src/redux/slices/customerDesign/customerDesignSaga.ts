import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { customerDesignActions } from "./customerDesignSlices";
import { getAllDesignForSpecificProject } from "@/api/project";
import { messageError } from "@/components";
import { call, fork, put, take } from "redux-saga/effects";

function* fetchCustomerDesignWorker(action: PayloadAction<{ id: string; filter: Filter }>) {
    try {
        const { id, filter } = action.payload;
        const data = yield call(getAllDesignForSpecificProject, id, filter);
        if (data.isSuccess) {
            yield put(customerDesignActions.fetchCustomerDesignSuccess(data));
        } else {
            messageError(data.message);
            yield put(customerDesignActions.fetchCustomerDesignFailed());
        }
    } catch (error) {
        messageError("Fetch customerDesign failed");
        console.log(error);
        yield put(customerDesignActions.fetchCustomerDesignFailed());
    }
}

function* fetchCustomerDesignWatcher() {
    while (true) {
        const action = yield take(customerDesignActions.fetchCustomerDesign);
        yield fork(fetchCustomerDesignWorker, action);
    }
}

export function* customerDesignSaga() {
    yield fork(fetchCustomerDesignWatcher);
}
