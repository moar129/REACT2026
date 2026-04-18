import { createSlice} from '@reduxjs/toolkit';
import type { IAnime } from '../../types/animeType';



const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        animeItems: [] as IAnime[],        
    },
    reducers:{
        addFavorite: (state, action) => {
            const exist = state.animeItems.find(anime => anime.mal_id === action.payload.mal_id);
            if (!exist) {
                state.animeItems.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.animeItems = state.animeItems.filter(anime => anime.mal_id !== action.payload);
        },
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;