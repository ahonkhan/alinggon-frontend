import { configureStore } from '@reduxjs/toolkit';
import { frontendApi } from './api/frontendApi';
import galleryReducer from './slices/gallerySlice';

export const store = configureStore({
    reducer: {
        [frontendApi.reducerPath]: frontendApi.reducer,
        gallery: galleryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(frontendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
