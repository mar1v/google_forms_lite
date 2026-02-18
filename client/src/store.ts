import { configureStore } from "@reduxjs/toolkit";
import { graphqlApi } from "./api/graphqlApi";
import formBuilderReducer from "./features/formBuilderSlice";

export const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    formBuilder: formBuilderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
