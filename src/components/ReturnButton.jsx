"use client"
const { useRouter, usePathname } = require("next/navigation")
import { useAppSelector } from "@/redux/hooks"
import "@/styles/components/ReturnButton.css"
import Swal from "sweetalert2"

const ReturnButton = () => {
    const game = useAppSelector((state)=>state.game)
    const router = useRouter()
    const pathname = usePathname()
    
    const goBack = () =>{
        if(pathname === "/game" && game.paused === false){
            Swal.fire({
                title:"Advertecia",
                text:"Si deseas regresar al menú principal en medio de una partida, por favor ponte en pausa",
                icon:"info"
            })
            return
        }
        router.back()
    }
    return (
        <div onClick={goBack} className="return-bttn">
            <span>Salir del juego</span>
        </div>
    )
}

export default ReturnButton