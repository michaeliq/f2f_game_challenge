import { NextResponse } from "next/server";
import { openDB } from "@/db/services";

export async function GET(res) {
    const db = await openDB()
    const { searchParams } = new URL(res.url)
    const id = searchParams.get('id')
    let question
    if (id) {
        question = await db.get("SELECT * FROM questions WHERE id=?;", id)
    } else {
        question = await db.get("SELECT * FROM questions")
    }
    if (!question) {
        return NextResponse.json({
            error: "No hay más preguntas",
            status: false
        })
    }
    return NextResponse.json(question)
}