import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { DesignDetailType, DesignRequest, DesignType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { acceptDesign, rejectDesign } from "@/api/design";

export interface ImageDesignState {
  loading: boolean;
  image: DesignDetailType;
}

const initialState: ImageDesignState = {
  loading: false,
  image: {
    id: "",
    createdAt: "",
    updatedAt: "",
    isActive: false,
    version: 0,
    reason: "",
    status: "",
    isPublic: false,
    type: "",
    customerName: "",
    projectId: "",
    staffId: "",
    designImages: [],
  },
};

export const imageDesignSlice = createSlice({
  name: "imageDesign",
  initialState: initialState,
  reducers: {
    fetchImageDesign(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchImageDesignSuccess(state, action: PayloadAction<DesignDetailType>) {
      state.image = action.payload;
      state.loading = false;
    },
    fetchImageDesignFailed(state) {
      state.loading = false;
    },
    postImageDesign(state, action: PayloadAction<DesignRequest>) {
      state.loading = true;
    },
    acceptDesign(
      state,
      action: PayloadAction<{ id: string; idProject: string }>
    ) {
      state.loading = true;
    },
    rejectDesign(
      state,
      action: PayloadAction<{ id: string; reason: string; idProject: string }>
    ) {
      state.loading = true;
    },
  },
});

// selectors
export const selectImageDesign = (state: RootState) => state.designImage.image;
export const selectImageDesignLoading = (state: RootState) =>
  state.designImage.loading;

// actions
export const imageDesignActions = imageDesignSlice.actions;

export default imageDesignSlice.reducer;
