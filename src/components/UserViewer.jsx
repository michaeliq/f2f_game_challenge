"use client"
import "@/styles/components/UserViewer.css"
import { useEffect, useState } from "react"

const UserViewer = ({visibility,setVisibility}) => {
    const [userList,setUserList] = useState([])

    const getAllUser = async () =>{
        try {
            const queryUser = await fetch("/game/user",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const dataUser = await queryUser.json()
            setUserList(dataUser)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getAllUser()
    },[visibility])

    return(
        <div className="user-viewer-container">
            <div className="user-viewer-content">
                <table className="user-viewer-list">
                    <thead>
                        <tr className="user-viewer-item">
                            <th className="user-viewer-cell">
                                Jugadores
                            </th>
                            <th className="user-viewer-cell">
                                Módulo
                            </th>
                            <th className="user-viewer-cell">
                                Fecha
                            </th>
                            <th className="user-viewer-cell">
                                Hora
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, key) => (
                            <tr key={key} className="user-viewer-item">
                                <th className="user-viewer-cell">
                                    {user.fullname + "/" + user.partner}
                                </th>
                                <th className="user-viewer-cell">
                                    {user.category}
                                </th>
                                <th className="user-viewer-cell">
                                    {user.date}
                                </th>
                                <th className="user-viewer-cell">
                                    {user.hour}
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className="user-viewer-container-btn">
                <button
                    onClick={() => {
                        setVisibility(prev => !prev)
                    }}
                    className="user-view-btn-confirm">
                    Salir
                </button>
            </div>
        </div>
    )
}

export default UserViewer