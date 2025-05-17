import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { getUserFromRequest } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    // Get user from request
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { platforms } = body

    // Validate input
    if (!platforms) {
      return NextResponse.json({ error: "Missing platforms data" }, { status: 400 })
    }

    const db = await getDb()

    // Update user document with social media platforms data
    await db.collection("users").updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          "socialMedia.platforms": platforms,
          "socialMedia.lastUpdated": new Date(),
        },
      },
    )

    return NextResponse.json({ success: true, message: "Platforms saved successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error saving platforms:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get user from request
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDb()

    // Get user document with platforms data
    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user.userId) }, { projection: { "socialMedia.platforms": 1 } })

    return NextResponse.json(
      {
        success: true,
        platforms: userData?.socialMedia?.platforms || [],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error getting platforms:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
