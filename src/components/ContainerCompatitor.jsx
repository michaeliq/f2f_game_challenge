"use client"
import CompatitorGame from "./CompatitiorGame"

import "@/styles/components/ContainerCompatitorGame.css"
import PointsGame from "./PointsGame"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setGroup } from "@/redux/userReducer"
import { useEffect } from "react"

const ContainerCompatitorGame = () => {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    
    const getUser = async () => {
        try {
            const queryUser = await fetch("/game/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const queryGroups = await fetch("/game/group?category=1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const dataGropus = await queryGroups.json()
            const dataUser = await queryUser.json()

            dataGropus.forEach((group, key) => {
                let groupUser = []
                dataUser.forEach((userDb) => {
                    if (group.users.indexOf(userDb.id) != -1) {
                        groupUser.push(userDb)
                    }
                })

                if (key === 0) {

                    dispatch(setGroup({
                        user1: groupUser[0].fullname,
                        user2: groupUser[1].fullname,
                        category: "General",
                        group: "A"
                    }))

                } else if (key === 1) {

                    dispatch(setGroup({
                        user1: groupUser[0].fullname,
                        user2: groupUser[1].fullname,
                        category: "General",
                        group: "B"
                    }))
                }
            });

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="container-compatitor-game">
            <CompatitorGame axisX={"right"} axisY={"Top"} altText={"Competidor 1 equipo A"}>
                <p>{user?.groupA?.user1}</p>
            </CompatitorGame>
            <CompatitorGame axisX={"left"} axisY={"Top"} alt="Competidor 1 equipo B">
                <p>{user?.groupB?.user1}</p>
            </CompatitorGame>
            <CompatitorGame axisX={"right"} axisY={"Bottom"} alt="Competidor2 equipo A">
                <p>{user?.groupA?.user2}</p>
            </CompatitorGame>
            <CompatitorGame axisX={"left"} axisY={"Bottom"} alt="Competidor 2 equipo B" >
                <p>{user?.groupB?.user2}</p>
            </CompatitorGame>
            <PointsGame />
        </div>
    )
}

export default ContainerCompatitorGame