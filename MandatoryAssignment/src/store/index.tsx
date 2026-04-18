import { configureStore } from '@reduxjs/toolkit';
import { animeApi } from './apis/animeApi';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        [animeApi.reducerPath]: animeApi.reducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(animeApi.middleware),
});

// Typer til brug i hele appen
export type RootState = ReturnType<typeof store.getState>; // Type for hele state tree i appen
export type AppDispatch = typeof store.dispatch; // Type for dispatch funktionen, som bruges til at sende actions til store