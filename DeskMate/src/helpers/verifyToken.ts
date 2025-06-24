import { jwtDecode } from "jwt-decode"

interface JwtPayload {
    exp: number
    [key: string]: any
}

export function verifyToken(token: string): boolean {
    try {
        const decoded: JwtPayload = jwtDecode(token)
        const now = Math.floor(Date.now() / 1000)
        return decoded.exp > now
    } catch (err) {
        console.error("Invalid token", err)
        return false
    }
}
