// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PackageItem } from "@/models/PackageItem";
import { Filter, Pagination } from "@/models/Common";

export interface PackageItemState {
  loading: boolean;
  packageItems: Pagination<PackageItem>;
}

const initialState: PackageItemState = {
  loading: false,
  packageItems: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const packageItemSlice = createSlice({
  name: "packageItem",
  initialState: initialState,
  reducers: {
    fetchPackageItems(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchPackageItemsSuccess(state, action: PayloadAction<Pagination<PackageItem>>) {
      state.packageItems = action.payload;
      state.loading = false;
    },
    fetchPackageItemsFailed(state) {
      state.loading = false;
    },
  },
});


// selectors
export const selectPackageItems = (state: RootState) => state.packageItem.packageItems;
export const selectLoading = (state: RootState) => state.packageItem.loading;

// actions
export const packageItemActions = packageItemSlice.actions;

// reducer
export default packageItemSlice.reducer;