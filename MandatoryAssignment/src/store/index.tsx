import { configureStore } from '@reduxjs/toolkit'; // Import the configureStore function from Redux Toolkit to create the store
import { setupListeners } from '@reduxjs/toolkit/query'; // Import the setupListeners function from Redux Toolkit Query to enable features like refetchOnFocus and refetchOnReconnect

export const store = configureStore({
    reducer: {}
}); // Create the Redux store using configureStore and export it for use in the application

setupListeners(store.dispatch); // Set up listeners for the store's dispatch function to enable features like refetchOnFocus and refetchOnReconnect

//export { useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery } from './apis/moviesApi';
//export { changeSearchTerm };