"use client"
import { useEffect, useState } from "react"
import "@/styles/components/RankingViewer.css"

const RankingViewer = ({visibility,setVisibility}) => {

    const [rankingList,setRankingList] = useState([])

    const categories = [
        "Biometria y LIOs Nivel 1",
        "Equipos Nivel 1",
        "Biometria y LIOs Nivel 2",
        "Equipos Nivel 2",
    ]

    const getRanking = async () => {
        try {
            const queryRanking = await fetch("/game/result", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const dataRanking = await queryRanking.json()

            setRankingList(dataRanking)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getRanking()
    },[visibility])

    return (
        <div className="ranking-viewer-container">
            <div className="ranking-viewer-content">
                <table className="ranking-viewer-list">
                    <thead>
                        <tr className="ranking-viewer-item">
                            <th className="ranking-viewer-cell">
                                Ganadores
                            </th>
                            <th className="ranking-viewer-cell">
                                Puntos
                            </th>
                            <th className="ranking-viewer-cell">
                                Tiempo (Seg)
                            </th>
                            <th className="ranking-viewer-cell">
                                Módulo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingList.map((ranking, key) => (
                            <tr key={key} className="ranking-viewer-item">
                                <th className="ranking-viewer-cell">
                                    {ranking.winner}
                                </th>
                                <th className="ranking-viewer-cell">
                                    {ranking.total_points}
                                </th>
                                <th className="ranking-viewer-cell">
                                    {ranking.total_time}
                                </th>
                                <th className="ranking-viewer-cell">
                                    {categories[ranking.category - 1]}
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className="ranking-viewer-container-btn">
                <button
                    onClick={() => {
                        setVisibility(prev => !prev)
                    }}
                    className="ranking-view-btn-confirm">
                    Salir
                </button>
            </div>
        </div>
    )
}

export default RankingViewer