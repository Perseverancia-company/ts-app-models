import { Sequelize, DataTypes } from "sequelize";

import mysqlConn from "./connection/mysqlConn";
import User, { createUserModel } from "./model/User";
import Category, { createCategoryModel } from "./model/Category";
import Price, { createPriceModel } from "./model/Price";
import UserMessages, { createUserMessagesModel } from "./model/UserMessages";
import Property, { createPropertyModel } from "./model/Property";
import UserContactMethods, { createUserContactMethods } from "./model/UserContactMethods";
import DebugPropertyImageUpload, { createDebugPropertyImageUpload } from "./model/DebugPropertyImageUpload";
import PropertySellerMessage, { createPropertySellerMessage } from "./model/PropertySellerMessage";
import PropertyComment, { createPropertyComment } from "./model/PropertyComment";
import PropertyRating, { createPropertyRating } from "./model/PropertyRating";
import UserFavoriteProperty, { createUserFavoriteProperty } from "./model/UserFavoriteProperty";
import GeneralPropertyInformation, { createGeneralPropertyInformationModel } from "./model/GeneralPropertyInformation";

/**
 * Models
 * 
 * This class is to use the same connection to use models
 * Something that I haven't been doing, because I just didn't know.
 */
export default class Models {
    connection: Sequelize;
    
    // App manager tables
    app: any;
    appGroup: any;
    appOutput: any;
    appTag: any;
    tagAppJunction: any;
    groupAppJunction: any;
    
    // User tables
    user: typeof User;
    
    // Real estate tables
    category: typeof Category;
    price: typeof Price;
    userMessages: typeof UserMessages;
    property: typeof Property;
    userContactMethods: typeof UserContactMethods;
    debugPropertyImageUpload: typeof DebugPropertyImageUpload;
    propertySellerMessage: typeof PropertySellerMessage;
    propertyComment: typeof PropertyComment;
    propertyRating: typeof PropertyRating;
    userFavoriteProperty: typeof UserFavoriteProperty;
    generalPropertyInformation: typeof GeneralPropertyInformation;
    
    /**
     * Constructor
     */
    constructor() {
        this.connection = mysqlConn();
        
        // I'm just realizing it now
        // All models have to be initialized at once and be kept on memory
        // I thought it wasn't like that for some reason, but we can keep some in 'spawn when needed'
        const app = this.#app();
        const appTag = this.#appTag();
        const appGroup = this.#appGroup();
        // We've got to declare this before the junction models
        this.app = app;
        this.appTag = appTag;
        this.appGroup = appGroup;
        
        // --- Junction tables ---
        const tagAppJunction = this.#tagAppJunction();
        const groupAppJunction = this.#groupAppJunction();
        
        this.appOutput = this.#appOutput();
        this.tagAppJunction = tagAppJunction;
        this.groupAppJunction = groupAppJunction;
        
        // --- User tables ---
        const user = createUserModel(this.connection);
        this.user = user;
        
        // --- Real estate ---
        const category = createCategoryModel(this.connection);
        const price = createPriceModel(this.connection);
        this.category = category;
        this.price = price;
        
        // Dependents
        const userMessages = createUserMessagesModel(this.connection, this.user);
        const property = createPropertyModel(this.connection, this.user, this.category, this.price);
        const userContactMethods = createUserContactMethods(this.connection, this.user);
        this.userMessages = userMessages;
        this.property = property;
        this.userContactMethods = userContactMethods;
        
        // Dependents level 2
        const debugPropertyImageUpload = createDebugPropertyImageUpload(this.connection, this.property);
        const propertySellerMessage = createPropertySellerMessage(this.connection, this.user, this.property);
        const propertyComment = createPropertyComment(this.connection, this.user, this.property);
        const propertyRating = createPropertyRating(this.connection, this.user, this.property);
        const userFavoriteProperty = createUserFavoriteProperty(this.connection, this.user, this.property);
        this.debugPropertyImageUpload = debugPropertyImageUpload;
        this.propertySellerMessage = propertySellerMessage;
        this.propertyComment = propertyComment;
        this.propertyRating = propertyRating;
        this.userFavoriteProperty = userFavoriteProperty;
        
        // Dependents level 3
        const generalPropertyInformation = createGeneralPropertyInformationModel(
            this.connection,
            this.property,
            this.propertySellerMessage,
            this.propertyRating,
            this.propertyComment
        );
        this.generalPropertyInformation = generalPropertyInformation;
    }
    
    // --- Models ---
    // --- App manager ---
    
    /**
     * App output
     */
    #appOutput() {
        const TABLE_NAME = "app-output";
        const appOutput = this.connection.define(TABLE_NAME, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            appName: { 
                allowNull: false,
                type: DataTypes.STRING(128),
                references: {
                    model: this.app,
                    key: 'name'
                }
            },
            output: { 
                allowNull: false,
                type: DataTypes.TEXT,
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return appOutput;
    }
    
    /**
     * Group app junction table
     */
    #groupAppJunction() {
        const TABLE_NAME = "group-app-junction";
        const tagAppJunction = this.connection.define(TABLE_NAME, {
            appName: { 
                allowNull: false,
                type: DataTypes.STRING(128),
                references: {
                    model: this.app,
                    key: 'name'
                }
            },
            groupId: { 
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: this.appGroup,
                    key: 'id'
                }
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return tagAppJunction;
    }
    
    /**
     * Tag app junction table
     * 
     * I don't know belongs to many wasn't working so I had to make it myself.
     */
    #tagAppJunction() {
        const TABLE_NAME = "tag-app-junction";
        const tagAppJunction = this.connection.define(TABLE_NAME, {
            appName: { 
                allowNull: false,
                type: DataTypes.STRING(128),
                references: {
                    model: this.app,
                    key: 'name'
                }
            },
            appTagName: { 
                allowNull: false,
                type: DataTypes.STRING(128),
                references: {
                    model: this.appTag,
                    key: 'name'
                }
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return tagAppJunction;
    }
    
    /**
     * App tags
     * 
     * Because there are no arrays in MySQL
     */
    #appTag() {
        const TABLE_NAME = "app-tag";
        const appTag = this.connection.define(TABLE_NAME, {
            name: { 
                primaryKey: true,
                type: DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return appTag;
    }
    
    /**
     * App group
     * 
     * A single group can have many apps
     */
    #appGroup() {
        const TABLE_NAME = "app-group";
        const groupModel = this.connection.define(TABLE_NAME, {
            id:{ 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            // Name of the group like 'Real estate'(for my good roots stack)
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return groupModel;
    }
    
    /**
     * App information
     */
    #app() {
        const TABLE_NAME = "app";
        const appModel = this.connection.define(TABLE_NAME, {
            // Name like 'authentication' or 'real-estate'
            // Indirect relation with 'process' table
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                primaryKey: true,
            },
            // App path
            path: {
                type: DataTypes.STRING(2 ** 12),
            },
            // TODO: This has to be a table
            // App type
            // 1) application
            // Normal app, for end users
            // 2) server
            // A backend server
            // 3) frontend
            // A frontend server
            // 4) daemon
            appType: {
                type: DataTypes.STRING(64),
                allowNull: false,
                defaultValue: "server",
            },
        }, {
            tableName: TABLE_NAME,
        });
        
        return appModel;
    }
    
    /**
     * Process model
     * 
     * Store apps process informaiton
     * 
     * - Process are identified by a unique name
     * With this simple rule you can start the same app, for example,
     * with different arguments and it will still work if you provide a different name
     */
    process() {
        const TABLE_NAME = "process";
        const model = this.connection.define(TABLE_NAME, {
            // Name like 'authentication' or 'real-estate'
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                primaryKey: true,
            },
            pid: {
                type: DataTypes.INTEGER,
            },
            // URL if it's a server
            url: {
                type: DataTypes.STRING(256),
            },
            // App type
            // 1) application
            // Normal app, for end users
            // 2) server
            // A backend server
            // 3) frontend
            // A frontend server
            // 4) daemon
            appType: {
                type: DataTypes.STRING(64),
                allowNull: false,
                defaultValue: "server",
            }
        }, {
            tableName: TABLE_NAME,
        });
        
        return model;
    }
}
