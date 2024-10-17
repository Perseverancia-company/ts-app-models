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
	beforeAll(() => {
		initializeDotenv();
	});
	
	/**
	 * Test case: Create admin role
	 */
	it("should create admin role", async () => {
		// Initialize Models instance
		const models = new Models();

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
		// Initialize Models instance
		const models = new Models();

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
	beforeAll(() => {
		initializeDotenv();
	});
	
	/**
	 * Test case: Create admin user
	 */
	it("should create admin user", async () => {
		// Initialize Models instance
		const models = new Models();

		// Create admin user with name and description
		await createAdminUser(models, "Admin", "Admin description");

		// Verify admin user exists
		const adminUser = await models.User.findOne({
			where: { email: "admin@perseverancia.com.ar" },
		});
		expect(adminUser).not.toBeNull(); // Expect admin user to be created
		
		// Verify admin role assignment
		const adminRole = await models.Role.findOne({
			where: { name: "admin" },
		});
		
		// Validate them
		if(!adminUser) {
			throw Error("User not found");
		}
		if(!adminRole) {
			throw Error("Admin role not found");
		}
		
		const userRole = await models.UserRoles.findOne({
			where: { userId: adminUser.id, roleName: adminRole.name },
		});
		expect(userRole).not.toBeNull(); // Expect admin role to be assigned
	});

	/**
	 * Test case: Create normal user
	 */
	it("should create normal user", async () => {
		// Initialize Models instance
		const models = new Models();

		// Create normal user
		await createNormalUser(models);

		// Verify normal user exists
		const normalUser = await models.User.findOne({
			where: { email: "user@perseverancia.com.ar" },
		});
		expect(normalUser).not.toBeNull(); // Expect normal user to be created

		// Verify user role assignment
		const userRole = await models.Role.findOne({ where: { name: "user" } });
		
		// Validate them
		if(!normalUser) {
			throw Error("User not found");
		}
		if(!userRole) {
			throw Error("Admin role not found");
		}
		
		const userRoleAssignment = await models.UserRoles.findOne({
			where: { userId: normalUser.id, roleName: userRole.name },
		});
		expect(userRoleAssignment).not.toBeNull(); // Expect user role to be assigned
	});
});
