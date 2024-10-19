import { Sequelize } from "sequelize";
import mysqlConn from "../../connection/mysqlConn";
import Role, { createRoleModel } from "../../model/user/Role";
import User, { createUserModel } from "../../model/user/User";
import UserRoles, { createUserRolesModel } from "../../model/user/UserRoles";
import short from "short-uuid";

/**
 * User roles models
 * 
 * This class is merely for testing purposes, it only uses three tables and their names are 
 * chosen randomly
 */
export default class UserRolesModels {
	connection: Sequelize;

	Role: typeof Role;
	User: typeof User;
	UserRoles: typeof UserRoles;

	constructor(options?: { connection: Sequelize }) {
		this.connection = (options && options.connection) ?? mysqlConn();

		// Generate random table names
		const randomSuffix = short.generate();

		// User tables
		this.Role = createRoleModel(this.connection, {
			tableName: `roles-${randomSuffix}`,
		});
		this.User = createUserModel(this.connection, {
			tableName: `users-${randomSuffix}`,
		});
		this.UserRoles = createUserRolesModel(
			this.connection,
			this.User,
			this.Role,
			{
				tableName: `user-roles-${randomSuffix}`,
			}
		);
	}

	/**
	 * Create tables
	 */
	async createTables() {
		await this.connection.sync();
	}

	/**
	 * Delete tables in order
	 */
	async deleteTables() {
		// Delete tables in reverse order to avoid foreign key constraints
		await this.UserRoles.drop();
		await this.User.drop();
		await this.Role.drop();
	}
}
