import { ContractType, VerifyContractType } from "@/models";
import { ContractStatus } from "@/models/enums/Status";
import { ContractRequest } from "@/models/Request/ContractRequest";

import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContractState {
  loading: boolean;
  contract: ContractType;
}

const initialState: ContractState = {
  loading: false,
  contract: {
    id: "",
    createdAt: "",
    updateAt: "",
    isActive: false,
    name: "",
    customerName: "",
    contractValue: 0,
    url: "",
    note: "",
    quotationId: "",
    projectId: "",
    status: ContractStatus.PROCESS,
    paymentBatches: [],
  },
};

export const contractSlice = createSlice({
  name: "contract",
  initialState: initialState,
  reducers: {
    fetchContract(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchContractSuccess(state, action: PayloadAction<ContractType>) {
      state.contract = action.payload;
      state.loading = false;
    },
    fetchContractFailed(state) {
      state.loading = false;
    },

    createContract(state, action: PayloadAction<ContractRequest>) {
      console.log("create contract: ", action.payload);
    },

    acceptContract(state, action: PayloadAction<string>) {
      console.log("approve contract: ", action.payload);
    },

    rejectContract(state, action: PayloadAction<string>) {
      console.log("reject contract", action.payload);
    },

    verifyContract(state, action: PayloadAction<VerifyContractType>) {
      console.log("verify contract", action.payload);
    },
  },
});

export const selectedContract = (state: RootState) => state.contract.contract;

export const selectedLoading = (state: RootState) => state.contract.loading;

export const contractActions = contractSlice.actions;

export default contractSlice.reducer;
