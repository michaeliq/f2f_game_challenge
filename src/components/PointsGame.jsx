import "@/styles/components/PointsGame.css"

const PointsGame = () => {

    return (
        <div className="points-box">
            <div className="points-a">
                <img src={"/images/modulo_puntos_izq.png"} className="module-point-left" alt="Puntos equipo A" />
                <p>170</p>
            </div>
            <div className="points-b">
                <img src={"/images/modulo_puntos_der.png"} className="module-point-right" alt="Puntos equipo B" />
                <p>180</p>
            </div>
        </div>
    )
}

export default PointsGame