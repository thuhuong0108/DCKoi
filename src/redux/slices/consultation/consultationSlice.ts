import { Filter, Pagination } from "@/models/Common";
import { RootState } from "../../store/store";
import { ConsultationStaff, ConsultationType } from "@/models/Consultation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConsultationState {
    loading: boolean,
    consultations: Pagination<ConsultationType>
}

const initialState: ConsultationState = {
    loading: false,
    consultations: {
        pageNumber: 1,
        pageSize: 10,
        totalPages: 0,
        totalRecords: 0,
        data: [],
    },
};

export const consultationSlice = createSlice({
    name: "consultation",
    initialState: initialState,
    reducers: {
        fetchConsultation(state, action: PayloadAction<Filter>) {
            state.loading = true;
        },
        fetchConsultationSuccess(state, action: PayloadAction<Pagination<ConsultationType>>) {
            state.consultations = action.payload;
            state.loading = false;
        },
        fetchConsultationFailed(state) {
            state.loading = false;
        },

        //assign consultant
        assignConsultant(state, action: PayloadAction<{ projectId: string; staff: ConsultationStaff }>) {
            state.loading = true;
        },
    }
});

// selectors
export const selectConsultation = (state: RootState) => state.consultation.consultations;
export const selectLoading = (state: RootState) => state.consultation.loading;

// actions
export const consultationActions = consultationSlice.actions;

// reducer
export default consultationSlice.reducer;