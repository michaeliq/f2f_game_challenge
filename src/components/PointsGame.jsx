"use client"
import { useAppSelector } from "@/redux/hooks"
import "@/styles/components/PointsGame.css"

const PointsGame = () => {
    const user = useAppSelector((state) => state.user)

    return (
        <div className="points-box">
            <span className="text-points a">Grupo A</span>
            <div className="points-a">
                <img src={"/images/modulo_puntos_izq.png"} className="module-point-left" alt="Puntos equipo A" />
                <p>{user?.groupB?.points}</p>
            </div>
            <div className="points-b">
                <span className="text-points b">Grupo B</span>
                <img src={"/images/modulo_puntos_der.png"} className="module-point-right" alt="Puntos equipo B" />
                <p>{user?.groupA?.points}</p>
            </div>
        </div>
    )
}

export default PointsGame