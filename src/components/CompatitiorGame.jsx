"use client"
import "@/styles/components/CompatitorGame.css"
import { useEffect, useState } from "react"

const CompatitorGame = ({children,axisX,axisY,textAlt}) => {

    const [configImage, setConfig] = useState({})

    const validateSide = () => {
        if(axisX === "left"){
            setConfig(prev => {
                return {...prev,classN:"module-compatitor group-a"}
            })
        }else if(axisX === "right"){
            setConfig(prev => {
                return {...prev,classN:"module-compatitor group-b"}
            })
        }
        if(axisY === "Top"){
            setConfig(prev => {
                return {...prev,src:"/images/modulo_competidor_arriba.png"}
            })
        }else if(axisY === "Bottom"){
            setConfig(prev => {
                return {...prev,src:"/images/modulo_competidor_abajo.png"}
            })
        }
    }

    useEffect(()=>{
        validateSide()
    },[])

    return(
        <div className={`compatitor-box ${axisX === "right" ? "left":"right"}`}  >
            <img src={configImage?.src} className={configImage?.classN} alt={textAlt} />
            {children}
        </div>
    )
}

export default CompatitorGame