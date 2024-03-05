import { NextResponse } from "next/server";
import { openDB } from "@/db/services";
const verifyQuery = (query) => {
    const sliceQueryVerification = query.split(" ")
    const countSlice = sliceQueryVerification.length
    if (sliceQueryVerification[countSlice - 1] === "users") return true
    return false
}

export async function GET(res) {
    const db = await openDB()
    const { searchParams } = new URL(res.url)
    const category = searchParams.get('category')
    const fullname = searchParams.get('fullname')
    const partner = searchParams.get('partner')
    const group = searchParams.get('group')
    let query = "SELECT * FROM users"

    if (category) {
        if (verifyQuery(query)) {
            query += ` WHERE category="${category}"`
        } else {
            query += ` AND category="${category}"`
        }
    }
    if (group) {
        if (verifyQuery(query)) {
            query += ` WHERE group="${group}"`
        } else {
            query += ` AND group="${group}"`
        }
    }
    if (fullname) {
        if (verifyQuery(query)) {
            query += ` WHERE fullname="${fullname}"`
        } else {
            query += ` AND fullname="${fullname}"`
        }
    }
    if (partner) {
        if (verifyQuery(query)) {
            query += ` WHERE partner="${partner}"`
        } else {
            query += ` AND partner="${partner}"`
        }
    }
    let users
    users = await db.all(query)
    await db.close()
    return NextResponse.json(users)
}

export async function POST(res) {
    const db = await openDB()
    const data = await res.json()
    const { fullname, category, gener1, gener2, partner, city, email, movil } = data
    const user1 = fullname?.trim()
    const user2 = partner?.trim()

    let user
    await db.run("INSERT into users (fullname, category, gener1, gener2, partner, city, email, movil) values (?,?,?,?,?,?,?,?)",
    user1, category, gener1, gener2, user2, city, email, movil
    )

    const id = await db.get("select seq from sqlite_sequence where name='users'")
    user = await db.get("select * from users where id = ?", id.seq)
    if (!user) {
        return NextResponse.json({
            error: "No hay registro",
            status: false
        })
    }
    await db.close()

    return NextResponse.json(user)
}