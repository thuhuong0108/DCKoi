import { getDesign } from "@/api/design";
import {
  getContractActiveProject,
  getDesignApproval,
  getProject,
  getProjectConstruction,
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

export function* projectStateDetailSaga() {
  yield fork(fetchProjectDetailWatcher);
  yield fork(fetchDesignWatcher);
  yield fork(fetchConstructionWatcher);
  yield fork(fetchContractWatcher);
  yield fork(fetchTaskWatcher);
}
