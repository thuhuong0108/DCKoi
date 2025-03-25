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
import quotationProjectSlice from "../slices/quotationProject/quotationProjectSlices";
import quotationSlice from "../slices/quotation/quotationSlices";
import quotationDetailSlice from "../slices/quotationDetail/quotationDetailSlices";
import designSlice from "../slices/design/designSlices";
import designImageSlice from "../slices/imageDesign/imageDesignSlices";
import designDetailSlice from "../slices/designDetail/designDetailSlices";
import customerDesignSlice from "../slices/customerDesign/customerDesignSlices";
import constructionSlice from "../slices/construction/constructionSlices";
import contractSlice from "../slices/contract/contractSlices";
import contractProjectSlice from "../slices/contractProject/contractProjectSlices";
import constructionProjectSlice from "../slices/constructionProject/constructionProjectSlices";
import projectBoardSlice from "../slices/projectBoard/projectBoardSlices";
import projectStateDetailSlice from "../slices/projectStateDetail/projectStateDetailSlices";
import constructionItemStage from "../slices/constructionItemStage/constructionItemSlices";
import taskConstructorSlice from "../slices/taskConstructor/taskConstructorSlices";
import transactionsSlice from "../slices/transaction/transactionSlices";
import issuelSlice from "../slices/issue/issueSlices";
import issueConstructorSlice from "../slices/issueConstructor/issueConstructorSlices";
import packageMaintainceSlice from "../slices/packageMaintaice/packageMaintainceSlices";
import maintenancesSlice from "../slices/maintaince/maintainceSlices";

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
  design: designSlice,
  designImage: designImageSlice,
  customerDesign: customerDesignSlice,
  designDetail: designDetailSlice,
  construction: constructionSlice,
  contract: contractSlice,
  contractProject: contractProjectSlice,
  constructionProject: constructionProjectSlice,
  projectBoard: projectBoardSlice,
  projectStateDetail: projectStateDetailSlice,
  constructionItemStage: constructionItemStage,
  taskConstructor: taskConstructorSlice,
  transaction: transactionsSlice,
  issue: issuelSlice,
  issueConstructor: issueConstructorSlice,
  packageMaintaince: packageMaintainceSlice,
  maintenances: maintenancesSlice,
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
