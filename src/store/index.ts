import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { frontendApi } from './api/frontendApi';
import galleryReducer from './slices/gallerySlice';
import supportReducer from './slices/supportSlice';
import { 
    persistStore, 
    persistReducer, 
    FLUSH, 
    REHYDRATE, 
    PAUSE, 
    PERSIST, 
    PURGE, 
    REGISTER, 
    createTransform 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Transform filter for RTK Query state
const apiTransform = createTransform(
    // transform state on its way to being serialized and stored.
    (inboundState: any, key) => {
        if (key === frontendApi.reducerPath && inboundState.queries) {
            // Keep only the results of getCategories and getHomeContent
            const filteredQueries = Object.keys(inboundState.queries).reduce((acc: any, queryKey) => {
                if (queryKey.startsWith('getCategories') || queryKey.startsWith('getHomeContent')) {
                    acc[queryKey] = inboundState.queries[queryKey];
                }
                return acc;
            }, {});
            
            return {
                ...inboundState,
                queries: filteredQueries,
            };
        }
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => outboundState,
    { whitelist: [frontendApi.reducerPath] }
);

const rootReducer = combineReducers({
    [frontendApi.reducerPath]: frontendApi.reducer,
    gallery: galleryReducer,
    support: supportReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [frontendApi.reducerPath],
    transforms: [apiTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = configureStore({
    reducer: persistedReducer as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(frontendApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
