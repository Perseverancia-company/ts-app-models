import { randomBytes } from "crypto";

/**
 * Helper function to generate a unique clientSecret
 */
export function generateRandomSecret() {
	return randomBytes(32).toString("hex");
}
