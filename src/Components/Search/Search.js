import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { reset, setQuery } from '../../Store/characterSlice';
import style from './style.module.scss';
const Search = () => {
  const [text,setText]=useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuery(text));
    dispatch(reset()); // reset the characters, queryResult and offset when the query changes
  }, [text]);

  const updateQuery = (e) => setText(e.target.value);
  const debouncedOnChange = debounce(updateQuery, 500); // debounce the search input to prevent unnecessary requests

  return (
    <div className={style.container}>
      <input type="text" placeholder="Search Heroes" onChange={debouncedOnChange}/>
    </div>
  )
}

export default Search;