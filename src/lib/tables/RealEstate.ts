import Models from "../../Models";

/**
 * Real estate tables
 */
export default class RealEstateTables {
    models: Models;
    
    constructor(models: Models) {
        this.models = models;
    }
    
    /**
     * Get models ordered from highest dependent to lowest
     * 
     * @param models 
     * @returns 
     */
    orderedModels() {
        const models = this.models;
        
        // Ordered from higher dependency to lower
        const orderedModels = [
            models.generalPropertyInformation,
            
            // Dependents tier 3
            // Dependent on Property and User
            models.propertySellerMessage,
            models.propertyComment,
            models.propertyRating,
            models.userFavoriteProperty,
            
            // Dependents tier 2
            models.property,
            models.userMessages,
            models.userContactMethods,
            
            // Non-dependent
            models.category,
            models.price,
            models.user,
        ];
        
        return orderedModels;
    }
    /**
     * Drop all good roots tables
     */
    async drop() {
        for(const model of this.orderedModels()) {
            // The table may not exist
            try {
                await model.drop();
            } catch(err) { }
        }
    }
    
    /**
     * Create good roots tables
     */
    async create() {
        // We can't use conn.sync to create tables again, because sequelize kinda doesn't know what order are them
        // and it's my fault for not initializing all tables at once on the class.
        // Now we want the less dependent first, so we use reverse
        for(const model of this.orderedModels().reverse()) {
            console.log(`Create model: `, model);
            await model.sync();
        }
    }
    
    /**
     * Reset real estate tables
     */
    async reset() {
        await this.drop();
        await this.create();
    }
}
