import { ConstructionItem, TemplateConstructionItemType } from "@/models";
import { RootState } from "@/redux/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConstructionProjectState {
  loading: boolean;
  itemConstruction: TemplateConstructionItemType[];
}

const initialState: ConstructionProjectState = {
  loading: false,
  itemConstruction: [],
};

const constructionProjectSlice = createSlice({
  name: "constructionProject",
  initialState: initialState,
  reducers: {
    fetchConstructionProject(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchConstructionProjectSuccess(
      state,
      action: PayloadAction<TemplateConstructionItemType[]>
    ) {
      state.itemConstruction = action.payload;
      state.loading = false;
    },
    fetchConstructionProjectFailed(state) {
      state.loading = false;
    },
  },
});

export const constructionProjectActions = constructionProjectSlice.actions;

export default constructionProjectSlice.reducer;
