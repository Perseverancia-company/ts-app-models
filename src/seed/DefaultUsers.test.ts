import DefaultUsers from "./DefaultUsers";
import { initializeDotenv } from "../env";
import UserRolesModels from "../test/modelSet/UserRolesModels";

initializeDotenv();

/**
 * Test suite for role creation
 */
describe("Role creation", () => {
	// Create new instance otherwise table names will be the same
	const models = new UserRolesModels();

	// Initialize Models instance
	const defaultUsers = new DefaultUsers(models);

	beforeAll(async () => {
		await models.createTables();
	});

	afterAll(async () => {
		// console.log(`Delete tables`);
		await models.deleteTables();
	});

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
	// Create new instance otherwise table names will be the same
	const models = new UserRolesModels();

	// Initialize Models instance
	const defaultUsers = new DefaultUsers(models);

	beforeAll(async () => {
		await models.createTables();
	});

	afterAll(async () => {
		await models.deleteTables();
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

		if (!adminUser) {
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

		// No need to check user role assignment as it's implicit
		// Verify normal user exists
		const normalUser = await models.User.findOne({
			where: { email: "user@perseverancia.com.ar" },
		});
		expect(normalUser).not.toBeNull(); // Expect normal user to be created

		if (!normalUser) {
			throw Error("User not found");
		}
	});
});

/**
 * Test suite for user creation
 */
describe("Delete users and roles", () => {
	// Create new instance otherwise table names will be the same
	const models = new UserRolesModels();
	const { User } = models;

	// Initialize Models instance
	const defaultUsers = new DefaultUsers(models);

	beforeAll(async () => {
		await models.createTables();
		await defaultUsers.createDefaultUsers();
	});

	afterAll(async () => {
		await models.deleteTables();
	});

	/**
	 * Test case: Create admin user
	 */
	it("should create admin user", async () => {
		// Verify users exist
		const [normalUser, adminUser] = await Promise.all([
			User.findOne({
				where: { email: "user@perseverancia.com.ar" },
			}),
			User.findOne({
				where: { email: "admin@perseverancia.com.ar" },
			}),
		]);

		expect(adminUser).not.toBeNull();
		expect(normalUser).not.toBeNull();

		// Now delete users
		await defaultUsers.deleteUsersAndRoles();
		
		// Verify users ceased to exist
		const [normalUser1, adminUser1] = await Promise.all([
			User.findOne({
				where: { email: "user@perseverancia.com.ar" },
			}),
			User.findOne({
				where: { email: "admin@perseverancia.com.ar" },
			}),
		]);

		expect(normalUser1).toBeNull();
		expect(adminUser1).toBeNull();
	});
});
