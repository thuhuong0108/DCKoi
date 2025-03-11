import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ContractProjectType } from "@/models";

export interface ContractProjectState {
  loading: boolean;
  contracts: Pagination<ContractProjectType>;
}

const initialState: ContractProjectState = {
  loading: false,
  contracts: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};
export const contractProjectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    fetchContractProject(
      state,
      action: PayloadAction<{ filter: Filter; id: string }>
    ) {
      state.loading = true;
    },
    fetchContractProjectSuccess(
      state,
      action: PayloadAction<Pagination<ContractProjectType>>
    ) {
      state.contracts = action.payload;
      state.loading = false;
    },
    fetchContractProjectFaild(state) {
      state.loading = false;
    },
  },
});

export const selectedContractProject = (state: RootState) =>
  state.contractProject.contracts;

export const selectedLoading = (state: RootState) =>
  state.contractProject.loading;

export const contractProjectActions = contractProjectSlice.actions;

export default contractProjectSlice.reducer;
