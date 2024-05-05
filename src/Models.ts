import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import mysqlConn from "./connection/mysqlConn";

/**
 * Models
 * 
 * This class is to use the same connection to use models
 * Something that I haven't been doing, because I just didn't know.
 */
export default class Models {
    connection: Sequelize;
    
    app: any;
    appTag: any;
    appGroup: any;
    tagAppJunction: any;
    groupAppJunction: any;
    
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
        
        // These all are many to many relations
        // When I create the tables this does nothing, I don't know why
        app.belongsToMany(appTag, { through: 'tag-app-junction' });
        appTag.belongsToMany(app, { through: 'tag-app-junction' });
        app.belongsToMany(appGroup, { through: 'group-app-junction' });
        appGroup.belongsToMany(app, { through: 'group-app-junction' });
        
        // --- Junction tables ---
        const tagAppJunction = this.#tagAppJunction();
        const groupAppJunction = this.#groupAppJunction();
        
        this.tagAppJunction = tagAppJunction;
        this.groupAppJunction = groupAppJunction;
    }
    
    // --- Models ---
    // --- App manager ---
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
    
    // --- Real estate app ---
    /**
     * Category model
     */
    category() {
        const Model = this.connection.define("category", {
            id:{ 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            }
        }, {
            tableName: "category",
        });
        
        return Model;
    }
    
    /**
     * Debug property image upload
     */
    debugPropertyImageUpload() {
        const model = this.connection.define("debug-property-image-upload", {
            // This is for every entry, I need a bigger set, which will be the whole course of actions
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // Action course uuid
            // (because configuring auto increment to act however I want, it's kinda hard)
            actionCourseUuid: {
                // String instead of uuid
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Actions stage
            // 1) Frontend validation
            // 2) Folder creation and validation
            // 3) Backend validation
            // 4) Endpoint finishing touches
            actionStage: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            // Action type
            // 'validate_image_size'
            action: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Image information
            // Array is not available in MySQL
            imageNames: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            // State information
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // 1) Normal
            // 2) Success
            // 3) Warning
            // 4) Error
            // 5) Notification
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            tableName: "debug-property-image-upload",
        });
        
        return model;
    }
    
    /**
     * Price
     */
    price() {
        // This creates a new connection each time, we have to take a reference
        const Model = this.connection.define("price", {
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            }
        }, {
            tableName: "price",
        });
        
        return Model;
    }
    
    /**
     * Property
     */
    property() {
        const model = this.connection.define("property", {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            parking: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            street: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            published: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            tableName: "property",
        });
        
        model.belongsTo(this.user());
        model.belongsTo(this.category());
        model.belongsTo(this.price());
        
        return model;
    }
    
    /**
     * User
     */
    user() {
        const TABLE_NAME = "user";
        
        const model: any = mysqlConn().define(TABLE_NAME, {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: DataTypes.STRING,
            confirmedEmail: DataTypes.BOOLEAN,
        }, {
            tableName: TABLE_NAME,
            hooks: {
                // Before creating the user on the database
                beforeCreate: async function(user: any) {
                    // Hash the password
                    const salt = await bcrypt.genSalt(10);
                    
                    console.log(`User password: ${user.password}`);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            scopes: {
                // Should be called something else like
                // 'frontend'
                deletePassword: {
                    attributes: {
                        exclude: [
                            "password",
                            "token",
                        ]
                    }
                }
            }
        });

        // Personalized methods
        model.prototype.verifyPassword = function(password: string) {
            return bcrypt.compareSync(password, this.password);
        }
        
        return model;
    }
    
    /**
     * User messages
     */
    userMessages() {
        const model = this.connection.define("user-messages", {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            tableName: "user-messages",
        });
        
        model.belongsTo(this.user());
        
        return model;
    }
}
