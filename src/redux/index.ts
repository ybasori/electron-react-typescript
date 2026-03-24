import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import route from "./slice/route.slice";
import agenda from "./slice/agenda.slice";

/* Combine reducers */
const rootReducer = combineReducers({
  route,
  agenda
});

/* Persist config */
const persistConfig = {
  key: "root",
  storage,
};

/* Persisted reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the check entirely
    }),
});

/* Types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;