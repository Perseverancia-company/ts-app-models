import { accessToken } from "../env";
import Models from "../Models";
import UserRolesModels from "../test/modelSet/UserRolesModels";

/**
 * Default users
 */
export default class DefaultUsers {
	models: Models | UserRolesModels;

	constructor(models: Models | UserRolesModels) {
		this.models = models;
	}

	/**
	 * Delete admin and user
	 */
	async deleteUsersAndRoles() {
		const emails = [
			"admin@perseverancia.com.ar",
			"user@perseverancia.com.ar",
		];

		// Find users
		const users = await Promise.all(
			emails.map((email) =>
				this.models.User.findOne({ where: { email } })
			)
		);

		// Check if users exist
		if (!users.every((user) => user)) {
			throw Error(
				"The users that were being tested were not found in the database"
			);
		}

		// Remove UserRoles relations first
		await Promise.all(
			users.map((user) =>
				user
					? this.models.UserRoles.destroy({
							where: { userId: user.id },
					  })
					: Promise.resolve()
			)
		);

		// Then remove users and roles
		await Promise.all([
			...emails.map((email) =>
				this.models.User.destroy({ where: { email } })
			),
			this.models.Role.destroy({ where: { name: "admin" } }),
			this.models.Role.destroy({ where: { name: "user" } }),
		]);
	}

	/**
	 * Create admin role
	 */
	async createAdminRole() {
		const Role = this.models.Role;
		let adminRole = await Role.findOne({ where: { name: "admin" } });

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
	async createUserRole() {
		const Role = this.models.Role;
		let userRole = await Role.findOne({ where: { name: "user" } });

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
	async createAdminUser() {
		// Get access token
		const token = accessToken();
		if (!token) {
			throw Error("Access token is required");
		}

		// User
		const User = this.models.User;
		const user = {
			name: "Admin",
			email: "admin@perseverancia.com.ar",
			password: token,
			confirmedEmail: true,
		};

		// Find user and create admin role
		let [adminUser, adminRole] = await Promise.all([
			User.findOne({
				where: { email: user.email },
			}),
			this.createAdminRole(),
		]);
		
		// If admin user doesn't exists, create it
		if (!adminUser) {
			adminUser = await User.create(user);
		}

		// Assign admin role
		const UserRoles = this.models.UserRoles;
		const existingRoleAssignment = await UserRoles.findOne({
			where: { userId: adminUser.id, roleName: adminRole.name },
		});

		if (!existingRoleAssignment) {
			await UserRoles.create({
				userId: adminUser.id,
				roleName: adminRole.name,
			});
		}
	}

	/**
	 * Create normal user
	 *
	 * No need to assign user role to user as it's implicit
	 */
	async createNormalUser() {
		await this.createUserRole();

		const User = this.models.User;
		const user = {
			name: "User",
			email: "user@perseverancia.com.ar",
			password: "Abcd123$",
			confirmedEmail: true,
		};

		const userExists = await User.findOne({ where: { email: user.email } });
		if (!userExists) {
			await User.create(user);
		}
	}
}
