import { DesignType, ReasonDesignType } from "@/models/DesignType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface DesignDetailState {
    loading: boolean;
    designDetail: DesignType;
}

const initialState: DesignDetailState = {
    loading: false,
    designDetail: {
        id: "",
        isActive: false,
        version: 0,
        reason: "",
        status: "",
        isPublic: false,
        type: "",
        customerName: "",
        projectId: "",
        staffId: "",
        designImages: [
            {
                id: "",
                imageUrl: "",
            }
        ]
    }
}

export const designDetailSlice = createSlice({
    name: "designDetail",
    initialState: initialState,
    reducers: {
        fetchDesignDetail(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        fetchDesignDetailSuccess(state, action: PayloadAction<DesignType>) {
            state.loading = false;
            state.designDetail = action.payload;
        },
        fetchDesignDetailFailed(state) {
            state.loading = false;
        },

        //reject
        rejectDesign(state, action: PayloadAction<ReasonDesignType>) {
            console.log("reject quotation ", action.payload);
        },

        //accept
        acceptDesign(state, action: PayloadAction<string>) {
            console.log("accept quotation");
        },

        //request edit
        requestEditDesign(state, action: PayloadAction<ReasonDesignType>) {
            console.log("request edit quotation ", action.payload);
        },
    }
});

export const selectedDesignDetail = (state: RootState) =>
    state.designDetail.designDetail;

export const selectedLoading = (state: RootState) =>
    state.designDetail.loading;

export const designDetailActions = designDetailSlice.actions;

export default designDetailSlice.reducer;