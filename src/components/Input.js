import React, { useRef } from 'react'
import { AppContext, useContext } from '../context/AppContext'
//import { ThemeContext, useContext } from '../context/ThemeContext'
const Input = () => {

    // const { theme, setTheme } = useContext(ThemeContext)
    const {tabloGetir, kredi, setKredi, faiz, setFaiz, vergi, setVergi, odeme, setOdeme, taksit, setTaksit } = useContext(AppContext)

    const inputRef = useRef();
    const hafta = [12, 16, 24, 32, 40, 48, 52]
    const ay = [3, 6, 9, 12, 18, 24, 30, 36, 42, 48]
    const yil = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const changeHandler = (e) => {
        switch (e.target.name) {
            case ("kredi"):
                setKredi(e.target.value)
                break;
            case ("odeme"):
                setOdeme(parseFloat(e.target.value))
                setTaksit(0)
                break;
            case ("taksit"):
                setTaksit(parseFloat(e.target.value))
                break;
            case ("faiz"):
                setFaiz((e.target.value))
                break;
            case ("vergi"):
                setVergi((e.target.value))
                break;
            default:
        }
    }

    const clickHandler = (e) => {
        if (kredi >= 500 && kredi<=1000000) {
            if (odeme && odeme > 0) {
                if (taksit && taksit > 0) {
                    if (0 < parseFloat(faiz)<100) {
                        if (vergi && 0<vergi<100) {
                            e.preventDefault()
                            tabloGetir() 
                        }
                        else alert("bir vergi oranı girin")
                        e.preventDefault()
                    }
                    else alert("0 dan büyük bir faiz değeri girin")
                    e.preventDefault()
                }
                else alert("taksit sayısı seçin")
                e.preventDefault()
            }
            else alert("ödeme aralığı seçin")
            e.preventDefault()

        }
        else alert("500 ₺ ile 1 Milyon ₺ arasında bir kredi tutarı girin")
        e.preventDefault()
    }

    const renderOption = () => {
        if (odeme === 1) {
            return (
                hafta.map((item) => (
                    <option key={item} value={item}>{item}</option>
                )))
        }
        else if (odeme === 2) {
            return (
                ay.map((item) => (
                    <option key={item} value={item}>{item}</option>
                )))
        }
        else if (odeme === 3) {
            return (
                yil.map((item) => (
                    <option key={item} value={item}>{item}</option>
                )))
        }
    }

    return (
        <div className='allInput'>
            <div id="baslik">
            <label>Kredi Hesaplama Aracı</label>
            </div>
            <br></br>
            <form type="submit">
                <input onChange={(e) => changeHandler(e)} value={kredi} ref={inputRef}
                    required type="number" name='kredi' min={0} step={0.01} id='input0' placeholder='Kredi Tutarı (₺)' className='input0'></input>
                <br></br>
                <select onChange={(e) => changeHandler(e)} value={odeme} name='odeme' required id='input3' className='input3'>
                    <option value="0">Ödeme Aralığı</option>
                    <option value="1">Haftalık</option>
                    <option value="2">Aylık</option>
                    <option value="3">Yıllık</option>
                </select>
                <select onChange={(e) => changeHandler(e)} value={taksit} name='taksit' required id='input3' className='input3'>
                    <option value="">Taksit Sayısı</option>
                    {renderOption()}
                </select>
                <input onChange={(e) => changeHandler(e)} value={faiz}
                    name='faiz' required type="number" min={0} step={0.01} id='input2' placeholder='Aylık Faiz %' className='input1'></input>

                <input onChange={(e) => changeHandler(e)} value={vergi}
                    name="vergi" required type="number" min={0} id='input4' placeholder='Vergi Oranı %' className='input1'></input>

                <br></br>
                <button onClick={(e) => clickHandler(e)} id='input5' className='input5'>HESAPLA</button>
            </form>
        </div>
    )
}

export default Input