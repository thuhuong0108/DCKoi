import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PackageMaintainType } from "@/models/PackageType";
import { Filter, Pagination } from "@/models/Common";

export interface PackageMaintainceState {
  loading: boolean;
  packageMaintainItems: Pagination<PackageMaintainType>;
}

const initialState: PackageMaintainceState = {
  loading: false,
  packageMaintainItems: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  },
};

export const packageMaintainceSlice = createSlice({
  name: "packageMaintaince",
  initialState: initialState,
  reducers: {
    getPackageMaintaince(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    getPackageMaintainceSuccess(
      state,
      action: PayloadAction<Pagination<PackageMaintainType>>
    ) {
      state.loading = false;
      state.packageMaintainItems = action.payload;
    },
    getPackageMaintainceFailed(state) {
      state.loading = false;
    },
  },
});

// actions
export const packageMaintainceActions = packageMaintainceSlice.actions;

// reducer
export default packageMaintainceSlice.reducer;
