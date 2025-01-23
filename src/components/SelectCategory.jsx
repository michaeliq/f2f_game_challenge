"use client"

import { updateCategoryByGame, updateQuestionsByGame } from "@/redux/gameReducer"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "@/styles/components/SelectCategory.css"
import { setGroup } from "@/redux/userReducer"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const SelectCategory = ({ setVisibility }) => {

    const game = useAppSelector(state => state.game)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [categoryList, setCategoryList] = useState([])
    const [calendarList, setCalendarList] = useState([])
    const [categorySelected, setCategoryGame] = useState("")
    const [teamSelected,setTeamSelected] = useState("")

    const getCategories = async () => {
        try {
            const categoryReq = await fetch("/game/category", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await categoryReq.json()
            setCategoryList(data)
        } catch (error) {
            setCategoryList([])
        }
    }

    const getCalendar = async () => {
        try {
            console.log(categorySelected)
            const calendarReq = await fetch("/game/calendar?category="+categorySelected?.name, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await calendarReq.json()
            setCalendarList(data)
        } catch (error) {
            setCalendarList([])
        }
    }

    const selectCategoryByGame = async () => {
        if (categorySelected && teamSelected) {
            try {
                const categoryReq = await fetch("/game/question?category=" + categorySelected?.id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await categoryReq.json()
                let questionIds = []
                let team = []

                while (questionIds.length < 5) {
                    const indexList = getRandomInt(data?.length)
                    const indexQuestion = data[indexList]?.id
                    if (questionIds.length > 0 && questionIds.find((element) => element === indexQuestion)) {
                        continue
                    } else {
                        questionIds.push(indexQuestion)
                    }
                }

                calendarList.forEach(element =>{
                    if(element.id === teamSelected){
                        team = element
                    }
                })
                dispatch(setGroup({
                    user1: teamSelected?.team.split(",")[0],
                    user2: teamSelected?.team.split(",")[1],
                    category: categorySelected,
                    group: "A"
                }))

                dispatch(setGroup({
                    user1: teamSelected?.team.split(",")[2],
                    user2: teamSelected?.team.split(",")[3],
                    category: categorySelected,
                    group: "B"
                }))
                dispatch(updateQuestionsByGame(questionIds))

                
            } catch (error) {
                console.error(error)
                dispatch(updateQuestionsByGame([]))
            }
            dispatch(updateCategoryByGame(categorySelected))
            router.push("/game")
        } else {
            setVisibility(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [game.category])

    useEffect(()=>{
        getCalendar()
    },[categorySelected])

    return (
        <div className="select-category-container">
            
            <ul className="category-list">
                {!categorySelected && categoryList?.map((categoryItem, key) => (
                    <li key={key} onClick={() => setCategoryGame(categoryItem)} className="category-item-container">
                        <p className="category-item-text">{categoryItem?.name}</p>
                    </li>
                ))}
                {categorySelected && calendarList?.map((calendarItem, key) => (
                    <li key={key} onClick={() => setTeamSelected(calendarItem)} className="category-item-container">
                        <p className="category-item-text">{calendarItem?.team || "Sin inscripción"},{calendarItem?.hour},{calendarItem?.date}</p>
                    </li>
                ))}
            </ul>
            <div className="setect-category-confirm">
                <button
                    onClick={() => {
                        selectCategoryByGame()
                    }}
                    className="category-btn-confirm">
                    {teamSelected ? "Confirmar" : "Salir"}
                </button>
            </div>
        </div>
    )
}

export default SelectCategory