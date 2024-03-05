"use client"
import "@/styles/components/CreateUser.css"
import { useState, useEffect } from "react"
import ListCalendar from "./ListCalendar"
import Swal from "sweetalert2"

const CreateUser = ({ visibility, setVisibility }) => {
    const [caledarList, setCalendarList] = useState([])
    const [userData, setUserData] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        setUserData(prev => {
            let dato = {}
            dato[e.target.name] = e.target.value
            return { ...prev, ...dato }
        })
    }

    const setCategoryForm = (data) => {
        setUserData(prev => {
            const datos = {
                hour: data.hour,
                date: data.date,
                category: data.category
            }
            return { ...prev, ...datos }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch("/game/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: userData.fullname,
                    partner: userData.partner,
                    gener1: userData.gener1,
                    gener2: userData.gener2,
                    city: userData.city,
                    movil: userData.movil,
                    email: userData.email,
                    category: userData.category
                })
            })

            const queryCalendar = await fetch("/game/calendar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: userData.fullname,
                    partner: userData.partner,
                    hour: userData.hour,
                    date: userData.date,
                    category: userData.category
                })
            })

            const dataCalendar = await queryCalendar.json()

            Swal.fire({
                title: "Se han registrado exitosamente",
                icon: "success"
            })

            setUserData({
                fullname:"",
                partner:"",
                gener1:"",
                gener2:"",
                city:"",
                movil:"",
                email:"",
                category:""
            })
        } catch (error) {
            Swal.fire({
                "title": "Ocurrio un problema en el registro",
                icon: "error"
            })
        }

    }

    useEffect(() => {
    }, [visibility])

    return (
        <div className="create-user-container">
            <div className="create-user-content">
                <from className="create-user-form">
                    <div className="create-user-container-input">
                        <label htmlFor="" className="create-user-label">Nombre y Apellido</label>
                        <input type="text" className="create-user-input" onChange={handleChange} value={userData?.fullname} name="fullname" />
                        <div className="form-gener-box">
                            <label htmlFor="gener1">
                                Género
                            </label>
                            <div>
                                <input type="radio" id="hombre1" onChange={handleChange} name="gener1" value="hombre" />
                                <label for="hombre1">M</label>
                            </div>

                            <div>
                                <input type="radio" id="mujer1" onChange={handleChange} name="gener1" value="mujer" />
                                <label for="mujer1">F</label>
                            </div>
                        </div>
                    </div>
                    <div className="create-user-container-input">
                        <label htmlFor="" className="create-user-label">Celular</label>
                        <input type="number" className="create-user-input" onChange={handleChange} value={userData?.movil} name="movil" />
                    </div>
                    <div className="create-user-container-input">
                        <label htmlFor="" className="create-user-label">Correo</label>
                        <input type="text" className="create-user-input" onChange={handleChange} value={userData?.email} name="email" />
                    </div>
                    <div className="create-user-container-input">
                        <label htmlFor="" className="create-user-label">Ciudad</label>
                        <input type="text" className="create-user-input" onChange={handleChange} value={userData?.city} name="city" />
                    </div>
                    <div className="create-user-container-input">
                        <label htmlFor="" className="create-user-label">Compeñaro/a de combate</label>
                        <input type="text" className="create-user-input" onChange={handleChange} value={userData?.partner} name="partner" />
                        <div className="form-gener-box">
                            <label htmlFor="gener1">
                                Género
                            </label>
                            <div>
                                <input type="radio" id="hombre2" onChange={handleChange} name="gener2" value="hombre" />
                                <label for="hombre2">M</label>
                            </div>

                            <div>
                                <input type="radio" id="mujer2" onChange={handleChange} name="gener2" value="mujer" />
                                <label for="mujer2">F</label>
                            </div>
                        </div>
                    </div>
                    <ListCalendar categorySelected={userData?.category} setCategory={setCategoryForm} />
                    <div className="create-user-container-btn">
                        <input onClick={handleSubmit} type="submit" className="create-user-btn-confirm" value="Inscribir Participantes" />
                        <button onClick={() => setVisibility(prev => !prev)}>
                            Cerrar
                        </button>
                    </div>
                </from>
            </div>
        </div>
    )
}

export default CreateUser