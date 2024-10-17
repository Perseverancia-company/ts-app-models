/**
 * Import role and user creation functions
 */
import {
	createAdminRole,
	createUserRole,
	createAdminUser,
	createNormalUser,
} from ".";
import { initializeDotenv } from "../env";

/**
 * Import Models class
 */
import Models from "../Models";

/**
 * Test suite for role creation
 */
describe("Role creation", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();

	beforeAll(() => {});

	/**
	 * Test case: Create admin role
	 */
	it("should create admin role", async () => {
		// Create admin role
		await createAdminRole(models);

		// Verify admin role exists
		const adminRole = await models.Role.findOne({
			where: { name: "admin" },
		});
		expect(adminRole).not.toBeNull(); // Expect admin role to be created
	});

	/**
	 * Test case: Create user role
	 */
	it("should create user role", async () => {
		// Create user role
		await createUserRole(models);

		// Verify user role exists
		const userRole = await models.Role.findOne({ where: { name: "user" } });
		expect(userRole).not.toBeNull(); // Expect user role to be created
	});
});

/**
 * Test suite for user creation
 */
describe("User creation", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();

	beforeAll(() => {});

	afterAll(async () => {
		// Delete everything
	});

	/**
	 * Test case: Create admin user
	 */
	it("should create admin user", async () => {
		// Create admin user with name and description
		await createAdminUser(models);

		// Verify normal user exists
		const { User, Role, UserRoles } = models;
		const [adminUser, adminRole] = await Promise.all([
			User.findOne({
				where: { email: "admin@perseverancia.com.ar" },
			}),
			Role.findOne({
				where: { name: "admin" },
			}),
		]);
		expect(adminUser).not.toBeNull(); // Expect normal user to be created
		expect(adminRole).not.toBeNull(); // Expect user role to be created

		// Validate them
		if (!adminUser) {
			throw Error("User not found");
		}
		if (!adminRole) {
			throw Error("Admin role not found");
		}

		// Prevent re-assigning a role
		// Assign role
		let adminRoleAssigned = await UserRoles.findOne({
			where: { userId: adminUser.id, roleName: adminRole.name },
			raw: true,
		});

		// If the user doesn't have this role assigned, do it
		if (!adminRoleAssigned) {
			// Assign roles
			await UserRoles.create({
				userId: adminUser.id,
				roleName: adminRole.name,
			});
		}

		adminRoleAssigned = await UserRoles.findOne({
			where: { userId: adminUser.id, roleName: adminRole.name },
		});

		expect(adminRoleAssigned).not.toBeNull(); // Expect admin role to be assigned

		if (!adminRoleAssigned) {
			return;
		}

		expect(adminRoleAssigned.roleName).toBe("admin"); // Expect admin role to be assigned
	});

	/**
	 * Test case: Create normal user
	 */
	it("should create normal user", async () => {
		// Create normal user
		await createNormalUser(models);

		// Verify normal user exists
		const { User, Role, UserRoles } = models;
		const [normalUser, userRole] = await Promise.all([
			User.findOne({
				where: { email: "user@perseverancia.com.ar" },
			}),
			Role.findOne({ where: { name: "user" } }),
		]);
		expect(normalUser).not.toBeNull(); // Expect normal user to be created
		expect(userRole).not.toBeNull(); // Expect user role to be created

		// Validate them
		if (!normalUser) {
			throw Error("User not found");
		}
		if (!userRole) {
			throw Error("Admin role not found");
		}

		// Prevent re-assigning a role
		// Assign role
		const userRoleAssignment = await UserRoles.findOne({
			where: { userId: normalUser.id, roleName: userRole.name },
		});

		// If the user doesn't have this role assigned, do it
		if (!userRoleAssignment) {
			// Assign roles
			await UserRoles.create({
				userId: normalUser.id,
				roleName: userRole.name,
			});
		}

		const newRole = await UserRoles.findOne({
			where: { userId: normalUser.id, roleName: userRole.name },
		});

		expect(newRole).not.toBeNull(); // Expect user role to be assigned

		if (!newRole) {
			return;
		}

		expect(newRole.roleName).toBe("user"); // Expect admin role to be assigned
	});
});
