import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"

if (!process.env.JWT_SECRET) {
  throw new Error("Please add your JWT_SECRET to environment variables")
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = "7d"

export async function hashPassword(password: string) {
  return await hash(password, 10)
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  return await compare(plainPassword, hashedPassword)
}

export function generateToken(payload: any) {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { userId: string; email: string; name: string }
  } catch (error) {
    return null
  }
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return response
}

export function getAuthToken(request: NextRequest) {
  return request.cookies.get("auth_token")?.value
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
  return response
}

export function getUserFromRequest(request: NextRequest) {
  const token = getAuthToken(request)
  if (!token) return null

  return verifyToken(token)
}

// For client components
export function getAuthCookie() {
  const cookieStore = cookies()
  return cookieStore.get("auth_token")?.value
}
