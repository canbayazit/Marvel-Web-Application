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
  const characterList = useSelector((state) => state.characters.characterList); // state / slice name / state property
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const error = useSelector((state) => state.characters.error);
  const status = useSelector((state) => state.characters.status);
  const scroollLoad = useSelector((state) => state.characters.scroollLoad);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
      if(status === "idle"){
          dispatch(getCharacters());
      }
  },[status,dispatch])

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);



  function handleScroll() {
      if ((window.innerHeight + document.documentElement.scrollTop) +1 !== document.documentElement.offsetHeight) {
          // console.log("scroll")
          // console.log("innerHeight" , window.innerHeight);
          // console.log("scrolltop",document.documentElement.scrollTop);
          // console.log("offset",document.documentElement.offsetHeight);
          // console.log("windowscrollY", window.scrollY)
          return null;
      }
      
      
          

      dispatch(loadMore());
      // console.log("load")
  }

  useEffect(() => {
    if(scroollLoad && status === "succeeded" && hasNextPage){
        dispatch(getCharacters(page));
      //   console.log("scroll")
      //   console.log(page)

    }
},[scroollLoad,dispatch,status,page])

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
