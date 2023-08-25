import { createSlice } from "@reduxjs/toolkit";
import { sitebarMenus } from "~/config";

const initialState = {
    isOpen: false,
    menuList: [],
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },
        getList: (state, action) => {
            state.menuList = sitebarMenus.filter(
                (item) => item.pemision === action.payload
            );
        },
    },
});

export const { toggle, getList } = menuSlice.actions;
export const selectList = (state) => state.menuList;
export const selectMenuState = (state) => state.isOpen;

export default menuSlice.reducer;
