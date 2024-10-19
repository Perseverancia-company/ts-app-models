import DefaultUsers from "./DefaultUsers";
import { initializeDotenv } from "../env";
import UserRolesModels from "../test/modelSet/UserRolesModels";

/**
 * Test suite for role creation
 */
describe("Role creation", () => {
	initializeDotenv();
	const models = new UserRolesModels();
	
	// Initialize Models instance
	const defaultUsers = new DefaultUsers(models);
	
	beforeAll(async () => {
		await models.createTables();
	});
	
	afterAll(async () => {
		console.log(`Delete tables`);
		await models.deleteTables();
	})
	
	/**
	 * Test case: Create admin role
	 */
	it("should create admin role", async () => {
		// Create admin role
		await defaultUsers.createAdminRole();

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
		await defaultUsers.createUserRole();

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
	const models = new UserRolesModels();
	
	// Initialize Models instance
	const defaultUsers = new DefaultUsers(models);

	afterAll(async () => {
		// Delete everything
		await defaultUsers.deleteUsersAndRoles();
	});

	/**
	 * Test case: Create admin user
	 */
	it("should create admin user", async () => {
		// Create admin user
		await defaultUsers.createAdminUser();

		// Verify admin user exists
		const adminUser = await models.User.findOne({
			where: { email: "admin@perseverancia.com.ar" },
		});
		expect(adminUser).not.toBeNull(); // Expect admin user to be created
		
		if(!adminUser) {
			throw Error("Admin user not found");
		}

		// Verify admin role assignment
		const userRole = await models.UserRoles.findOne({
			where: { userId: adminUser.id, roleName: "admin" },
		});
		expect(userRole).not.toBeNull(); // Expect admin role to be assigned
	});

	/**
	 * Test case: Create normal user
	 */
	it("should create normal user", async () => {
		// Create normal user
		await defaultUsers.createNormalUser();

		// Verify normal user exists
		const normalUser = await models.User.findOne({
			where: { email: "user@perseverancia.com.ar" },
		});
		expect(normalUser).not.toBeNull(); // Expect normal user to be created
		
		if(!normalUser) {
			throw Error("User not found");
		}

		// Verify user role assignment
		const userRole = await models.UserRoles.findOne({
			where: { userId: normalUser.id, roleName: "user" },
		});
		expect(userRole).not.toBeNull(); // Expect user role to be assigned
	});
});
