import { configureStore } from "@reduxjs/toolkit";
import app_slice from "../features/app_slice";

export const store = configureStore({
    reducer: {
        app_slice: app_slice,
    },
});
