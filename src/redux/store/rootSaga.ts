import { authSaga } from "../slices/auth/authSaga";
import { packageItemSaga } from "../slices/packageItem/packageItemSaga";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([authSaga(), packageItemSaga()]);
}