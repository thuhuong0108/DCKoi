import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authSlice from "../slices/auth/authSlices";
import packageItemSlice from "../slices/packageItem/packageItemSlices";
import equipmentSlice from "../slices/equipment/equipmentSlice";

import packageSlice from "../slices/package/packageSlices";
import templateConstructionSlice from "../slices/templateConstruction/templateContrutionSlices";
import templateConstructionDetailSlice from "../slices/templateConstructionDetail/templateConstructionDetailSlices";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from "@/utils/history";
import rootSaga from "./rootSaga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import serviceSlice from "../slices/service/serviceSlice";
import staffSlice from "../slices/staff/staffSlice";
import projectSlice from "../slices/project/projectSlices";
import projectDetailSlice from "../slices/projectDetail/projectDetailSlices";
import quotationProjectSlice from "../slices/quotationProject/QuotationProjectSlices";
import quotationSlice from "../slices/quotation/quotationSlices";
import quotationDetailSlice from "../slices/quotationDetail/quotationDetailSlices";

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authSlice,
  packageItem: packageItemSlice,
  equipment: equipmentSlice,
  service: serviceSlice,
  staff: staffSlice,
  package: packageSlice,
  templateConstruction: templateConstructionSlice,
  templateConstructionDetail: templateConstructionDetailSlice,
  project: projectSlice,
  projectDetail: projectDetailSlice,
  quotationProject: quotationProjectSlice,
  quotation: quotationSlice,
  quotationDetail: quotationDetailSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      sagaMiddleware,
      routerMiddleware(history)
    ),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
