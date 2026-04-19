import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAnimeListResponse, IAnimeDetailResponse } from '../../types/animeType';

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
    endpoints: (builder) => ({
        // Fetch top anime with optional filter (e.g., "tv", "movie", etc.)
        fetchTopAnime: builder.query<IAnimeListResponse, string>({
            query: (filter) => ({
                url: 'top/anime',
                params: {
                    type: filter || undefined,
                    limit: 20,
                },
                method: 'GET',
            }),
        }),
        // Fetch anime by search term
        fetchSearchAnime: builder.query<IAnimeListResponse, string>({
            query: (searchTerm) => ({
                url: 'anime',
                params: {
                    q: searchTerm,
                    limit: 20,
                },
                method: 'GET',
            }),
        }),
        // Fetch anime by ID
        fetchAnimeById: builder.query<IAnimeDetailResponse, number>({
            query: (id) => ({
                url: 'anime/' + id,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchTopAnimeQuery,
    useFetchSearchAnimeQuery,
    useFetchAnimeByIdQuery,
} = animeApi;