import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import { issueTypeActions, IssueTypeState } from "./issueSlices";
import {
  createIssueType,
  deleteIssueType,
  getAllIssueType,
  updateIssueType,
} from "@/api/IssueType";
import { IssueType } from "@/models";

function* fetchIssueTypeWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getAllIssueType, action.payload);
    if (data.isSuccess) {
      yield put(issueTypeActions.fetchIssueTypeSuccess(data));
    } else {
      messageSuccess(data.message);
      yield put(issueTypeActions.fetchIssueTypeFaild());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(issueTypeActions.fetchIssueTypeFaild());
    console.log(error);
  }
}

function* createissueTypeWorker(action: PayloadAction<IssueType>) {
  try {
    const data = yield call(createIssueType, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const issueTypeState: IssueTypeState = yield select(
        (state) => state.issueType
      );

      yield put(
        issueTypeActions.fetchIssueType({
          pageNumber: issueTypeState.issueTypes.pageNumber,
          pageSize: issueTypeState.issueTypes.pageSize,
        })
      );
    } else {
      messageError(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(issueTypeActions.fetchIssueTypeFaild());
    console.log(error);
  }
}

function* updateissueTypeWorker(action: PayloadAction<IssueType>) {
  try {
    const data = yield call(updateIssueType, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const issueTypeState: IssueTypeState = yield select(
        (state) => state.issueType
      );
      yield put(
        issueTypeActions.fetchIssueType({
          pageNumber: issueTypeState.issueTypes.pageNumber,
          pageSize: issueTypeState.issueTypes.pageSize,
        })
      );
    } else {
      messageSuccess(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(issueTypeActions.fetchIssueTypeFaild());
    console.log(error);
  }
}

function* deleteissueTypeWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(deleteIssueType, action.payload);
    if (data.isSuccess) {
      messageSuccess(data.message);
      const issueTypeState: IssueTypeState = yield select(
        (state) => state.issueType
      );
      yield put(
        issueTypeActions.fetchIssueType({
          pageNumber: issueTypeState.issueTypes.pageNumber,
          pageSize: issueTypeState.issueTypes.pageSize,
        })
      );
    } else {
      messageSuccess(data.message);
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    yield put(issueTypeActions.fetchIssueTypeFaild());
    console.log(error);
  }
}

function* fetchIssueTypeWatcher() {
  while (true) {
    const action = yield take(issueTypeActions.fetchIssueType);
    yield fork(fetchIssueTypeWorker, action);
  }
}

function* createissueTypeWatcher() {
  while (true) {
    const action = yield take(issueTypeActions.createIssueType);
    yield fork(createissueTypeWorker, action);
  }
}

function* updateissueTypeWatcher() {
  while (true) {
    const action = yield take(issueTypeActions.updateIssueType);
    yield fork(updateissueTypeWorker, action);
  }
}

function* deleteissueTypeWatcher() {
  while (true) {
    const action = yield take(issueTypeActions.deleteIssueType);
    yield fork(deleteissueTypeWorker, action);
  }
}

export function* issueTypeSaga() {
  yield fork(fetchIssueTypeWatcher);
  yield fork(createissueTypeWatcher);
  yield fork(updateissueTypeWatcher);
  yield fork(deleteissueTypeWatcher);
}
