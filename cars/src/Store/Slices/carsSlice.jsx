import {createSlice, nanoid} from '@reduxjs/toolkit';
const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        searchTerm: '',
        data: [],
    },
    reducers:{ // bruges til at opdatere state, og de genererer også action creators
        changeSearchTerm(state, action){ // opdaterer searchTerm i state baseret på payload fra action
            state.searchTerm = action.payload;
        },
        //Assumption: action.payload === {name: 'xx', cost: yy}
        addCar(state, action){
            state.data.push({
                name: action.payload.name,
                cost: action.payload.cost,
                id : nanoid() // nanoid er en funktion der genererer unikke id'er, som kan bruges til at identificere hver bil i data-arrayet.
            });
        },
        //Assumption: action.payload === id of the car to be removed
        removeCar(state, action){
            state.data = state.data.filter((car) => {return car.id !== action.payload})
        }
    }
})
export const {changeSearchTerm, addCar, removeCar} = carsSlice.actions; //"mini-reducer-functions" - action creators, som kan dispatches for at opdatere state i carsSlice.
export const carsReducer = carsSlice.reducer;  //combined reducers - dette er den reducer funktion der skal bruges i configureStore for at håndtere state management for carsSlice.