import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useData } from "../../Context/DataContext";
import style from "./style.module.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading/Loading";
const CharacterTable = () => {
  const { characterItem } = useData();
  // const characters = useSelector((state) => state.characters.characterList); // state/slice name/state property
  // const status = useSelector((state) => state.characters.status);
  // const navigate= useNavigate();
  console.log(characterItem);
  return (
   
    <div className={style.container}>
    
      {characterItem.map((item, index) => (
     
        <div className={style.quart} >
          <div className={style.card} key={item.id}>
            <img src={item.thumbnail.path + "/portrait_incredible.jpg"} alt="" />
            <h3>{item.name}</h3>
            <button>LEARN MORE</button>
          </div>
        </div>
        
      ))}
        {/* {             
             status ==="loading" && <Loading/>      
      } */}
    </div>
   
  );
};

export default CharacterTable;
