import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  character: {},
  comics: [],
  status: "idle",
};

export const getComics = createAsyncThunk("comics/getComics", async (id) => {


  const result = await axios(
    `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=10&apikey=437d4802af06645527d3a4e4e56da6f2`
  );

  return result.data.data.results;
});

const comicsSlice = createSlice({
  name: "comics",
  initialState: initialState,
  reducers: {
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
  },
  extraReducers: {
    [getComics.pending]: (state, action) => {
      // veri ekrana gelene kadar yapılması gerekenler
      state.status = "loading";
     
    },
    [getComics.fulfilled]: (state, action) => {
      // veri ekrana geldikten sonra yapılması gerekenler
      state.comics = action.payload;
      state.status = "succeed";
    },
    [getComics.rejected]: (state, action) => {
      // veri ekrana gelmesi başarısız olduysa yapılması gerekenler
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setCharacter } = comicsSlice.actions;
export default comicsSlice.reducer;
