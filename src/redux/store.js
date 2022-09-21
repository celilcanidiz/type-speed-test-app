import { configureStore } from "@reduxjs/toolkit";
import TypeSlice from "./TypeSlice/TypeSlice";

export const store = configureStore({
  reducer: {
    typing: TypeSlice,
  },
});