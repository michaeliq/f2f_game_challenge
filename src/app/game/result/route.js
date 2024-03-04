import { NextResponse } from "next/server";
import { openDB } from "@/db/services";

export async function GET(req) {
    const db = await openDB()
    const { searchParams } = new URL(req.url)
    let results
    results = await db.all("SELECT * FROM results")
    if (!results) {
        return NextResponse.json({
            error: "No hay resultados aún registrados",
            status: false
        })
    }
    await db.close()
    return NextResponse.json(results)
}

export async function POST(req) {
    const db = await openDB()
    const data = await req.json()
    const {category, winner, total_points, total_time, groups} = data
    let results
    await db.run("INSERT into results (category, winner, total_points, total_time, groups) values (?,?,?,?,?)",
        category,
        winner,
        total_points,
        total_time,
        groups
    )

    const id = await db.get("select seq from sqlite_sequence where name='results'")
    console.log(id)
    results = await db.get("select * from results where id = ?",id.seq)
    console.log(results)
    if (!results) {
        return NextResponse.json({
            error: "No hay registro",
            status: false
        })
    }
    await db.close()
    return NextResponse.json(results)
}