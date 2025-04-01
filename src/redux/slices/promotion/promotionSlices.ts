import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PromotionType } from "@/models/PromotionType";
import { Filter, Pagination } from "@/models/Common";
import { updatePromotion } from "@/api/promotion";

export interface PromotionState {
  loading: boolean;
  promotions: Pagination<PromotionType>;
}

const initialState: PromotionState = {
  loading: false,
  promotions: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: initialState,
  reducers: {
    fetchPromotion(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchPromotionSuccess(
      state,
      action: PayloadAction<Pagination<PromotionType>>
    ) {
      state.promotions = action.payload;
      state.loading = false;
    },
    fetchPromotionFailed(state) {
      state.loading = false;
    },
    createPromotion(state, action: PayloadAction<PromotionType>) {
      state.loading = true;
    },
    updatePromotion(state, action: PayloadAction<PromotionType>) {
      state.loading = true;
    },
    deletePromotion(state, action: PayloadAction<string>) {
      state.loading = true;
    },
  },
});

// actions
export const promotionActions = promotionSlice.actions;

// reducer
export default promotionSlice.reducer;
