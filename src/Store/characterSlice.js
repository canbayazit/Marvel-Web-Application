import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { limit } from "../Constant/constants";

//global state
const initialState = {
    characterList: [], // array of characters
    queryResult: [], // array of results
    isLoading: true, // boolean to show loading spinner    
    query: "", // query for search
    offset: 0, 
    status: "idle",
    scrollLoad: false,
  };

  export const getCharacters = createAsyncThunk (
    'characters/getCharacters', async(obj,thunkAPI)=>{
    const {offset,query}=obj;
        const characterURL = `https://gateway.marvel.com:443/v1/public/characters?limit=30&offset=${offset}&apikey=437d4802af06645527d3a4e4e56da6f2`;
        const searchURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=437d4802af06645527d3a4e4e56da6f2`;
      console.log("thunk query",query,offset)
      console.log(searchURL)
  
        const result = await axios(thunkAPI.getState().characters.query==="" ? characterURL : searchURL);
        return result.data.data.results;
     
       
    }
  );


  const characterSlice = createSlice({
    name: "characters",
    initialState:initialState,
    reducers:{
      loadMore : (state,action) => {
        state.offset += 30;
    },  
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    reset: (state) => {
      // Reset values ​​to initial value
      state.characterList = [];
      state.queryResult = [];
      state.offset = 0;
    },
    },
    extraReducers: {
      [getCharacters.pending] : (state,action) => {  // veri ekrana gelene kadar yapılması gerekenler
        state.status = "loading";
    },
      [getCharacters.fulfilled] : (state,action) => {  // veri ekrana geldikten sonra yapılması gerekenler
        if (state.query !== "") {
          state.queryResult = [...state.queryResult, ...action.payload];
          state.characterList = state.queryResult;
          state.status = "succeed";
          console.log("query varken",state.characterList,state.queryResult )
        } else {
          state.characterList = [...state.characterList, ...action.payload];

          state.status = "succeed";
        }
      
        // if (state.query !== "") {
        //   state.queryResult = [...state.queryResult, ...action.payload];
        //   state.characterList = state.queryResult;          
        // }else{
        //   state.characterList =[...state.characterList,...action.payload];
        //   
        //   state.page += 1; // veri geldiğinde page 1 yapıyoruz ve bunu scrollbar en aşağı aşağı indiğinde 
        //   // yeni page verisini home sayfasında getCharacters thunk'ına dispatch ediyoruz
        //   state.scrollLoad = false;
  
        //   if(action.payload.length <30){
        //       state.hasNextPage = false;
        //   }
        // }
    },
    [getCharacters.rejected] : (state,action) => { // veri ekrana gelmesi başarısız olduysa yapılması gerekenler
      state.status="failed";
      state.error = action.error.message;
  }

  }
  });



  export const {loadMore,setQuery,reset} = characterSlice.actions;
export default characterSlice.reducer;