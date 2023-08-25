import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import {
    clientSlice,
    productSlice,
    userSlice,
    vendorSlice,
} from "./CRUDSlices";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userSlice.reducer,
        product: productSlice.reducer,
        vendor: vendorSlice.reducer,
        client: clientSlice.reducer,
    },
});
export default store;
