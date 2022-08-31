import {configureStore} from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import comicsReducer from './characterDetailSlice';
export const store = configureStore({

    reducer:{
        characters:characterReducer,
        comics:comicsReducer
    },

});