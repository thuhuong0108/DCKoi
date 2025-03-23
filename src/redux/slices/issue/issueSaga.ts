import {
  confirmIssue,
  createIssue,
  deleteIssue,
  updateIssue,
} from "@/api/issue";
import { messageError, messageSuccess } from "@/components";
import { IssueProjectType } from "@/models";
import { IssueRequest } from "@/models/Request/IssueRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, select, take } from "redux-saga/effects";
import {
  ProjectStateDetail,
  projectStateDetailActions,
} from "../projectStateDetail/projectStateDetailSlices";
import { issueActions } from "./issueSlices";

// create
function* createIssueWorker(
  action: PayloadAction<{ issue: IssueRequest; constructionItemId: string }>
) {
  try {
    const data = yield call(
      createIssue,
      action.payload.issue,
      action.payload.constructionItemId
    );
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

// //update
function* updateIssueWorker(action: PayloadAction<IssueProjectType>) {
  try {
    const data = yield call(updateIssue, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

//delete
function* deleteIssueWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(deleteIssue, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* confirmIssueWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(confirmIssue, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const project: ProjectStateDetail = yield select(
        (state) => state.project
      );

      yield put(
        projectStateDetailActions.fetchIssues(project.project.detail.id)
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
  }
}

function* createIssueWatcher() {
  while (true) {
    const action = yield take(issueActions.createIssue);
    yield fork(createIssueWorker, action);
  }
}

function* updateIssueWatcher() {
  while (true) {
    const action = yield take(issueActions.updateIssue);
    yield fork(updateIssueWorker, action);
  }
}

function* deleteIssueWatcher() {
  while (true) {
    const action = yield take(issueActions.deleteIssue);
    yield fork(deleteIssueWorker, action);
  }
}

function* confirmIssueWatcher() {
  while (true) {
    const action = yield take(issueActions.confirmIssue);
    yield fork(confirmIssueWorker, action);
  }
}

export function* issueSaga() {
  yield fork(createIssueWatcher);
  yield fork(updateIssueWatcher);
  yield fork(deleteIssueWatcher);
  yield fork(confirmIssueWatcher);
}
