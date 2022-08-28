import React from 'react'
import style from './style.module.scss';
import logo from '../../Assets/img/marvelLogo.png';
const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
      <img src={logo}></img>
      </div>
      <input type="text" placeholder="Search Heroes" />
    </div>
  )
}

export default Header