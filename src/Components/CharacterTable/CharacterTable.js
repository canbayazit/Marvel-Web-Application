import React from "react";
import { useData } from "../../Context/DataContext";
import style from "./style.module.scss";
const CharacterTable = () => {
  const { characterItem } = useData();
  console.log(characterItem);
  return (
    <div className={style.container}>
      {characterItem.map((item, index) => (
        <div className={style.card} key={item.id}>
          <div className={style.img}>
            <img src={item.thumbnail.path + "/portrait_uncanny.jpg"} alt="" />
          </div>
          <div>
            <h3>{item.name}</h3>
            <button>LEARN MORE</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterTable;
