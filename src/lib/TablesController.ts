import { Sequelize } from "sequelize";
import Models from "../Models";

/**
 * Tables controller
 * 
 * To manage all tables
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
     * Models from high independence to low independence
     * 
     * This is missing a lot of tables, the reason is that I'm not using it right now.
     * When I need it I'll update it.
     */
    models() {
        const app = this.modelManager.app;
        
        const modelArray = [
            // Independent
            app,
            this.modelManager.appTag,
            this.modelManager.appGroup,
            this.modelManager.process(),
            this.modelManager.user,
            this.modelManager.debugPropertyImageUpload,
            this.modelManager.category,
            this.modelManager.price,
            
            // Dependents
            this.modelManager.property,
            this.modelManager.userMessages,
            this.modelManager.tagAppJunction,
            this.modelManager.groupAppJunction,
            this.modelManager.appOutput,
        ];
        
        return modelArray;
    }
    
    /**
     * Sync
     */
    async sync() {
        for(const model of this.models()) {
            try {
                await model.sync();
            } catch(err) {
                console.log(`Couldn't sync model: `, model);
            }
        }
    }
    
    /**
     * Drop all tables
     * 
     * I don't know why db.drop doesn't work
     */
    async dropAll() {
        for(const model of this.models().reverse()) {
            try {
                await model.drop();
            } catch(err) {
                console.log(`Couldn't drop model: `, model);
            }
        }
    }
    
    /**
     * Create all
     */
    async createAll() {
        for(const model of this.models()) {
            try {
                await model.sync();
            } catch(err) {
                console.log(`Couldn't sync model: `, model);
                console.error(err);
            }
        }
    }
}
