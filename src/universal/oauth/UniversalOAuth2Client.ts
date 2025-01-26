import { v4 as uuidv4 } from "uuid";

import AbstractUniversalModel, { DatabaseDriver } from "..";
import { generateClientSecret } from "../../lib/codes";

export interface RequiredOAuth2ClientFields {
	name: string;
	authorizedOrigins?: string;
	authorizedRedirects?: string;
	grantTypes?: string;
	authorizationScopes: string;
}

/**
 * Universal OAuth2 client
 */
export default class UniversalOAuth2Client extends AbstractUniversalModel {
	constructor(databaseType: DatabaseDriver, ormModel: any) {
		super(databaseType, ormModel); // Pass the database type and ORM model to the parent class
	}

	/**
	 * Create a new universal OAuth2 client
	 * 
	 * Different than save, this one will assign automatically a client id and a secret
	 */
	async create(data: RequiredOAuth2ClientFields) {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					// Generate client ID and secret
					const clientId = uuidv4();
			
					// The client secret can only be seen once when generated
					const clientSecret = generateClientSecret();
			
					// Create new OAuth2Client instance
					const client = await this.ormModel.create({
						clientId,
						clientSecret,
						...data,
					});
					return client;
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to save record: ${error.message}`);
		}
	}

	/**
	 * Save a record to the database.
	 * @param record - The record to be saved.
	 */
	async save(record: object): Promise<void> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					await this.ormModel.create(record);
					break;
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to save record: ${error.message}`);
		}
	}

	/**
	 * Find a record by ID.
	 * @param id - The ID of the record to find.
	 * @returns The found record or null if not found.
	 */
	async findById(id: string | number): Promise<object | null> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					return await this.ormModel.findByPk(id);
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to find record by ID: ${error.message}`);
		}
	}

	/**
	 * Update a record in the database.
	 * @param id - The ID of the record to update.
	 * @param updates - The fields to update.
	 */
	async update(id: string | number, updates: object): Promise<void> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					const record = await this.ormModel.findByPk(id);
					if (!record) {
						throw new Error(`Record with ID ${id} not found.`);
					}
					await record.update(updates);
					break;
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to update record: ${error.message}`);
		}
	}

	/**
	 * Delete a record from the database.
	 * @param id - The ID of the record to delete.
	 */
	async delete(id: string | number): Promise<void> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					const record = await this.ormModel.findByPk(id);
					if (!record) {
						throw new Error(`Record with ID ${id} not found.`);
					}
					await record.destroy();
					break;
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to delete record: ${error.message}`);
		}
	}

	/**
	 * Specialized method to retrieve a token by client ID.
	 * @param clientId - The OAuth2 client ID.
	 * @returns The OAuth2 client record or null if not found.
	 */
	async findByClientId(clientId: string): Promise<object | null> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					return await this.ormModel.findOne({ where: { clientId } });
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to find client by ID: ${error.message}`);
		}
	}

	/**
	 * Revoke a token by token value.
	 * @param token - The token to revoke.
	 */
	async revokeToken(token: string): Promise<void> {
		try {
			switch (this.databaseDriver) {
				case "mysql":
					const record = await this.ormModel.findOne({
						where: { token },
					});
					if (!record) {
						throw new Error(`Token not found.`);
					}
					await record.destroy();
					break;
				default:
					throw new Error("Unsupported database driver");
			}
		} catch (error: any) {
			throw new Error(`Failed to revoke token: ${error.message}`);
		}
	}
}
