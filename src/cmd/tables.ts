import MODEL from "../models/index";
import mysqlConn from "../connection/mysqlConn";
import printMysqlEnvironmentVariables from '../env/printMysqlEnvironmentVariables';

/**
 * Tables controller
 * 
 * To manage all tables
 */
class TablesController {
    db: any;
    
    constructor() {}
    
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
     * 
     * @returns {Array}
     */
    models() {
        const modelArray = [
            // Independent
            MODEL.User(),
            MODEL.DebugPropertyImageUpload(),
            MODEL.Category(),
            MODEL.Price(),
            
            // Dependents
            MODEL.Property(),
            MODEL.UserMessages(),
        ];
        
        return modelArray;
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

// Main
export default async function tablesMain(args: any) {
    if(args.reset_tables) {
        
        printMysqlEnvironmentVariables();
        
        const tablesController = new TablesController();
        
        await tablesController.initialize();
        await tablesController.dropAll();
        await tablesController.upAll();
    }
}
