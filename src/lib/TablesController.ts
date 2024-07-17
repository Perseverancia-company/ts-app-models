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
        } catch(err) {
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
        } catch(err) {
            console.log(`Drop table error`);
        }
    }
    
    // --- Drop and create models ---
    /**
     * Sync
     */
    async sync() {
        for(const model of this.modelManager.models()) {
            try {
                await model.sync();
            } catch(err: any) {
                console.log(`Couldn't sync model: `, model);
            }
        }
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
     * 
     * I don't know why db.drop doesn't work
     */
    async dropAll() {
        for(const model of this.modelManager.models().reverse()) {
            try {
                await model.drop();
            } catch(err) {
                console.log(`Couldn't drop model: `, model);
            }
        }
    }
}
