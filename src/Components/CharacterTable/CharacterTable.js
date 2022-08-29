/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import style from "./style.module.scss";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading/Loading";
import { getCharacters } from "../../Store/characterSlice";
import {loadMore} from '../../Store/characterSlice';
const CharacterTable = () => {
  // const { characterItem } = useData();
  // Context API gibi useData mantığıyla global stateteki verilerimizi useSelector ile buraya aktarıyoruz
  // const characterList = useSelector((state) => state.characters.characterList); // state / slice name / state property
  // const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  // const error = useSelector((state) => state.characters.error);
  // const scroollLoad = useSelector((state) => state.characters.scroollLoad);
  const { characterList, query,status,offset } = useSelector(
    (store) => store.characters
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
      if(status === "idle"){
          dispatch(getCharacters());
      }
  },[status,dispatch])



  useEffect(() => {
    dispatch(getCharacters({offset,query }));
  }, [offset,query]);

 

  return (
   
    <div className={style.container}>    
      {characterList.map((item, index) => (     
        <div className={style.quart} key={item.id}>
          <div className={style.card}  >
            <img src={item.thumbnail.path + "/portrait_incredible.jpg"} alt={item.name} />
            <h3>{item.name}</h3>
            <button>LEARN MORE</button>
          </div>
        </div>
        
      ))}
        {             
             status ==="loading"  && <Loading/>      
      }
    </div>
   
  );
};

export default CharacterTable;
