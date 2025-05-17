import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { comparePasswords, generateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()

    // Find user by email
    const user = await db.collection("users").findOne({ email })

    // Check if user exists and password is correct
    if (!user || !(await comparePasswords(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    // Create response with auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    )

    // Set auth cookie
    return setAuthCookie(response, token)
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
