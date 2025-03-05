import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ProjectDesignType } from "@/models";

export interface CustomerDesignState {
    loading: boolean;
    customerDesigns: Pagination<ProjectDesignType>;
}

const initialState: CustomerDesignState = {
    loading: false,
    customerDesigns: {
        data: [],
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalRecords: 0,
    }
}

export const customerDesignSlice = createSlice({
    name: "customerDesign",
    initialState: initialState,
    reducers: {
        fetchCustomerDesign(state, action: PayloadAction<{ id: string; filter: Filter }>) {
            state.loading = true
        },
        fetchCustomerDesignSuccess(state, action: PayloadAction<Pagination<ProjectDesignType>>) {
            state.loading = false;
            state.customerDesigns = action.payload;
        },
        fetchCustomerDesignFailed(state) {
            state.loading = false;
        },
    }
});

// selectors
export const selectCustomerDesign = (state: RootState) => state.customerDesign.customerDesigns;
export const selectCustomerDesignLoading = (state: RootState) => state.customerDesign.loading;

// actions
export const customerDesignActions = customerDesignSlice.actions;

// reducer
export default customerDesignSlice.reducer;
