import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { DesignRequest, DesignType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { postDesign } from "@/api/design";

export interface DesignState {
  loading: boolean;
  design: Pagination<DesignType>;
}

const initialState: DesignState = {
  loading: false,
  design: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const designSlice = createSlice({
  name: "design",
  initialState: initialState,
  reducers: {
    fetchDesign(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchDesignSuccess(state, action: PayloadAction<Pagination<DesignType>>) {
      state.design = action.payload;
      state.loading = false;
    },
    fetchDesignFailed(state) {
      state.loading = false;
    },
    postDesign(state, action: PayloadAction<DesignRequest>) {
      state.loading = true;
    },
    updateDesign(state, action: PayloadAction<DesignRequest & { id: string }>) {
      state.loading = true;
    },
  },
});

// selectors
export const selectDesign = (state: RootState) => state.design.design;
export const selectDesignLoading = (state: RootState) => state.design.loading;

// actions
export const designActions = designSlice.actions;

export default designSlice.reducer;
