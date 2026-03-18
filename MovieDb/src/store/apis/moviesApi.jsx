import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const moviesApi = createApi({
    reducerPath: 'movies', // Unique key for the reducer
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.themoviedb.org/3/' // Base URL for The Movie Database API
    }),
    // Define the endpoints for the API service and how to fetch data for each endpoint using a builder callback function that receives an object with methods for defining endpoints
    endpoints(builder) {
        return {
            fetchPopularMovies: builder.query({
                query: () => {
                    return {
                        url: 'discover/movie', // Endpoint for discovering movies
                        params: {
                            sort_by: 'popularity.desc', // Sort movies by popularity in descending order
                            api_key: '4d4241946f068e497b0ff55f9b6dca05' // API key for authentication
                        },
                        method: 'GET', // HTTP method for the request
                    };
                },
            }),

            fetchHighestRatedMovies: builder.query({
                query: () => {
                    return {
                        url: 'discover/movie',
                        params: {
                            sort_by: 'vote_average.desc',
                            api_key: '4d4241946f068e497b0ff55f9b6dca05'
                        },
                        method: 'GET',
                    };
                },
            }),

            fetchSearchMovie: builder.query({
                query: (searchTerm) => {
                    return {
                        url: 'search/movie',
                        params: {
                            query: searchTerm,
                            api_key: '4d4241946f068e497b0ff55f9b6dca05'
                        },
                        method: 'GET',
                    };
                },
            })
        };
    },
});

export const { useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery } = moviesApi; // Export the auto-generated hooks for the endpoints defined in the API service, which can be used in functional components to trigger data fetching and access the results
export { moviesApi }; // Export the API service to be included in the store setup