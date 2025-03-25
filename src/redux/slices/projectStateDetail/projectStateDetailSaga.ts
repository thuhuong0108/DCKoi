import { getDesign } from "@/api/design";
import {
  getContractActiveProject,
  getDesignApproval,
  getIssuesConstructionItem,
  getIssuesProject,
  getProject,
  getProjectConstruction,
  getProjectDocs,
  getTasksDoneProject,
} from "@/api/project";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { projectStateDetailActions } from "./projectStateDetailSlices";
import { contractActions } from "../contract/contractSlices";
import { Filter } from "@/models/Common";

function* fetchProjectDetailWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getProject, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchProjectDetailSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchProjectDetailFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchProjectDetailFailed());
    console.log("error", error);
  }
}

function* fetchDesignWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getDesignApproval, action.payload);

    if (data.isSuccess) {
      const updatedData = yield Promise.all(
        data.data.map(async (item) => {
          const design = await getDesign(item.id);
          if (design.isSuccess) {
            item = design.data;
          }
          return item;
        })
      );

      yield put(projectStateDetailActions.fetchDesignsSuccess(updatedData));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchDesignsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchDesignsFailed());
    console.log("error", error);
  }
}

function* fetchConstructionWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getProjectConstruction, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchConstructionsSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchConstructionsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchConstructionsFailed());
    console.log("error", error);
  }
}

function* fetchContractWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getContractActiveProject, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchContractsSuccess(data.data));
      yield put(contractActions.fetchContract(data.data[0].id));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchContractsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchContractsFailed());
    console.log("error", error);
  }
}

function* fetchTaskWorker(
  action: PayloadAction<{ id: string; filter: Filter }>
) {
  try {
    const data = yield call(
      getTasksDoneProject,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchTasksSuccess(data));
    } else {
      yield put(projectStateDetailActions.fetchTasksFailed());
    }
  } catch (error) {
    messageError("Hệ thống đang bị lỗi");
    console.log(error);
    yield put(projectStateDetailActions.fetchTasksFailed());
  }
}

function* fetchIssueWorker(action: PayloadAction<string>) {
  try {
    const data = yield call(getIssuesProject, action.payload);
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchIssuesSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchIssuesFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchIssuesFailed());
    console.log("error", error);
  }
}

function* fetchIssueConstructionItemWorker(
  action: PayloadAction<{ idProject: string; idConstructionItem: string }>
) {
  try {
    const data = yield call(
      getIssuesConstructionItem,
      action.payload.idProject,
      action.payload.idConstructionItem
    );
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchIssuesSuccess(data.data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchIssuesFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchIssuesFailed());
    console.log("error", error);
  }
}

function* fetchDocsWorker(
  action: PayloadAction<{ id: string; filter: Filter }>
) {
  try {
    const data = yield call(
      getProjectDocs,
      action.payload.id,
      action.payload.filter
    );
    if (data.isSuccess) {
      yield put(projectStateDetailActions.fetchDocsSuccess(data));
    } else {
      messageError(data.message);
      yield put(projectStateDetailActions.fetchDocsFailed());
    }
  } catch (error) {
    yield put(projectStateDetailActions.fetchDocsFailed());
    console.log("error", error);
  }
}

function* fetchProjectDetailWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchProjectDetail
    );
    yield fork(fetchProjectDetailWorker, action);
  }
}

function* fetchDesignWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchDesigns
    );
    yield fork(fetchDesignWorker, action);
  }
}

function* fetchConstructionWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchConstructions
    );
    yield fork(fetchConstructionWorker, action);
  }
}

function* fetchContractWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchContracts
    );
    yield fork(fetchContractWorker, action);
  }
}

function* fetchTaskWatcher() {
  while (true) {
    const action: PayloadAction<{ id: string; filter: Filter }> = yield take(
      projectStateDetailActions.fetchTasks
    );
    yield fork(fetchTaskWorker, action);
  }
}

function* fetchIssueWatcher() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      projectStateDetailActions.fetchIssues
    );
    yield fork(fetchIssueWorker, action);
  }
}

function* fetchIssueConstructionItemWatcher() {
  while (true) {
    const action: PayloadAction<{
      idProject: string;
      idConstructionItem: string;
    }> = yield take(projectStateDetailActions.fetchIssueConstructionItem);
    yield fork(fetchIssueConstructionItemWorker, action);
  }
}

function* fetchDocsWatcher() {
  while (true) {
    const action: PayloadAction<{ id: string; filter: Filter }> = yield take(
      projectStateDetailActions.fetchDocs
    );
    yield fork(fetchDocsWorker, action);
  }
}

export function* projectStateDetailSaga() {
  yield fork(fetchProjectDetailWatcher);
  yield fork(fetchDesignWatcher);
  yield fork(fetchConstructionWatcher);
  yield fork(fetchContractWatcher);
  yield fork(fetchTaskWatcher);
  yield fork(fetchIssueWatcher);
  yield fork(fetchIssueConstructionItemWatcher);
  yield fork(fetchDocsWatcher);
}
