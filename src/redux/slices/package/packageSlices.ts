import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { PackageType } from "@/models";

export interface PackageState {
  loading: boolean;
  packages: Pagination<PackageType>;
}

const initialState: PackageState = {
  loading: false,
  packages: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    fetchPackages(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchPackagesSuccess(
      state,
      action: PayloadAction<Pagination<PackageType>>
    ) {
      state.packages = action.payload;
      state.loading = false;
    },
    fetchPackagesFailed(state) {
      state.loading = false;
    },

    //create
    createPackage(state, action: PayloadAction<PackageType>) {
      state.packages.data.unshift(action.payload);
    },

    //update
    updatePackage(state, action: PayloadAction<PackageType>) {
      console.log("updatePackage", action.payload);
    },

    //delete
    deletePackage(state, action: PayloadAction<string>) {
      console.log("deletePackage", action.payload);
    },
  },
});

// selectors
export const selectPackages = (state: RootState) =>
  state.package.packages;
export const selectLoading = (state: RootState) => state.package.loading;

// actions
export const packageActions = packageSlice.actions;

// reducer
export default packageSlice.reducer;
