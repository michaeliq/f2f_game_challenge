"use client"

const { useAppSelector } = require("@/redux/hooks")
const { useState, useEffect } = require("react")
import "@/styles/components/CelebrateTeam.css"

const CelebrateTeam = ({winner}) =>{
    
    const user = useAppSelector(state => state.user)
    const [gener1,setGener1] = useState("")
    const [gener2,setGener2] = useState("")

    console.log(winner === "A")

    const getTeamData = async () => {
        let query
        if(winner === "A"){
            query = await fetch(`/game/user?fullname=${user.groupA.user1}&partner=${user.groupA.user2}`,{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"GET"
            })
        }else if(winner === "B"){
            query = await fetch(`/game/user?fullname=${user.groupB.user1}&partner=${user.groupB.user2}`,{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"GET"
            })
        }

        const data = await query.json()

        setGener1(data[0].gener1)
        setGener2(data[0].gener2)
    }

    useEffect(()=>{
        getTeamData()
    },[user])
    return(
        <div className="celebrate-team-container">
            {gener1 === "mujer" ? 
            <img src="/images/doctor_1.png" alt="Jugador 1" className="celebrate-player-1"/>:
            <img src="/images/doctor_2.png" alt="Jugador 1" className="celebrate-player-1"/>
        }
            <img src="/images/win_image.png" alt="Cinturon" className="celebrate-goal"/>
            {gener2 === "mujer" ? 
            <img src="/images/doctor_1.png" alt="Jugador 2" className="celebrate-player-2"/>:
            <img src="/images/doctor_2.png" alt="Jugador 2" className="celebrate-player-2"/>
        }
        </div>
    )
}

export default CelebrateTeam