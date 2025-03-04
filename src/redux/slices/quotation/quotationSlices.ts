import {
  ApproveQuotationType,
  QuotationType,
  RejectQuotationType,
} from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  Filter,
  Pagination,
} from "@/models/Common";
import { QuotationStatus } from "@/models/enums/Status";
import { QuotationRequest } from "@/models/Request/QuotationRequest";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuotaitonState {
  loading: boolean;
  quotation: Pagination<QuotationType>;
}

const initialState: QuotaitonState = {
  loading: false,
  quotation: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const quotationSlice = createSlice({
  name: "quotation",
  initialState: initialState,
  reducers: {
    fetchQuotation(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchQuotationSuccess(
      state,
      action: PayloadAction<Pagination<QuotationType>>
    ) {
      state.quotation = action.payload;
      state.loading = false;
    },
    fetchQuotationFailed(state) {
      state.loading = false;
    },

    // fetchQuotationDetail(
    //       state,
    //   action: PayloadAction<ApiResultWithAData<QuotationType>>
    // ) {
    //   state.quotation = action.payload;
    //   state.loading = false;
    // },

    //create
    createQuotation(state, action: PayloadAction<QuotationRequest>) {
      console.log("create quotation: ", action.payload);
    },

    //reject
    rejectQuotation(state, action: PayloadAction<RejectQuotationType>) {
      console.log("reject quotation: ", action.payload);
    },

    //approve
    approveQuotation(state, action: PayloadAction<ApproveQuotationType>) {
      console.log("approve quotation: ", action.payload);
    },

    //edit
    editQuotation(state, action: PayloadAction<QuotationRequest>) {
      console.log("edit quotation: ", action.payload);
    },

    //rewrite
    rewriteQuotation(state, action: PayloadAction<QuotationRequest>) {
      console.log("rewrite quotation: ", action.payload);
    },
  },
});

export const selectedQuotation = (state: RootState) =>
  state.quotation.quotation;

export const selectedLoading = (state: RootState) => state.quotation.loading;

export const quotationActions = quotationSlice.actions;

export default quotationSlice.reducer;
