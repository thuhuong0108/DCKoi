import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PackageType } from "@/models";
import { Filter, Pagination } from "@/models/Common";

export interface PackageState {
  loading: boolean;
  packageItems: Pagination<PackageType>;
}

const initialState: PackageState = {
  loading: false,
  packageItems: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  },
};

export const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    getPackage(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    getPackageSuccess(state, action: PayloadAction<Pagination<PackageType>>) {
      state.loading = false;
      state.packageItems = action.payload;
    },
    getPackageFailed(state) {
      state.loading = false;
    },
  },
});

// selectors
export const selectPackage = (state: RootState) => state.package.packageItems;
export const selectPackageLoading = (state: RootState) => state.package.loading;

// actions
export const packageActions = packageSlice.actions;

// reducer
export default packageSlice.reducer;
