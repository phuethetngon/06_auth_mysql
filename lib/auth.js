import { SignJWT, jwtVerify } from "jose";

// jose needs the secret as bytes, not a plain string
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// create a signed token that expires in 1 hour
export function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

// return the payload if the token is valid, otherwise null
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null; // missing, tampered with, or expired
  }
}