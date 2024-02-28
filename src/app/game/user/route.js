import { NextResponse } from "next/server";
import { openDB } from "@/db/services";
const verifyQuery = (query) => {
    const sliceQueryVerification = query.split(" ")
    const countSlice = sliceQueryVerification.length
    if (sliceQueryVerification[countSlice - 1] === "users") return true
    return false
}

export async function GET(res) {
    try {
        const db = await openDB()
        const { searchParams } = new URL(res.url)
        const category = searchParams.get('category')
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
        let users 
        users = await db.all(query)
        await db.close()
        return NextResponse.json(users)

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }
}