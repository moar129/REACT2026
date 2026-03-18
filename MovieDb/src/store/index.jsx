import { configureStore } from '@reduxjs/toolkit'; // Import the configureStore function from Redux Toolkit to create the store
import { setupListeners } from '@reduxjs/toolkit/query'; // Import the setupListeners function from Redux Toolkit Query to enable features like refetchOnFocus and refetchOnReconnect
import { moviesApi } from './apis/moviesApi';
import { searchMovieReducer, changeSearchTerm } from './slices/searchMovieSlice';

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer, //dette er en mere sikker måde, ungår "typo's"
        searchMovie: searchMovieReducer // Reducer for handling search movie state, combined in the store setup
    },// Middelware består af default middelware plus det middelware der er nødvendig for at håndtere cache og andre funktioner i RTK Query. Det er vigtigt at inkludere dette middelware for at sikre, at API-forespørgsler fungerer korrekt og at datahåndtering sker som forventet.
    middleware: (getDefaultMiddleware) => {  //Thunk middelware er default når der benyttes Redux Toolkit configureStore.
        return getDefaultMiddleware()
            .concat(moviesApi.middleware); 
    }
});

setupListeners(store.dispatch);

export { useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery } from './apis/moviesApi';
export { changeSearchTerm }; // Export the action creator for changing the search term, which can be dispatched from components to update the search term in the state