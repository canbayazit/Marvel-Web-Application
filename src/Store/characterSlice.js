import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { limit } from "../Constant/constants";

//global state
const initialState = {
    characterList: [], // başta ilk 30 karakterimizin tutulduğu array limiti arttırırsak daha fazla karakterde tutabiliriz
    queryResult: [], // search bar kısmına yazılana göre filtreleyip ekrana gelen karakterlerimizin tutulduğu array
    query: "", // search bar kısmına yazdıklarımız query propertysine setlenir
    offset: 0, // apidan gelen verimizin limitini 30 yaptık offset 1 dersek 31. veriyi bize çeker 
    //31. veriden önceki verileri skipler
    status: "idle",  //loading ekranı için gerekli status property'si
    allCharacters:0,  // api içerisinde mevcut olan bütün marvel karakterlerinin sayısını tutan property
    //başlangıçta sıfır tanımladık.
  };

  export const getCharacters = createAsyncThunk (
    'characters/getCharacters', async(obj,thunkAPI)=>{  // 2 argüman alır 1. değişken veya değişkenlerden oluşan object 2. thunkAPI
    const {offset,query}=obj;
        const characterURL = `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&apikey=437d4802af06645527d3a4e4e56da6f2`;
        const searchURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=437d4802af06645527d3a4e4e56da6f2`;
      console.log("thunk query",query,offset)
      console.log(searchURL)
  
        const result = await axios(thunkAPI.getState().characters.query==="" ? characterURL : searchURL);
        
        return result.data.data; // karakterlerimizin tutulduğu array results propertysinin içinde 
        // bizde ondan önceki kısmı çekiyoruz sebebi total propertysine ulaşmak
        // çünkü total property si toplam karakter sayısını tutuyor onuda kodumuzda kullanacaz.
     
       // thunkAPI
    }
  );


  const characterSlice = createSlice({
    name: "characters",
    initialState:initialState,
    reducers:{
      loadMore : (state) => {
        state.offset += 30;
    },  
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    reset: (state) => {    
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
        state.allCharacters=action.payload.total
        console.log("data",action.payload.total, state.total)

        if (state.query !== "") {
          state.queryResult = [...state.queryResult, ...action.payload.results];
          state.characterList = state.queryResult;
          state.status = "succeed";
          console.log("query varken",state.characterList,state.queryResult )
        } else {
          state.characterList = [...state.characterList, ...action.payload.results];

          state.status = "succeed";
        }
      
    },
    [getCharacters.rejected] : (state,action) => { // veri ekrana gelmesi başarısız olduysa yapılması gerekenler
      state.status="failed";
      state.error = action.error.message;
  }

  }
  });



export const {loadMore,setQuery,reset} = characterSlice.actions;
export default characterSlice.reducer;