import React from 'react'
import { ThemeContext, useContext} from '../context/ThemeContext'

const Header = () => {
  const {setTheme,theme}=useContext(ThemeContext)
  return (
    <div className='Header'>
        <h1>Kredi Hesap</h1>
        <button onClick={()=>setTheme((theme==="light")? "dark":"light")} id="themeButton">{(theme==="light")? "karanlık":"aydınlık"} temaya geç</button>
    </div>
  )
}

export default Header