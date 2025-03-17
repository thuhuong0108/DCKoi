import { TransactionType } from "@/models/TransactionType";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionState {
  loading: boolean;
  transaction: TransactionType;
}

const initialState: TransactionState = {
  loading: false,
  transaction: {
    note: "",
    status: "",
    amount: 0,
    createdAt: "",
    updatedAt: "",
    paymentBatch: {
      contract: {
        id: "",
        name: "",
        status: "",
        customerName: "",
        contractValue: 0,
        createdAt: "",
        updatedAt: "",
        project: {
          id: "",
          name: "",
          status: "",
        },
      },
      id: "",
      createdAt: "",
      paymentAt: "",
      isActive: false,
      name: "",
      totalValue: 0,
      isPaid: false,
      status: "",
    },
    customer: {
      id: "",
      fullName: "",
      email: "",
    },
  },
};

export const transactionsSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    fetchTransactionDetail(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchTransactionDetailSuccess(
      state,
      action: PayloadAction<TransactionType>
    ) {
      state.loading = false;
      state.transaction = action.payload;
    },
    fetchTransactionDetailFaild(state) {
      state.loading = false;
    },
  },
});

export const selectedTransaction = (state: RootState) =>
  state.transaction.transaction;
export const selectLoading = (state: RootState) => state.transaction.loading;

// actions
export const transactionActions = transactionsSlice.actions;

// reducer
export default transactionsSlice.reducer;
