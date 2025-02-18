import { authSaga } from "../slices/auth/authSaga";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([authSaga()]);
}