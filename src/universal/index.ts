/**
 * Universal models
 *
 * I was wondering what to name this type of models, "Universal models" or "Alloy models"
 *
 * These models are supposed to use any database driver, and on top of that, these would provide unified
 * functions.
 * 
 * The point of unified functionality is to provide a consistent interface for operations, in many projects.
 */
export type DatabaseDriver =
	| "mysql"
	| "sqlite"
	| "postgres"
	| "mongodb"
	| "couchdb";

/**
 * Abstract Base Class for Universal Models
 */
export default abstract class AbstractUniversalModel {
	// The database driver type (e.g., MySQL, SQLite, etc.)
	protected databaseDriver: DatabaseDriver;
	ormModel: any;

	// Constructor to initialize the database driver type
	constructor(databaseType: DatabaseDriver, ormModel: any) {
		this.databaseDriver = databaseType;
		this.ormModel = ormModel;
	}

	/**
	 * Save a record to the database.
	 * Provides a unified method for saving data across different databases.
	 */
	abstract save(record: object): Promise<void>;

	/**
	 * Find a record by ID.
	 * Unifies how records are queried based on their primary keys.
	 */
	abstract findById(id: string | number): Promise<object | null>;

	/**
	 * Update a record in the database.
	 */
	abstract update(id: string | number, updates: object): Promise<void>;

	/**
	 * Delete a record from the database.
	 */
	abstract delete(id: string | number): Promise<void>;
}
