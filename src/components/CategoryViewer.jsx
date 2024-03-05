"use client"
import "@/styles/components/CategoryViewer.css"
import { useEffect, useState } from "react"

const CategoryViewer = ({visibility,setVisibility}) => {
    const [categoryList,setCategoryList] = useState([])

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

    useEffect(()=>{
        getCategories()
    },[visibility])
    return (
        <div className="category-viewer-viewer-container">
            <ul className="category-viewer-list">
                {categoryList?.map((categoryItem, key) => (
                    <li key={key} onClick={() => setcategoryGame(categoryItem?.id)} className="category-viewer-item-container">
                        <p className="category-viewer-item-text">{categoryItem?.name}</p>
                    </li>
                ))}
            </ul>
            <div className="setect-category-viewer-confirm">
                <button
                    onClick={() => {
                        setVisibility(prev=>!prev)
                    }}
                    className="category-viewer-btn-confirm">
                    Salir
                </button>
            </div>
        </div>
    )
}

export default CategoryViewer