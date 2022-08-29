import React from 'react'
import style from './style.module.scss';
import logo from '../../Assets/img/newb.png';
import Search from '../Search/Search';
const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
      <img src={logo}></img>
      </div>
      <Search/>
    </div>
  )
}

export default Header