import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import logo from "../../Assets/img/newb.png";
import debounce from "lodash.debounce";
import { reset, setQuery } from "../../Store/characterSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const [isScrolling, setScrolling] = useState(true);
  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    window.scrollY >= 100 ? setScrolling(false) : setScrolling(true);
  });
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuery(text));
    dispatch(reset()); // reset the characters, queryResult and offset when the query changes
  }, [text]);

  const updateQuery = (e) => setText(e.target.value);
  const debouncedOnChange = debounce(updateQuery, 500);
  return (
    <div className={isScrolling ? style.container : style.containerActive}>
      <div className={style.logo}>
        <img src={logo}></img>
      </div>
      <div className={style.containerSearch}>
        <input
          className={style.search}
          type="text"
          placeholder="Search Heroes"
          onChange={debouncedOnChange}
        />
      </div>
    </div>
  );
};

export default Header;
