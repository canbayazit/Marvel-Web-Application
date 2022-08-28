import React from "react";
import style from "./style.module.scss";
import Header from "../../Components/Header/Header";
import CharacterTable from "../../Components/CharacterTable/CharacterTable";

const Home = () => {
  return (
    <div className={style.container}>
      <Header />
      <CharacterTable />
      {/* card item */}
    </div>
  );
};

export default Home;
