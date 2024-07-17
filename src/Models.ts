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
import Job, { createJobModel } from "./model/Job";
import Address, { createAddressModel } from "./model/Address";
import Groups, { createGroupsModel } from "./model/Groups";
import Meeti, { createMeetiModel } from "./model/Meeti";
import MeetiParticipants, { createMeetiParticipantsModel } from "./model/MeetiParticipants";
import Comment, { createCommentModel } from "./model/Comment";
import Product, { createProductModel } from "./model/Product";
import Invoice, { createInvoiceModel } from "./model/Invoice";
import InvoiceProductJunction, { createInvoiceProductJunctionModel } from "./model/InvoiceProductJunction";
import Company, { createCompanyModel } from "./model/Company";
import SocialCategory, { createSocialCategoryModel } from "./model/SocialCategory";

/**
 * Models
 * 
 * This class is to use the same connection to use models
 * Something that I haven't been doing, because I just didn't know.
 */
export default class Models {
    connection: Sequelize;
    
	// The order that is shown here is the correct order of creation
	// And for destruction the reverse of this order
    // Independent tables
    user: typeof User;
	address: typeof Address;
	
	// User tables
    userContactMethods: typeof UserContactMethods;
    
    // App manager tables
    app: any;
    appGroup: any;
    appOutput: any;
	process: any;
    appTag: any;
    tagAppJunction: any;
    groupAppJunction: any;
    
    // Real estate tables
    category: typeof Category;
    price: typeof Price;
    userMessages: typeof UserMessages;
    property: typeof Property;
    debugPropertyImageUpload: typeof DebugPropertyImageUpload;
    propertySellerMessage: typeof PropertySellerMessage;
    propertyComment: typeof PropertyComment;
    propertyRating: typeof PropertyRating;
    userFavoriteProperty: typeof UserFavoriteProperty;
    generalPropertyInformation: typeof GeneralPropertyInformation;
    
    // Jobs tables
	company: typeof Company;
    job: typeof Job;
	
	// Meetup tables
	socialCategory: typeof SocialCategory;
	groups: typeof Groups;
	meeti: typeof Meeti;
	meetiParticipants: typeof MeetiParticipants;
	comment: typeof Comment;
	
	// CRM tables
	product: typeof Product;
	invoice: typeof Invoice;
	invoiceProductJunction: typeof InvoiceProductJunction;
	
    /**
     * Constructor
     */
    constructor() {
        this.connection = mysqlConn();
        
        // Independent tables
        this.user = createUserModel(this.connection);
		this.address = createAddressModel(this.connection);
		
		// User tables
        this.userContactMethods = createUserContactMethods(this.connection, this.user);
        
        // App tables
        this.app = this.#app();
        this.appTag = this.#appTag();
        this.appGroup = this.#appGroup();
		this.process = this.#process();
        
        this.appOutput = this.#appOutput();
        this.tagAppJunction = this.#tagAppJunction();
        this.groupAppJunction = this.#groupAppJunction();
		
        // --- Real estate ---
        const category = createCategoryModel(this.connection);
        const price = createPriceModel(this.connection);
        this.category = category;
        this.price = price;
        
        // Dependents
        const userMessages = createUserMessagesModel(this.connection, this.user);
        const property = createPropertyModel(this.connection, this.user, this.category, this.price);
        this.userMessages = userMessages;
        this.property = property;
        
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
        
        // --- Job app(Dev jobs) ---
		const company = createCompanyModel(
			this.connection,
			this.address
		);
		this.company = company;
		
        const job = createJobModel(
            this.connection,
        );
        this.job = job;
		
		// --- Meetup app(Meeti) ---
		this.socialCategory = createSocialCategoryModel(this.connection);
		
		const groups = createGroupsModel(this.connection, this.socialCategory, this.user);
		this.groups = groups;
		
		const meeti = createMeetiModel(
			this.connection,
			this.user,
			this.groups,
			this.address
		);
		this.meeti = meeti;
		
		const meetiParticipants = createMeetiParticipantsModel(
			this.connection,
			this.meeti,
			this.user
		);
		const comment = createCommentModel(
			this.connection,
			this.user,
			this.meeti
		);
		this.meetiParticipants = meetiParticipants;
		this.comment = comment;
		
		// --- CRM ---
		const product = createProductModel(
			this.connection
		);
		this.product = product;
		
		const invoice = createInvoiceModel(
			this.connection,
			this.user
		);
		this.invoice = invoice;
		
		const invoiceProductJunction = createInvoiceProductJunctionModel(
			this.connection,
			this.invoice,
			this.product
		);
		this.invoiceProductJunction = invoiceProductJunction;
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
    #process() {
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
