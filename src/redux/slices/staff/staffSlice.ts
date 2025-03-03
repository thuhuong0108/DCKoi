import { StaffType } from "@/models";
import { RootState } from "./../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StaffState {
  loading: boolean;
  staffs: Pagination<StaffType>;
}

const initialState: StaffState = {
  loading: false,
  staffs: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};
export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    fetchStaff(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchStaffSuccess(state, action: PayloadAction<Pagination<StaffType>>) {
      state.staffs = action.payload;
      state.loading = false;
    },
    fetchStaffFaild(state) {
      state.loading = false;
    },

    createStaff(state, action: PayloadAction<StaffType>) {
      console.log("create staff: ", action.payload);
    },
    fetchConsutantStaff(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchConsutantStaffSuccess(
      state,
      action: PayloadAction<Pagination<StaffType>>
    ) {
      state.staffs = action.payload;
      state.loading = false;
    },
    fetchConsutantStaffFaild(state) {
      state.loading = false;
    },
  },
});

export const selectedStaff = (state: RootState) => state.staff.staffs;

export const selectedLoading = (state: RootState) => state.staff.loading;

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
