import { initializeDotenv } from "../../env";
import Models from "../../Models";

/**
 * Test suite for role creation
 */
describe("Role creation", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();

	const { Role, User, UserRoles } = models;

	beforeAll(async () => {
		try {
			const role = await Role.create({
				name: "test-role-4",
				description: "Test role",
			});
		} catch (err) {
			// Already exists
		}
	});

	afterAll(async () => {
		// Explanation: I need to remove them one by one in order, otherwise, if I just wipe the whole table,
		// it would collide with other tests. As all test suites are run in parallel.

		// First remove relations
		// Get users
		const [user] = await Promise.all([
			User.findOne({ where: { email: "test4@example.com" } }),
		]);

		if (!user) {
			throw Error(
				"The users that were being tested were not found in the database"
			);
		}

		// Remove relations by user id
		await Promise.all([UserRoles.destroy({ where: { userId: user.id } })]);

		// Then remove roles and users
		await Promise.all([
			// Remove created role
			Role.destroy({ where: { name: "test-role-4" } }),
			// Remove created user
			User.destroy({
				where: { email: "test4@example.com" },
			}),
		]);
	});

	/**
	 * Test case: Assign role to user
	 */
	it("should assign role to user", async () => {
		const user = await User.create({
			name: "Test User",
			email: "test4@example.com",
			password: "password",
		});

		// Assign role to user
		const roleAssociation = await user.assignRole("test-role-4", UserRoles);

		// Verify role assignment
		const userRole = await UserRoles.findOne({
			where: { userId: user.id },
			include: [{ model: Role }],
		});

		expect(userRole).not.toBeNull();
	});
});
