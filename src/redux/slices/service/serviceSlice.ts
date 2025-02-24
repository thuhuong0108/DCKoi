import { RootState } from "./../../store/store";
import { ServiceType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ServiceState {
  loading: boolean;
  services: Pagination<ServiceType>;
}

const initialState: ServiceState = {
  loading: false,
  services: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};
export const serviceSlice = createSlice({
  name: "service",
  initialState: initialState,
  reducers: {
    fetchService(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchServiceSuccess(state, action: PayloadAction<Pagination<ServiceType>>) {
      state.services = action.payload;
      state.loading = false;
    },
    fetchServiceFaild(state) {
      state.loading = false;
    },

    createService(state, action: PayloadAction<ServiceType>) {
      console.log("create service: ", action.payload);
    },

    updateService(state, action: PayloadAction<ServiceType>) {
      console.log("update service: ", action.payload);
    },

    deleteService(state, action: PayloadAction<string>) {
      console.log("delete service: ", action.payload);
    },
  },
});

export const selectedService = (state: RootState) => state.service.services;

export const selectedLoading = (state: RootState) => state.service.loading;

export const serviceActions = serviceSlice.actions;

export default serviceSlice.reducer;
