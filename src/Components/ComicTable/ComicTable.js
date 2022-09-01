import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComics } from "../../Store/characterDetailSlice";
import { reset } from "../../Store/characterSlice";
import style from "./style.module.scss";
const Detail = () => {
  const dispatch = useDispatch();
  const { character, comics } = useSelector((store) => store.comics); // store / slice name
  console.log(character);
  useEffect(() => {
    dispatch(reset()); //
    dispatch(getComics(character.id)); // Thunk'a comics leri getirmesi için gerekli id gönderdik
  }, [character.id]);

  return (
    <div className={style.container}>
      <div className={style.character}>
        <img src={character.thumbnail.path + "/portrait_incredible.jpg"}></img>
      </div>
      <div className={style.name}>
        <h2>{character.name}</h2>
        <p>
          {character.description === "" || character.description === null
            ? "No description given"
            : character.description}
        </p>
        <h1>COMICS</h1>
      </div>

      <div className={style.cardContainer}>
        {comics.map((item, index) => (
          <div className={style.resDiv}>
            <div className={style.quart} key={index}>
              <div className={style.img}>
              <img src={item.thumbnail.path + ".jpg"}  alt="" />
              </div>
              <div className={style.title}>
                <h2>{item.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); //item.thumbnail.path + ".jpg"
};

export default Detail;
