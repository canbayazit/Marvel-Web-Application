import axios from 'axios'
import React from 'react'
import { hash, limit } from '../Constant/constants';
//.data.data.results
const CharacterService = async() => {
   

    try {
        
    const response = await axios(`http://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=1&apikey=437d4802af06645527d3a4e4e56da6f2&hash=${hash}`);
    console.log(response)
    return response

    } catch (error) {
       return error.response
    }
}

export {CharacterService}