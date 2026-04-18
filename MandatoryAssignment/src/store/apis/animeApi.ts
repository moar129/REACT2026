import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAnimeListResponse, IAnimeDetailResponse } from '../../types/animeType';

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
    endpoints: (builder) => ({
        // Fetch top anime
        fetchTopAnime: builder.query<IAnimeListResponse, void>({
            query: () => 'top/anime?limit=20',
        }),
        // Fetch anime by search term
        fetchSearchAnime: builder.query<IAnimeListResponse, string>({
            query: (searchTerm) => `anime?q=${searchTerm}&limit=20`,
        }),
        // Fetch anime by ID
        fetchAnimeById: builder.query<IAnimeDetailResponse, number>({
            query: (id) => `anime/${id}`,
        }),

    }),
});

export const {
    useFetchTopAnimeQuery,
    useFetchSearchAnimeQuery,
    useFetchAnimeByIdQuery,
} = animeApi;