import { NextResponse } from "next/server";
import { openDB } from "@/db/services";
export async function GET(res) {
    const db = await openDB()
    const { searchParams } = new URL(res.url)
    const category = searchParams.get('category')
    let group
    if (category) {
        group = await db.all("SELECT * FROM groups WHERE category=?;", category)
    } else {
        group = await db.all("SELECT * FROM groups")
    }
    await db.close()
    return NextResponse.json(group)
}