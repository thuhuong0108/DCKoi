import { authSaga } from "../slices/auth/authSaga";
import { packageSaga } from "../slices/package/packageSaga";
import { packageItemSaga } from "../slices/packageItem/packageItemSaga";
import { projectSaga } from "../slices/project/projectSaga";

import { all } from "redux-saga/effects";


export default function* rootSaga() {
  yield all([authSaga(), packageItemSaga(), projectSaga(), packageSaga()]);
}