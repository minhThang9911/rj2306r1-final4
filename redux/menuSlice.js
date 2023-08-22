import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggle } = menuSlice.actions;

export default menuSlice.reducer;
