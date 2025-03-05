import { ProjectType } from "@/models";
import { ProjectStatus } from "@/models/enums/Status";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignDetailState {
    loading: boolean;
    designDetail: ProjectType;
}

const initialState: DesignDetailState = {
    loading: false,
    designDetail: {
        id: "",
        customerName: "",
        address: "",
        phone: "",
        email: "",
        area: 0,
        depth: 0,
        packageName: "",
        standOut: false,
        note: "",
        status: ProjectStatus.PROCESSING,
        createdDate: "",
        updatedDate: "",
        imageUrl: "",
        name: "",
    }
}

export const designDetailSlice = createSlice({
    name: "designDetail",
    initialState: initialState,
    reducers: {
        fetchDesignDetail(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        fetchDesignDetailSuccess(state, action: PayloadAction<ProjectType>) {
            state.loading = false;
            state.designDetail = action.payload;
        },
        fetchDesignDetailFailed(state) {
            state.loading = false;
        },
    }
});

export const selectedDesignDetail = (state: RootState) =>
  state.designDetail.designDetail;

export const selectedLoading = (state: RootState) =>
  state.designDetail.loading;

export const designDetailActions = designDetailSlice.actions;

export default designDetailSlice.reducer;