import { Filter, Pagination } from "@/models/Common";
import { MaintainceStatus } from "@/models/enums/Status";
import { MaintaineceType } from "@/models/MaintenancesTpe";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MaintenancesState {
  maintenances: {
    loading: boolean;
    maintenances: Pagination<MaintaineceType>;
  };
}

const initialState: MaintenancesState = {
  maintenances: {
    loading: false,
    maintenances: {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  },
};

export const maintenancesSlice = createSlice({
  name: "maintenances",
  initialState: initialState,
  reducers: {
    fetchMaintenances(state, action: PayloadAction<{ filter: Filter }>) {
      state.maintenances.loading = true;
    },
    fetchMaintenancesSuccess(
      state,
      action: PayloadAction<Pagination<MaintaineceType>>
    ) {
      state.maintenances.loading = false;
      state.maintenances.maintenances = action.payload;
    },
    fetchMaintenancesFailed(state) {
      state.maintenances.loading = false;
    },
    fetchMaintenancesByStatus(
      state,
      action: PayloadAction<{ filter: Filter; status: MaintainceStatus }>
    ) {
      state.maintenances.loading = true;
    },
  },
});

// actions
export const maintainceActions = maintenancesSlice.actions;

// reducer
export default maintenancesSlice.reducer;
