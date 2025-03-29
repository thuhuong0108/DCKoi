import { call, fork, put, select, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { messageError, messageSuccess } from "@/components";

import {
  IssueConstructorState,
  issueConstructorActions,
} from "./issueConstructorSlices";
import { Filter } from "@/models/Common";
import { getIssueProject, getIssuesConstructionItem } from "@/api/project";

function* fetchConstructionIssueWorker(
  action: PayloadAction<{ filter: Filter; id: string }>
) {
  try {
    const data = yield call(
      getIssueProject,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(issueConstructorActions.fetchIssuesSuccess(data));
    } else {
      messageError(data.message);
      yield put(issueConstructorActions.fetchIssuesFailed());
    }
  } catch (error) {
    yield put(issueConstructorActions.fetchIssuesFailed());
    console.log("error", error);
  }
}

function* fetchConstructionIssueWatcher() {
  while (true) {
    const action = yield take(issueConstructorActions.fetchIssues.type);
    yield fork(fetchConstructionIssueWorker, action);
  }
}

export function* issueConstructorSaga() {
  yield fork(fetchConstructionIssueWatcher);
}
