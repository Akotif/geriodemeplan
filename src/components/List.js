import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const List = () => {

    const { toplam, liste } = useContext(AppContext)
    return (
        <div>
            <table id="plan">
                <thead>
                    <tr>
                        <th>Taksit</th>
                        <th>Taksit Tutarı</th>
                        <th>Ana Para</th>
                        <th>Faiz</th>
                        <th>KKDF</th>
                        <th>BSMV</th>
                        <th>Bakiye</th>
                    </tr>
                </thead>
                <tbody>
                    {liste.map((satir, index) => (
                        <tr key={index}>
                            <td>{(satir.ay)}</td>
                            <td>{(satir.kira).toFixed(2)}</td>
                            <td>{(satir.anapara).toFixed(2)}</td>
                            <td>{(satir.faiz).toFixed(2)}</td>
                            <td>{(satir.kkdf).toFixed(2)}</td>
                            <td>{(satir.bsmv).toFixed(2)}</td>
                            <td>{(satir.bakiye).toFixed(2)}</td>
                        </tr>
                    ))}
                    {toplam.map((satir, index) => (
                        <tr key={index}>
                            <td>Toplam</td>
                            <td>{(satir.taksit).toFixed(2)}</td>
                            <td>{(satir.anapara)}</td>
                            <td>{(satir.faiz).toFixed(2)}</td>
                            <td>{(satir.kkdf).toFixed(2)}</td>
                            <td>{(satir.bsmv).toFixed(2)}</td>
                            <td>{""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List