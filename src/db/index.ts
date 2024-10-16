// The [key: string]: any part is called an index signature. It indicates
// that the object can have any additional properties with string keys and values of any type.
export interface CustomUserWithRoles {
	roles: Array<string>;
	[key: string]: any;
}

/**
 * Check if user has admin role
 *
 * @param user
 * @returns
 */
export function narrowUserRole(user: CustomUserWithRoles) {
	// Check if user has roles
	if (!user.roles) {
		return "user";
	}

	// Find admin role
	const isAdmin = user.roles.some(
		(role: any) => role.name.toLowerCase() === "admin"
	);

	// Return role
	return isAdmin ? "admin" : "user";
}
