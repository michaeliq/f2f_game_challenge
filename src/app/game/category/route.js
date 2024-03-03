import { NextResponse } from "next/server";
import { openDB } from "@/db/services";

export async function GET(res) {
    const db = await openDB()
    const { searchParams } = new URL(res.url)
    const name = searchParams.get('name')
    let category
    if (name) {
        category = await db.get("SELECT * FROM categories WHERE name=?;", name)
    } else {
        category = await db.all("SELECT * FROM categories")
    }
    if (!category) {
        return NextResponse.json({
            error: "No hay más preguntas",
            status: false
        })
    }
    await db.close()
    return NextResponse.json(category)
}