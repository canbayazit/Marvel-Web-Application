/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import style from "./style.module.scss";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading/Loading";
import { getCharacters } from "../../Store/characterSlice";
import { setCharacter } from "../../Store/characterDetailSlice";
import {loadMore} from '../../Store/characterSlice';
import InfiniteScroll from "react-infinite-scroll-component";
const CharacterTable = () => {
  // const { characterItem } = useData();
  // Context API gibi useData mantığıyla global stateteki verilerimizi useSelector ile buraya aktarıyoruz
  // const characterList = useSelector((state) => state.characters.characterList); // state / slice name / state property
  // const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  // const error = useSelector((state) => state.characters.error);
  // const scroollLoad = useSelector((state) => state.characters.scroollLoad);
  const { characterList, query,status,offset,allCharacters} = useSelector(
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

 const handleClick = (item)=>{
  dispatch(setCharacter(item));
  navigate( "/detail");

 }

  return (
   <InfiniteScroll
   dataLength={characterList.length} // data uzunluğu
   hasMore={allCharacters>30 ? true : false} // true oldukça InfiniteScroll çalışır
   next={()=>offset<allCharacters && dispatch(loadMore(offset))} // scroll bar en aşağıya ulaştıktan sonra çalışan fonksiyon, burda scroll en aşağıya ulaşınca daha fazla karakter getirmesini trigger lıyoruz
   loader={status ==="loading"  && <Loading/> }  // loading ekranı için
   style={{overflow:'hidden' }}
   >
    <div className={style.container}>    
      {characterList.map((item, index) => (     
        <div className={style.quart} key={index}>
          <div className={style.card}  >
            <img src={item.thumbnail.path + "/portrait_incredible.jpg"} alt={item.name} />
            <h3>{item.name}</h3>
            <button className={style.buttonX} onClick={()=>handleClick(item)}><span className={style.span} >LEARN MORE</span></button>
          </div>
        </div>
        
      ))}    
    </div>
    </InfiniteScroll>
  );
};

export default CharacterTable;
