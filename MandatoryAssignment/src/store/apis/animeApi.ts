import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAnimeListResponse, IAnimeDetailResponse, IGenreListResponse } from '../../types/animeType';

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
        fetchSearchAnime: builder.query<IAnimeListResponse, { searchTerm: string; genreId: string }>({
            query: ({ searchTerm, genreId }) => ({
                url: 'anime',
                params: {
                    q: searchTerm || undefined,
                    genres: genreId || undefined,
                    limit: 20,
                    order_by: 'score',
                    sort: 'desc',
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
        // Fetch anime genres
        fetchAnimeGenres: builder.query<IGenreListResponse, void>({
            query: () => ({
                url: 'genres/anime',
                method: 'GET',
            }),
        }),
        // Fetch anime by genre ID
        fetchAnimeByGenre: builder.query<IAnimeListResponse, string>({
            query: (genreId) => ({
                url: 'anime',
                params: {
                    genres: genreId,
                    limit: 20,
                    order_by: 'score',
                    sort: 'desc',
                },
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchTopAnimeQuery,
    useFetchSearchAnimeQuery,
    useFetchAnimeByIdQuery,
    useFetchAnimeGenresQuery,
    useFetchAnimeByGenreQuery,
} = animeApi;