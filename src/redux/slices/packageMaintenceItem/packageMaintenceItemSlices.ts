// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { PackageItemType } from "@/models";

export interface PackageItemState {
  loading: boolean;
  packageItems: Pagination<PackageItemType>;
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
  name: "packageMaintenceItem",
  initialState: initialState,
  reducers: {
    fetchPackageItems(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchPackageItemsSuccess(
      state,
      action: PayloadAction<Pagination<PackageItemType>>
    ) {
      state.packageItems = action.payload;
      state.loading = false;
    },
    fetchPackageItemsFailed(state) {
      state.loading = false;
    },

    //create
    createPackageItem(state, action: PayloadAction<PackageItemType>) {},

    //update
    updatePackageItem(state, action: PayloadAction<PackageItemType>) {
      console.log("updatePackageItem", action.payload);
    },

    //delete
    deletePackageItem(state, action: PayloadAction<string>) {
      console.log("deletePackageItem", action.payload);
    },
  },
});

// actions
export const packageMaintenceItemActions = packageItemSlice.actions;

// reducer
export default packageItemSlice.reducer;
