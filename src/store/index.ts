import { configureStore } from '@reduxjs/toolkit';
import { frontendApi } from './api/frontendApi';
import galleryReducer from './slices/gallerySlice';
import supportReducer from './slices/supportSlice';

export const store = configureStore({
    reducer: {
        [frontendApi.reducerPath]: frontendApi.reducer,
        gallery: galleryReducer,
        support: supportReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(frontendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
