import { authSaga } from "../slices/auth/authSaga";
import { packageItemSaga } from "../slices/packageItem/packageItemSaga";
import { packageSaga } from "../slices/package/packageSaga";
import { templateConstructionSaga } from "../slices/templateConstruction/templateConstructionSaga";
import { templateConstructionDetailSaga } from "../slices/templateConstructionDetail/templateConstructionDetailSaga";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    authSaga(),
    packageItemSaga(),
    packageSaga(),
    templateConstructionSaga(),
    templateConstructionDetailSaga(),
  ]);
}
