import { createSlice} from '@reduxjs/toolkit';
import type { IAnime } from '../../types/animeType';



const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        animeItem: [] as IAnime[],        
    },
    reducers:{
        addFavorite: (state, action) => {
            const exist = state.animeItem.find(anime => anime.mal_id === action.payload.mal_id);
            if (!exist) {
                state.animeItem.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.animeItem = state.animeItem.filter(anime => anime.mal_id !== action.payload);
        },
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;