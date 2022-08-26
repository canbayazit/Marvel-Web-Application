import React from "react";
import { useData } from "../../Context/DataContext";
import style from "./style.module.scss";
const CharacterTable = () => {
  const { characterItem } = useData();
  console.log(characterItem);
  return (
    <div className={style.container}>
      {characterItem.map((item, index) => (
        <div className={style.quart}>
          <div className={style.card} key={item.id}>
            <img src={item.thumbnail.path + "/portrait_incredible.jpg"} alt="" />
            <h3>{item.name}</h3>
            <button>LEARN MORE</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterTable;
