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

export interface QuotaitonDetailState {
  loading: boolean;
  quotationDetail: QuotationType;
}

const initialState: QuotaitonDetailState = {
  loading: false,
  quotationDetail: {
    id: "",
    projectId: "",
    templateConstructionId: "",
    version: 0,
    createdDate: "",
    updatedDate: "",
    status: QuotationStatus.OPEN,
    reason: "",
    services: [],
    equipments: [],
  },
};

export const quotationDetailSlice = createSlice({
  name: "quotationDetail",
  initialState: initialState,
  reducers: {
    fetchQuotationDetail(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchQuotationDetailSuccess(state, action: PayloadAction<QuotationType>) {
      state.quotationDetail = action.payload;
      state.loading = false;
    },
    fetchQuotationDetailFailed(state) {
      state.loading = false;
    },
  },
});

export const selectedQuotationDetail = (state: RootState) =>
  state.quotationDetail.quotationDetail;

export const selectedLoading = (state: RootState) =>
  state.quotationDetail.loading;

export const quotationDetailActions = quotationDetailSlice.actions;

export default quotationDetailSlice.reducer;
