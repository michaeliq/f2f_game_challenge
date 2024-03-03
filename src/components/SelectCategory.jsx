"use client"

import { updateCategoryByGame, updateQuestionsByGame } from "@/redux/gameReducer"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "@/styles/components/SelectCategory.css"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const SelectCategory = ({ setVisibility }) => {

    const game = useAppSelector(state => state.game)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [categoryList, setCategoryList] = useState([])
    const [categorySelected, setCategoryGame] = useState("")

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

    const selectCategoryByGame = async () => {
        if (categorySelected) {
            try {
                const categoryReq = await fetch("/game/question?category=" + categorySelected, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await categoryReq.json()
                let questionIds = []

                while (questionIds.length < 9) {
                    const indexList = getRandomInt(data?.length)
                    if (questionIds.length > 0 && questionIds.find((element) => element === indexList)) {
                        continue
                    } else {
                        questionIds.push(indexList)
                    }
                }
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

    return (
        <div className="select-category-container">
            <ul className="category-list">
                {categoryList?.map((categoryItem, key) => (
                    <li onClick={() => setCategoryGame(categoryItem?.id)} className="category-item-container">
                        <p className="category-item-text">{categoryItem?.name}</p>
                    </li>
                ))}
            </ul>
            <div className="setect-category-confirm">
                <button
                    onClick={() => {
                        selectCategoryByGame()
                    }}
                    className="category-btn-confirm">
                    {categorySelected ? "Confirmar" : "Salir"}
                </button>
            </div>
        </div>
    )
}

export default SelectCategory