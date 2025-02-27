import { StaffType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface ConsultantAvailableState {
    loading: boolean,
    consultantAvailables: Pagination<StaffType>
}

const initialState: ConsultantAvailableState = {
    loading: false,
    consultantAvailables: {
        pageNumber: 1,
        pageSize: 10,
        totalPages: 0,
        totalRecords: 0,
        data: [],
    },
};

export const consultantAvailableSlice = createSlice({
    name: "consultantAvailable",
    initialState: initialState,
    reducers: {
        fetchConsultantAvailable(state, action: PayloadAction<Filter>) {
            state.loading = true;
        },
        fetchConsultantAvailableSuccess(state, action: PayloadAction<Pagination<StaffType>>) {
            state.consultantAvailables = action.payload;
            state.loading = false;
        },
        fetchConsultantAvailableFailed(state) {
            state.loading = false;
        },
    }
});

// selectors
export const selectConsultantAvailable = (state: RootState) => state.consultantAvailable.consultantAvailables;
export const selectLoading = (state: RootState) => state.consultantAvailable.loading;

// actions
export const consultantAvailableActions = consultantAvailableSlice.actions;

// reducer
export default consultantAvailableSlice.reducer;