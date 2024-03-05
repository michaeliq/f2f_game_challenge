"use client"
import "@/styles/components/ListCalendar.css"
import { useState, useEffect } from "react"

const ListCalendar = ({ setCategory, categorySelected }) => {
    const [categorySelectedByList, setCategoryByList] = useState("")
    const [dialogListCategories, setCategoriesByDialog] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [tableVisible, setTableVisible] = useState(false)
    const [tableItems, setItems] = useState(null)

    const getCategories = async () => {
        const categoryRequest = await fetch("/game/calendar", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await categoryRequest.json()
        setCategoryList(data)
        filterCategories(data)
    }

    const generateItemList = () => {
        const itemList = categoryList.filter(item => {
            let value = ""
            if (item.available !== false && item.category === categorySelectedByList) {
                value = item
            }
            return value
        }).map((item, key) => {
            return (
                <tr key={key + item.category}>
                    <th>{item.date}</th>
                    <th>{item.hour}</th>
                    <th>{item.category}</th>
                    <th><span className="item-selectable" onClick={() => {
                        selectCategory(item)
                        setCategoryByList("")
                    }}>Seleccionar</span></th>
                </tr>
            )
        })
        return itemList
    }

    const filterCategories = () => {
        const uniqueCategoryNames = []
        categoryList.forEach((item) => {
            if (uniqueCategoryNames.indexOf(item?.category) === -1) {
                uniqueCategoryNames.push(item?.category)
            }
        })
        if (dialogListCategories.length <= 0) {
            setCategoriesByDialog(uniqueCategoryNames)
            return
        }
    }

    const selectCategory = (e) => {
        setCategory(e)
        changeVisible()
    }

    const changeVisible = () => {
        setTableVisible(prev => !prev)
    }

    useEffect(() => {
        setItems(generateItemList(categoryList))
    }, [categoryList, categorySelectedByList])

    useEffect(() => {
        getCategories()
    }, [dialogListCategories, categorySelected])

    return (
        <div className="list-category-container">
            <div className="list-category button-display">
                <span className="list-category text-button">
                    Módulo
                </span>
                <div className="list-category-select-container">
                    {categorySelected} {categorySelectedByList && <span className="list-category-select-reset" onClick={() => setCategoryByList("")}>X</span>}
                    <span onClick={changeVisible} alt="Despliegue de categorias" className={`list-category img-button ${tableVisible ? "visible" : ""}`}>{tableVisible ? "▲" : "▼"}</span>
                </div>
            </div>
            {!categorySelectedByList ?
                <div className={`list-category-dialog ${tableVisible ? "visible" : ""}`}>
                    <div className={`list-category-dialog-box`}>
                        {dialogListCategories.map((item, key) => (
                            <p onClick={() => { setCategoryByList(item) }} key={key}>{item}</p>
                        ))}
                    </div>
                </div> :
                <table className={`list-category table ${tableVisible ? "visible" : ""}`}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Categoria</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableItems}
                    </tbody>
                </table>}
        </div>
    )
}

export default ListCalendar