// slice of state auth
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Filter, Pagination } from "@/models/Common";
import { EquipmentType } from "@/models";

export interface EquipmentState {
  loading: boolean;
  equipments: Pagination<EquipmentType>;
}

const initialState: EquipmentState = {
  loading: false,
  equipments: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  },
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState: initialState,
  reducers: {
    fetchEquipment(state, action: PayloadAction<Filter>) {
      state.loading = true;
    },
    fetchEquipmentSuccess(
      state,
      action: PayloadAction<Pagination<EquipmentType>>
    ) {
      state.equipments = action.payload;
      state.loading = false;
    },
    fetchEquipmentFailed(state) {
      state.loading = false;
    },

    //create
    createEquipment(state, action: PayloadAction<EquipmentType>) {},

    //update
    updateEquipment(state, action: PayloadAction<EquipmentType>) {
      console.log("update Equipment", action.payload);
    },

    //delete
    deleteEquipment(state, action: PayloadAction<string>) {
      console.log("deleteE quipment", action.payload);
    },
  },
});

// selectors
export const selectEquipment = (state: RootState) => state.equipment.equipments;
export const selectLoading = (state: RootState) => state.equipment.loading;

// actions
export const equipmentActions = equipmentSlice.actions;

// reducer
export default equipmentSlice.reducer;
