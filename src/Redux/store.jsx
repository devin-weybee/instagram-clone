import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userSlice";
import profileReducer from "./Reducers/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
