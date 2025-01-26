import { initializeDotenv } from "../../env";
import Models from "../../Models";

/**
 * Test suite for role creation
 */
describe("User tests", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();

	const { Role, User, UserRoles } = models;

	beforeAll(async () => {
		const role = await Role.create({
			name: "test-role",
			description: "Test role",
		});
	});

	afterAll(async () => {
		// Explanation: I need to remove them one by one in order, otherwise, if I just wipe the whole table,
		// it would collide with other tests. As all test suites are run in parallel.

		// First remove relations
		// Get users
		const [user, user2, user3] = await Promise.all([
			User.findOne({ where: { email: "test1@example.com" } }),
			User.findOne({ where: { email: "test2@example.com" } }),
			User.findOne({ where: { email: "test3@example.com" } }),
		]);

		if (!user || !user2 || !user3) {
			throw Error(
				"The users that were being tested were not found in the database"
			);
		}

		// Remove relations by user id
		await Promise.all([
			UserRoles.destroy({ where: { userId: user.id } }),
			UserRoles.destroy({ where: { userId: user2.id } }),
			UserRoles.destroy({ where: { userId: user3.id } }),
		]);

		// Then remove roles and users
		await Promise.all([
			// Remove created role
			Role.destroy({ where: { name: "test-role" } }),
			// Remove created user
			User.destroy({
				where: { email: "test1@example.com" },
			}),
			User.destroy({
				where: { email: "test2@example.com" },
			}),
			User.destroy({
				where: { email: "test3@example.com" },
			}),
		]);
	});

	/**
	 * Test case: Assign role to user
	 */
	it("should assign role to user", async () => {
		const user = await User.create({
			name: "Test User",
			email: "test1@example.com",
			password: "password",
		});

		// Assign role to user
		await user.assignRole("test-role", UserRoles);

		// Verify role assignment
		const userRole = await UserRoles.findOne({
			where: { userId: user.id, roleName: "test-role" },
		});
		expect(userRole).not.toBeNull();
	});

	/**
	 * Test case: Prevent duplicate role assignment
	 */
	it("should not assign same role twice", async () => {
		const models = new Models();
		const user = await User.create({
			name: "Test User",
			email: "test2@example.com",
			password: "password",
		});

		// Assign role to user
		await user.assignRole("test-role", UserRoles);

		// Attempt to assign same role again
		await user.assignRole("test-role", UserRoles);

		// Verify only one role assignment exists
		const userRoles = await UserRoles.findAll({
			where: { userId: user.id, roleName: "test-role" },
		});
		expect(userRoles.length).toBe(1);
	});

	/**
	 * Test case: Prevent duplicate role assignment
	 */
	it("should not assign same role twice(search by user id)", async () => {
		const models = new Models();
		const user = await User.create({
			name: "Test User",
			email: "test3@example.com",
			password: "password",
		});

		// Assign role to user
		await user.assignRole("test-role", UserRoles);

		// Attempt to assign same role again
		await user.assignRole("test-role", UserRoles);

		// Verify only one role assignment exists
		const userRoles = await UserRoles.findAll({
			where: { userId: user.id },
		});
		expect(userRoles.length).toBe(1);
	});
});
