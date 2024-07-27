import Models from "../Models";

export type ModelGroup = "real-estate" | "personal-log";

/**
 * Tables group controller
 */
export default class TablesGroupController {
    models: Models;
	groupName: ModelGroup;
    
    constructor(models: Models, groupName: ModelGroup) {
        this.models = models;
		this.groupName = groupName;
    }
    
	/**
	 * Models
	 * 
	 * Get models by given group name
	 * 
	 * tabnine is a blessing when it comes to this kind of repetitive code
	 */
	groupModels() {
		switch(this.groupName) {
            case "real-estate":
                return this.models.realEstateModels();
            case "personal-log":
                return this.models.personalLogModels();
            default:
                throw new Error(`Unknown group name: ${this.groupName}`);
        }
	}
	
    /**
     * Drop all good roots tables
     */
    async drop() {
        for(const model of this.groupModels().reverse()) {
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
        for(const model of this.groupModels()) {
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
