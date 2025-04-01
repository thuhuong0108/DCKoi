import { PromotionType } from "@/models/PromotionType";
import { call, fork, put, select, take } from "redux-saga/effects";
import { PromotionState, promotionActions } from "./promotionSlices";
import { messageError, messageSuccess } from "@/components";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/models/Common";
import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  getPromotions,
  updatePromotion,
} from "@/api/promotion";

function* fetchPromotionWorker(action: PayloadAction<Filter>) {
  try {
    const data = yield call(getAllPromotions, action.payload);
    if (data.isSuccess) {
      yield put(promotionActions.fetchPromotionSuccess(data));
    } else {
      yield put(promotionActions.fetchPromotionFailed());
      messageError(data.message);
    }
  } catch (error) {
    yield put(promotionActions.fetchPromotionFailed());
    messageError(error.message);
  }
}

function* createPromotionWorker(action: PayloadAction<PromotionType>) {
  try {
    const res = yield call(createPromotion, action.payload);
    if (res.isSuccess) {
      messageSuccess(res.message);
      const promotionState: PromotionState = yield select(
        (state) => state.promotion
      );

      yield put(
        promotionActions.fetchPromotion({
          pageNumber: promotionState.promotions.pageNumber,
          pageSize: promotionState.promotions.pageSize,
        })
      );
    } else {
      messageError(res.message);
    }
  } catch (error) {
    messageError(error.message);
  }
}

function* updatePromotionWorker(action: PayloadAction<PromotionType>) {
  try {
    const res = yield call(updatePromotion, action.payload);
    if (res.isSuccess) {
      messageSuccess(res.message);
      const promotionState: PromotionState = yield select(
        (state) => state.promotion
      );
      yield put(
        promotionActions.fetchPromotion({
          pageNumber: promotionState.promotions.pageNumber,
          pageSize: promotionState.promotions.pageSize,
        })
      );
    } else {
      messageError(res.message);
    }
  } catch (error) {
    messageError(error.message);
  }
}

function* deletePromotionWorker(action: PayloadAction<string>) {
  try {
    const res = yield call(deletePromotion, action.payload);
    if (res.isSuccess) {
      messageSuccess(res.message);
      const promotionState: PromotionState = yield select(
        (state) => state.promotion
      );
      yield put(
        promotionActions.fetchPromotion({
          pageNumber: promotionState.promotions.pageNumber,
          pageSize: promotionState.promotions.pageSize,
        })
      );
    } else {
      messageError(res.message);
    }
  } catch (error) {
    messageError(error.message);
  }
}

function* watchFetchPromotion() {
  while (true) {
    const action = yield take(promotionActions.fetchPromotion.type);
    yield fork(fetchPromotionWorker, action);
  }
}

function* watchCreatePromotion() {
  while (true) {
    const action = yield take(promotionActions.createPromotion.type);
    yield fork(createPromotionWorker, action);
  }
}

function* watchUpdatePromotion() {
  while (true) {
    const action = yield take(promotionActions.updatePromotion.type);
    yield fork(updatePromotionWorker, action);
  }
}

function* watchDeletePromotion() {
  while (true) {
    const action = yield take(promotionActions.deletePromotion.type);
    yield fork(deletePromotionWorker, action);
  }
}

export default function* promotionSaga() {
  yield fork(watchFetchPromotion);
  yield fork(watchCreatePromotion);
  yield fork(watchUpdatePromotion);
  yield fork(watchDeletePromotion);
}
