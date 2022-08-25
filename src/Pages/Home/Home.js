import React, { useEffect } from "react";
import style from "./style.module.scss";
import Header from "../../Components/Header/Header";
import { CharacterService } from "../../Services/getCharacters";
import { useData } from "../../Context/DataContext";
import CharacterTable from "../../Components/CharacterTable/CharacterTable";

const Home = () => {
  const { characterItem, setCharacterItem } = useData();
  console.log("home", characterItem);

  useEffect(() => {
    const response = async () => {
      const response = await CharacterService();
        console.log("resp if üstü", response);
    if (response.status === 200) {
      console.log("resp if", response);
      setCharacterItem(response.data.data.results);
    } else {

    }
    };
  response();
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <CharacterTable />
      {/* card item */}
    </div>
  );
};

export default Home;
