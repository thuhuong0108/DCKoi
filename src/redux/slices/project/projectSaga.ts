import { createProject, getPagingProject } from "@/api/project";
import { Filter } from "@/models/Common";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import { projectActions, ProjectState } from "./projectSlices";
import { messageError, messageSuccess } from "@/components";
import { ProjectType } from "@/models/Project";

function* fetchItemWorker(action: PayloadAction<Filter>) {
    try {
        const data = yield call(getPagingProject, action.payload);
        if (data.isSuccess) {
            yield put(projectActions.fetchProjectSuccess(data));
        }
        else {
            messageError(data.message);
            yield put(projectActions.fetchProjectFailed());
        }
    }
    catch (error) {
        messageError("Fetch project failed");
        console.log(error);
        yield put(projectActions.fetchProjectFailed());
    }
}

function* createItemWorker(action: PayloadAction<ProjectType>) {
    try {
        console.log(action.payload);
        const data = yield call(createProject, action.payload);

        if (data.isSuccess) {
            messageSuccess(data.message);
            const projectState: ProjectState = yield select(
                (state) => state.packageItem
            );

            yield put(
                projectActions.fetchProject({
                    pageNumber: projectState.project.pageNumber,
                    pageSize: projectState.project.pageSize,
                })
            );
        } else {
            messageError(data.message);
        }
    } catch (error) {
        messageError("System error");
        console.log(error);
    }
}

function* fetchItemWatcher() {
    while (true) {
        const action = yield take(projectActions.fetchProject);
        yield fork(fetchItemWorker, action);
    }
}

function* createItemWatcher() {
    while (true) {
        const action = yield take(projectActions.createProject);
        yield fork(createItemWorker, action);
    }
}

export function* projectSaga() {
    yield fork(fetchItemWatcher);
    yield fork(createItemWatcher);
}
