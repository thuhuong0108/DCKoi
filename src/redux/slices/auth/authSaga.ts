import { loginApi } from "@/api/auth";
import { messageError } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, take } from "redux-saga/effects";
import { LoginPayload, authActions } from "./authSlices";
import { useNavigation } from "@/contexts/NavigationContext";

function* loginWorker(action: PayloadAction<LoginPayload>) {
  try {
    const data = yield call(loginApi, action.payload);
    if (data.isSuccess) {
      // set to local storage
      localStorage.setItem("token", data.data.token);
      yield put(authActions.loginSuccess(data));
        yield put(push("/"));
     
    } else {
      messageError(data.message);
      yield put(authActions.loginFailed());
    }
  } catch (error) {
    messageError("Login failed");
    console.log(error);
    yield put(authActions.loginFailed());
  }
}

function* logoutWorker() {
    yield put(authActions.logout());
    localStorage.removeItem("token");
}

function* loginWatcher() {
  while (true) {
    const action = yield take(authActions.login);
    yield fork(loginWorker, action);
  }
}

function* logoutWatcher() {
  while (true) {
    yield take(authActions.logout);
    yield fork(logoutWorker);
  }
}

export function* authSaga() {
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
}