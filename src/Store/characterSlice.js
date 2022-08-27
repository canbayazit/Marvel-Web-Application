import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    characters: [], // array of characters
    queryResult: [], // array of results
    isLoading: true, // boolean to show loading spinner
    offset: 0, // offset for pagination
    query: "", // query for search
    total: 0, // total number of characters
  };

  const characterSlice = createSlice({
    name: "characters",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }

  });

export default characterSlice.reducer;