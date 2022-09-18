import React, { useContext} from 'react'
import { AppContext } from '../context/AppContext'

const Output = () => {

    const {tabloList } = useContext(AppContext);
   
    return (
        <div className='Output'>
            <table id="output">
                <thead >
                    <tr>
                        <th>Alacağınız Kredi</th>
                        <th>Taksit Tutarı</th>
                        <th>Faiz Oranı % (Aylık) </th>
                        <th>Ödeyeceğiniz Tutar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      {tabloList.map((item,idx)=>(
                        <td key={idx}>{item}</td>
                      ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Output