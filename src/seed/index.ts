import { accessToken } from "../env";
import Models from "../Models";

/**
 * Create admin role
 */
export async function createAdminRole(models: Models) {
	// Create admin role
	const Role = models.Role;
	let adminRole = await Role.findOne({
		where: {
			name: "admin",
		},
	});

	if (!adminRole) {
		adminRole = await Role.create({
			name: "admin",
			description: "Admin role",
		});
	}

	return adminRole;
}

/**
 * Create user role
 */
export async function createUserRole(models: Models) {
	// Create admin role
	const Role = models.Role;
	let userRole = await Role.findOne({
		where: {
			name: "user",
		},
	});
	if (!userRole) {
		userRole = await Role.create({
			name: "user",
			description: "User role",
		});
	}

	return userRole;
}

/**
 * Create admin user in the database
 *
 * The access token is the password of the user
 * Also create admin role
 */
export async function createAdminUser(models: Models) {
	// Get access token
	const token = accessToken();
	if (!token) {
		throw Error("Access token is required");
	}

	// Create admin user
	const User = models.User;
	const user = {
		name: "Admin",
		email: "admin@perseverancia.com.ar",
		password: token,
		confirmedEmail: true,
	};

	// Run queries
	let [adminRole, adminUser] = await Promise.all([
		createAdminRole(models),
		User.findOne({
			where: {
				email: user.email,
			},
			raw: true,
		}),
	]);

	if (!adminUser) {
		adminUser = await User.create(user);
	}

	// Admin role
	if (!adminRole) {
		throw Error("Couldn't fetch admin role");
	}

	// Now assign admin role
	if (adminRole && adminUser) {
		const UserRoles = models.UserRoles;

		await UserRoles.create({
			userId: adminUser.id,
			roleName: adminRole.name,
		}).catch((err) => {
			throw Error(err);
		});
	}
}

/**
 * Create normal user
 */
export async function createNormalUser(models: Models) {
	createUserRole(models);

	// Create admin user
	const User = models.User;
	const user = {
		name: "User",
		email: "user@perseverancia.com.ar",
		password: "Abcd123$",
		confirmedEmail: true,
	};
	const userExists = await User.findOne({
		where: {
			email: user.email,
		},
	});
	if (!userExists) {
		User.create(user);
	}
}
