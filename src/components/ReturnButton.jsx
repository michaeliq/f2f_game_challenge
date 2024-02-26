"use client"
const { useRouter } = require("next/navigation")
import "@/styles/components/ReturnButton.css"

const ReturnButton = () => {
    const router = useRouter()
    return (
        <div onClick={() => router.back()} className="return-bttn">
            <span>Salir del juego</span>
        </div>
    )
}

export default ReturnButton