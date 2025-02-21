import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authSlice from "../slices/auth/authSlices";
import  packageItemSlice  from "../slices/packageItem/packageItemSlices";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from "@/utils/history";
import rootSaga from "./rootSaga";

const rootReducers = combineReducers({
  router : connectRouter(history),
  auth: authSlice,
  packageItem: packageItemSlice,

});

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
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
export default store;
