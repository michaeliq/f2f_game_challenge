import { NextResponse } from "next/server";
import { openDB } from "@/db/services";

export async function GET(res) {
    const db = await openDB()
    const { searchParams } = new URL(res.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    let question
    if (id) {
        question = await db.get("SELECT * FROM questions WHERE id=?", id)
    } else if(category) {
        question = await db.all("SELECT * FROM questions WHERE category=? order by id desc",category)
    }else{
        question = await db.all("SELECT * FROM questions")
    }
    if (!question) {
        return NextResponse.json({
            error: "No hay más preguntas",
            status: false
        })
    }
    await db.close()
    return NextResponse.json(question)
}