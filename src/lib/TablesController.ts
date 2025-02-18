import { Sequelize } from "sequelize";
import Models from "../Models";

/**
 * Tables controller
 *
 * To manage all tables
 *
 * Be careful when using this!
 */
export default class TablesController {
	db: Sequelize;
	modelManager: Models;

	constructor(models: Models) {
		this.modelManager = models;
		this.db = this.modelManager.connection;
	}

	/**
	 * Initialize
	 */
	async initialize() {
		// const db = mysqlConn();
		// console.log(`Tables db connection`);

		// Authenticate
		await this.db.authenticate();
		console.log(`Authenticated`);

		return this;
	}

	/**
	 * Create tables
	 */
	async upAll() {
		try {
			// Create tables
			// db.sync doesn't seems to work
			await this.createAll();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * Drop all tables
	 */
	async downAll() {
		try {
			// This should drop everything in cascade
			await this.db.drop();

			console.log(`Tables down`);
		} catch (err) {
			console.log(`Drop table error`);
		}
	}

	// --- Drop and create models ---
	/**
	 * Sync
	 */
	async sync() {
		// Sync connection first
		this.modelManager.connection.sync();

		// This is unnecessary
		// Synchronize models in order
		// const models = this.modelManager.models();
		// for(const model of models) {
		//     try {
		//         await model.sync();
		//     } catch(err: any) {
		//         console.log(`Couldn't sync model: `, model);
		//     }
		// }
	}

	/**
	 * Forcefully synchronize the database
	 */
	async forceSync() {
		await this.db.sync({ force: true });
	}

	/**
	 * Create all
	 *
	 * Alias for sync
	 */
	async createAll() {
		return await this.sync();
	}

	/**
	 * Drop all tables
	 */
	async dropAll() {
		const models = this.modelManager.models().reverse();
		console.log(`Models: `, models);
		for (const model of models) {
			try {
				await model.drop();
				console.log(`Dropped model: `, model);
			} catch (err) {
				console.log(`Couldn't drop model: `, model);
				// console.error(err);
			}
		}
	}
}
