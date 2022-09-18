import './Global.css';
import { ThemeContext } from './context/ThemeContext';
import { AppContext } from './context/AppContext';
import Input from './components/Input';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import List from './components/List';
import Output from './components/Output';

function App() {

  const [faiz, setFaiz] = useState("")
  const [odeme, setOdeme] = useState(0);
  const [taksit, setTaksit] = useState(0)
  const [kredi, setKredi] = useState("");
  const [vergi, setVergi] = useState("");
  const [kira, setKira] = useState(0)
  const [theme,setTheme]=useState("light")

  const plan = []
  const tablo=[]
  const[tabloList,setTablo]=useState([])
  const [liste, setListe] = useState([])
  const [toplam, setToplam] = useState()

  useEffect(()=>{
   (theme==="light")? document.body.style.backgroundColor="white": document.body.style.backgroundColor= "rgb(0, 39, 72)"
  })

  const tabloGetir = () => {
    const faiz0 = ((faiz * 1000) / 100000)
    const vergi0 = (vergi / 100)
    const newFaiz = (faiz0) * (vergi0 + 1)

    if (odeme === 1) {
      let newKira = ((Math.pow(1.0 + newFaiz, taksit/4) * kredi * newFaiz) / ((Math.pow(1.0 + newFaiz, taksit/4) - 1.0)))
      setKira(newKira)
      tabloOlustur(newFaiz, newKira, faiz0,taksit/4)
    }
    else if (odeme === 2) {
      let newKira = ((Math.pow(1.0 + newFaiz, taksit) * kredi * newFaiz) / ((Math.pow(1.0 + newFaiz, taksit) - 1.0)))
      setKira(newKira)
      tabloOlustur(newFaiz, newKira, faiz0,taksit)
    }
    else if (odeme === 3) {
      const yillikFaiz0 = Math.pow(1.0 + faiz0, taksit * 12) - 1
      const yillikFaiz = (yillikFaiz0) * (vergi0 + 1)
      let newKira = ((Math.pow(1.0 + yillikFaiz, taksit) * kredi * yillikFaiz) / ((Math.pow(1.0 + yillikFaiz, taksit) - 1.0)))
      setKira(newKira)
      tabloOlustur(yillikFaiz, newKira, yillikFaiz0,taksit)
    }
  }

  const tabloOlustur = (f, m, f0,taksitSayisi) => {
    if(odeme!==1)
    tablo.push(kredi,(m).toFixed(2),(parseFloat(faiz)),(m*taksitSayisi).toFixed(2))
    else 
    tablo.push(kredi,(m/4).toFixed(2),(parseFloat(faiz)),(m*taksitSayisi).toFixed(2))
    setTablo(tablo)
  
    let tKredi = kredi;
    let toplamTaksit = 0
    let toplamAnapara = 0
    let toplamFaiz = 0
    let toplamKKDF = 0
    let toplamBSMV = 0
    let satir
    let tFaiz
    let tVergi
    let tVergi0
    let tVergi1
    let tBakiye
    let a=1

    for (let i = 1; i <= taksitSayisi; i++) {
      let tAnapara = (m) - (tKredi * f)
      tFaiz = (tKredi * f0)
      tVergi = (m - tFaiz - tAnapara)
      tVergi0 = (tVergi * 0.6)
      tVergi1 = (tVergi * 0.4)
      tBakiye = (tKredi - tAnapara)

      toplamTaksit = m + toplamTaksit
      toplamAnapara = tAnapara + toplamAnapara
      toplamFaiz = tFaiz + toplamFaiz
      toplamKKDF = tVergi0 + toplamKKDF
      toplamBSMV = toplamBSMV + tVergi1

      let newtoplam = [{ taksit: toplamTaksit, anapara: kredi, faiz: toplamFaiz, kkdf: toplamKKDF, bsmv: toplamBSMV }]
      setToplam(newtoplam)

      if (odeme!==1){
      satir = { kira: m, ay: i, anapara: tAnapara, faiz: tFaiz, kkdf: tVergi0, bsmv: tVergi1, bakiye: (i === taksit) ? 0 : tBakiye }
      plan.push(satir)
      }
      else {
      satir= { kira: m/4, ay: a , anapara: tAnapara/4, faiz: tFaiz/4, kkdf: tVergi0/4, bsmv: tVergi1/4, bakiye : tKredi-tAnapara/4 }
      let satir1= { kira: m/4, ay: a+1 , anapara: tAnapara/4, faiz: tFaiz/4, kkdf: tVergi0/4, bsmv: tVergi1/4, bakiye:  tKredi-tAnapara/2 }
      let satir2= { kira: m/4, ay: a+2, anapara: tAnapara/4, faiz: tFaiz/4, kkdf: tVergi0/4, bsmv: tVergi1/4, bakiye: tKredi-tAnapara*3/4 }
      let satir3= { kira: m/4, ay: a+3, anapara: tAnapara/4, faiz: tFaiz/4, kkdf: tVergi0/4, bsmv: tVergi1/4, bakiye: (taksit === i*4) ? 0 : tKredi-tAnapara }
      a=a+4
      plan.push(satir,satir1,satir2,satir3)
      }   
      setListe(plan)
      tKredi = ((tKredi * (1.0 + f)) - m)
    }
  }

  const data = {tabloList,vergi, toplam, faiz, liste, plan, taksit, odeme, kira, setFaiz, kredi, setOdeme, setTaksit, setKredi, setVergi, tabloGetir }
  const data1 ={theme,setTheme}
  return (
    <div className='App'>
      <ThemeContext.Provider value={data1}>
        <AppContext.Provider value={data}>
          <Header></Header>
          <Input></Input>
          {(tabloList.length>0)?<Output></Output>:<p></p>}
          {(kira) ? <List></List> : <p></p>}
        </AppContext.Provider >
      </ThemeContext.Provider>
    </div>
  );
}

export default App
