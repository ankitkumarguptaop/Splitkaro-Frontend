import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/auth.slice";
import groupReducer from "../features/group/group.slice";
import userReducer from "../features/user/user.slice";
import expenseReducer from "../features/expense/expense.slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistAuthUserConfig = {
  key: "current-user",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistAuthUserConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    group: groupReducer,
    user: userReducer,
    expense: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
