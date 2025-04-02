import { call, fork, put, select, take } from "redux-saga/effects";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import { DocsTypeState, docsTypeActions } from "./docsTypeSlices";
import { getDocsType, createDocsType, getPagingDocsType } from "@/api/docsType";
import { DocsType } from "@/models/DocsType";

function* fetchDocsTypeWorker(action: PayloadAction<Filter>) {
  try {
    const response = yield call(getPagingDocsType, action.payload);
    if (response.isSuccess) {
      yield put(docsTypeActions.getDocsTypeSuccess(response));
    } else {
      yield put(docsTypeActions.getDocsTypeFail());
    }
  } catch (error) {
    yield put(docsTypeActions.getDocsTypeFail());
    messageError(error);
  }
}

function* createDocsTypeWorker(action: PayloadAction<DocsType>) {
  try {
    const response = yield call(createDocsType, action.payload);
    if (response.isSuccess) {
      yield put(docsTypeActions.createDocsTypeSuccess());
      const docsTypeState: DocsTypeState = yield select(
        (state) => state.docsType
      );
      yield put(
        docsTypeActions.getDocsType({
          pageNumber: docsTypeState.docsType.pageNumber,
          pageSize: docsTypeState.docsType.pageSize,
        })
      );
      messageSuccess(response.message);
    } else {
      yield put(docsTypeActions.createDocsTypeFail());
    }
  } catch (error) {
    yield put(docsTypeActions.createDocsTypeFail());
    messageError(error);
  }
}

function* watchFetchDocsType() {
  while (true) {
    const action: PayloadAction<Filter> = yield take(
      docsTypeActions.getDocsType
    );
    yield fork(fetchDocsTypeWorker, action);
  }
}

function* watchCreateDocsType() {
  while (true) {
    const action: PayloadAction<DocsType> = yield take(
      docsTypeActions.createDocsType
    );
    yield fork(createDocsTypeWorker, action);
  }
}

export function* docsTypeSaga() {
  yield fork(watchFetchDocsType);
  yield fork(watchCreateDocsType);
}
