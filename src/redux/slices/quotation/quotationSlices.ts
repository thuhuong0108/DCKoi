import { QuotationType } from "@/models";
import { ApiResultWithAData } from "@/models/Common";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuotaitonState {
  loading: boolean;
  quotation: ApiResultWithAData<QuotationType>;
}

const initialState: QuotaitonState = {
  loading: false,
  quotation: {
    isSuccess: false,
    statusCode: 0,
    message: "",
    data: {} as QuotationType,
  },
};

export const quotationSlice = createSlice({
  name: "quotation",
  initialState: initialState,
  reducers: {
    fetchQuotation(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchQuotationSuccess(
      state,
      action: PayloadAction<ApiResultWithAData<QuotationType>>
    ) {
      state.quotation = action.payload;
      state.loading = false;
    },
    fetchQuotationFaild(state) {
      state.loading = false;
    },

    createQuotation(state, action: PayloadAction<QuotationType>) {
      console.log("create quotation: ", action.payload);
    },
  },
});

export const selectedQuotation = (state: RootState) =>
  state.quotation.quotation;

export const selectedLoading = (state: RootState) => state.quotation.loading;

export const quotationActions = quotationSlice.actions;

export default quotationSlice.reducer;
