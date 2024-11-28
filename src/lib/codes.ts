import { randomBytes } from "crypto";

/**
 * Generate random secret
 */
export function generateRandomSecret() {
	return randomBytes(32).toString("hex");
}

/**
 * Generate authorization code
 */
export function generateAuthorizationCode() {
	return generateRandomSecret();
}

/**
 * Generate client secret
 */
export function generateClientSecret() {
	return generateRandomSecret();
}

/**
 * Generate refresh token
 */
export function generateRefreshToken() {
    return generateRandomSecret();
}

/**
 * Generate access token
 */
export function generateAccessToken() {
    return generateRandomSecret();
}
