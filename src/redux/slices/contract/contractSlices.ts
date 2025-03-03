import { createSlice } from "@reduxjs/toolkit";

export interface ContractState {
    loading: boolean;
}

const initalState: ContractState = {
    loading: false,
}

export const contractSlice = createSlice({
    name: "contract",
    initialState: initalState,
    reducers: {
        createContract(state) {
            console.log("create contract");
        },

        acceptContract(state) {
            state.loading = false;
        },

        rejectContract(state) {
            state.loading = false;
        },
    },
});



export const contractActions = contractSlice.actions;

export default contractSlice.reducer;
    