import mysqlConn from "../connection/mysqlConn";
import printMysqlEnvironmentVariables from '../env/printMysqlEnvironmentVariables';
import Models from "../Models";

/**
 * Tables controller
 * 
 * To manage all tables
 */
class TablesController {
    db: any;
    modelManager: any;
    
    constructor() {
        // Create connection
        this.modelManager = new Models();
    }
    
    /**
     * Initialize
     */
    async initialize() {
        const db = mysqlConn();
        console.log(`Tables db connection`);
        
        // Authenticate
        await db.authenticate();
        console.log(`Authenticated`);
        
        this.db = db;
        
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
     */
    models() {
        const modelArray = [
            // Independent
            this.modelManager.app(),
            this.modelManager.process(),
            this.modelManager.user(),
            this.modelManager.debugPropertyImageUpload(),
            this.modelManager.category(),
            this.modelManager.price(),
            
            // Dependents
            this.modelManager.property(),
            this.modelManager.userMessages(),
        ];
        
        return modelArray;
    }
    
    /**
     * Sync
     */
    async sync() {
        this.models();
        await this.sync();
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
            }
        }
    }
}

/**
 * Reset tables
 */
export async function resetTables() {
    printMysqlEnvironmentVariables();
    
    const tablesController = new TablesController();
    
    await tablesController.initialize();
    await tablesController.dropAll();
    await tablesController.upAll();
}

/**
 * Tables main
 * 
 * @param args 
 */
export default async function tablesMain(args: any) {
    if(args.db_sync) {
        const tc = new TablesController();
        await tc.sync();
    }
    
    if(args.up_all) {
        printMysqlEnvironmentVariables();
        
        const tc = new TablesController();
        await tc.initialize();
        await tc.upAll();
    }
    
    if(args.reset_tables) {
        await resetTables();
    }
}
