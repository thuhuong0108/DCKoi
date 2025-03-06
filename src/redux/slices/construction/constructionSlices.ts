import { ConstructionType } from "@/models";
import { ConstructionRequest } from "@/models/Request/ConstructionRequest";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConstructionState {
  loading: boolean;
  construction: ConstructionType;
}

const initialState: ConstructionState = {
  loading: false,
  construction: {
    id: "",
    projectId: "",
    items: [],
  },
};

export const constructionSlice = createSlice({
  name: "construction",
  initialState: initialState,
  reducers: {
    fetchConstruction(state) {
      state.loading = true;
    },
    fetchConstructionSuccess(state, action: PayloadAction<ConstructionType>) {
      state.construction = action.payload;
      state.loading = false;
    },
    fetchConstructionFailed(state) {
      state.loading = false;
    },

    createConstruction(state, action: PayloadAction<ConstructionRequest>) {
      console.log("create construction: ", action.payload);
    },
  },
});

// selectors
export const selecConstruction = (state: RootState) =>
  state.construction.construction;
export const selecConstructionLoading = (state: RootState) =>
  state.construction.loading;

// actions
export const constructionActions = constructionSlice.actions;

export default constructionSlice.reducer;
