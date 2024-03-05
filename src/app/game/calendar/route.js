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
    const team = searchParams.get('team')
    let query = "SELECT * FROM calendar"

    if (category) {
        if (verifyQuery(query)) {
            query += ` WHERE category="${category}"`
        } else {
            query += ` AND category="${category}"`
        }
    }
    if (team) {
        if (verifyQuery(query)) {
            query += ` WHERE team="${team}"`
        } else {
            query += ` AND team="${team}"`
        }
    }
    let calendar
    calendar = await db.all(query)
    await db.close()
    return NextResponse.json(calendar)
}

export async function POST(res) {
    const db = await openDB()
    const data = await res.json()
    const { fullname, category, gener1, gener2, partner, city, email, movil, hour, date } = data
    console.log(fullname, category, gener1, gener2, partner, city, email, movil, hour, date)

    let calendar
    await db.run("INSERT into calendar (hour,date,category,available,team) values (?,?,?,?,?)",
        hour,
        date,
        category,
        1,
        ""
    )

    const id = await db.get("select seq from sqlite_sequence where name='calendar'")
    calendar = await db.get("select * from calendar where id = ?", id.seq)
    if (!calendar) {
        return NextResponse.json({
            error: "No hay registro",
            status: false
        })
    }
    await db.close()

    return NextResponse.json(calendar)
}

export async function PUT(res) {
    const db = await openDB()
    const data = await res.json()
    const { fullname, partner, hour, date, category } = data
    const team = fullname + "," + partner
    let calendar
    const calendar_team = await db.get("SELECT * FROM calendar where hour = ? and date = ? and category = ?",
        hour,
        date,
        category,
    )
    if (!calendar_team?.team) {
        await db.run("UPDATE calendar SET team = ? where hour = ? and date = ?",
            team,
            hour,
            date,
        )
    }else{
        await db.run("UPDATE calendar SET team = ?, available = 0 where hour = ? and date = ? and category = ?",
            calendar_team.team + "," + team,
            hour,
            date,
            category
        )
    }


    calendar = await db.get("select * from calendar where id = ?", calendar_team.id)
    if (!calendar) {
        return NextResponse.json({
            error: "No hay registro",
            status: false
        })
    }
    await db.close()

    return NextResponse.json(calendar)
}