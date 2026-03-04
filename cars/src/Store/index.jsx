import { configureStore } from "@reduxjs/toolkit";
import { carsReducer, addCar, removeCar, changeSearchTerm} from './Slices/carsSlice';
import { formReducer, changeName, changeCost } from "./Slices/formSlice";

// configureStore er en funktion der kommer fra redux toolkit, som gør det nemt at oprette en Redux store. 
// Den tager et objekt som argument, hvor man kan specificere reducerne for forskellige dele af state. 
// I dette tilfælde har vi to reducer: carsReducer og formReducer, som håndterer henholdsvis bilrelateret state og formrelateret state. 
// Ved at kombinere disse reducer i configureStore, opretter vi en samlet Redux store, 
// som kan bruges i hele applikationen til at håndtere state management.

const store = configureStore({
    reducer: {
        cars: carsReducer,
        form: formReducer
    }
})


//Bemærk ved at eksportere alle reducerne samlet behøver man ikke importere alle slices men blot den samlede store hvor den skal benyttes
export { store, changeName, changeCost, addCar, removeCar, changeSearchTerm };