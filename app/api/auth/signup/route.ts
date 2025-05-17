import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      // Initialize empty social media data
      socialMedia: {
        platforms: [],
        lastUpdated: new Date(),
      },
    })

    // Generate JWT token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email,
      name,
    })

    // Create response with auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: result.insertedId.toString(),
          name,
          email,
        },
      },
      { status: 201 },
    )

    // Set auth cookie
    return setAuthCookie(response, token)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
