"use client"
import { useAppSelector } from "@/redux/hooks"
import "@/styles/components/PointsGame.css"

const PointsGame = () => {
    const user = useAppSelector((state)=>state.user)

    return (
        <div className="points-box">
            <div className="points-a">
                <img src={"/images/modulo_puntos_izq.png"} className="module-point-left" alt="Puntos equipo A" />
                <p>{user?.groupB?.points}</p>
            </div>
            <div className="points-b">
                <img src={"/images/modulo_puntos_der.png"} className="module-point-right" alt="Puntos equipo B" />
                <p>{user?.groupA?.points}</p>
            </div>
        </div>
    )
}

export default PointsGame