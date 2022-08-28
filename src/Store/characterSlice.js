import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { limit } from "../Constant/constants";

//global state
const initialState = {
    characterList: [], // array of characters
    queryResult: [], // array of results
    isLoading: true, // boolean to show loading spinner
    offset: 0, // offset for pagination
    query: "", // query for search
    page : 0,
    status: "idle",
    scrollLoad: false,
  };

  export const getCharacters = createAsyncThunk (
    'characters/getCharacters', async(page)=>{
      const res = await axios(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${page*limit}&apikey=437d4802af06645527d3a4e4e56da6f2`);
      return res.data.data.results;
    }
  );


  const characterSlice = createSlice({
    name: "characters",
    initialState:initialState,
    reducers:{
      loadMore : (state,action) => {
        state.scrollLoad = true;
    }

    },
    extraReducers: {
      [getCharacters.pending] : (state,action) => {  // veri ekrana gelene kadar yapılması gerekenler
        state.status = "loading";
    },
      [getCharacters.fulfilled] : (state,action) => {  // veri ekrana geldikten sonra yapılması gerekenler
        state.characterList =[...state.characterList,...action.payload];
        state.status = "succeed";
        state.page += 1; // veri geldiğinde page 1 yapıyoruz ve bunu scrollbar en aşağı aşağı indiğinde 
        // yeni page verisini home sayfasında getCharacters thunk'ına dispatch ediyoruz
        state.scrollLoad = false;

        if(action.payload.length <30){
            state.hasNextPage = false;
        }
    },
    [getCharacters.rejected] : (state,action) => { // veri ekrana gelmesi başarısız olduysa yapılması gerekenler
      state.status="failed";
      state.error = action.error.message;
  }

  }
  });



  export const {loadMore} = characterSlice.actions;
export default characterSlice.reducer;