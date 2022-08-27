import React from 'react'
import style from './style.module.scss';
import logo from '../../Assets/img/marvel-logo.png';
const Header = () => {
  return (
    <div className={style.container}>
      <img src={logo}></img>
      <input type="text" placeholder="Search Heroes" />
    </div>
  )
}

export default Header