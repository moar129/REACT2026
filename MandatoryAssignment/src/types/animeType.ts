export interface IAnimeImage {
    jpg: {
        image_url: string;
        large_image_url: string;
    };
}

export interface IGenre {
    mal_id: number;
    name: string;
}

export interface IAnime {
    mal_id: number;
    title: string;
    synopsis: string;
    score: number;
    episodes: number;
    status: string;
    images: IAnimeImage;
    genres: IGenre[];
    rank: number;
    members: number;
}

export interface IAnimeListResponse {
    data: IAnime[];
}

export interface IAnimeDetailResponse {
    data: IAnime;
}

export interface IGenreListResponse {
    data: IGenre[];
}