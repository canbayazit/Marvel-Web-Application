import {configureStore} from '@reduxjs/toolkit';
import characerReducer from './characterSlice'

export const store = configureStore({

    reducer:{
        characters:characerReducer,
    },

});