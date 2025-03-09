import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { DesignRequest, DesignType } from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { ImageDesignResponse } from "@/models/Response/ImageDesignResponse";

export interface ImageDesignState {
  loading: boolean;
  image: ImageDesignResponse[];
}

const initialState: ImageDesignState = {
  loading: false,
  image: [],
};

export const imageDesignSlice = createSlice({
  name: "imageDesign",
  initialState: initialState,
  reducers: {
    fetchImageDesign(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchImageDesignSuccess(
      state,
      action: PayloadAction<ImageDesignResponse[]>
    ) {
      state.image = action.payload;
      state.loading = false;
    },
    fetchImageDesignFailed(state) {
      state.loading = false;
    },
    postImageDesign(state, action: PayloadAction<DesignRequest>) {
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
