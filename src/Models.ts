import { Sequelize } from "sequelize";

import mysqlConn from "./connection/mysqlConn";

import User, { createUserModel } from "./model/user/User";
import UserContactMethods, { createUserContactMethods } from "./model/user/UserContactMethods";
import Category, { createCategoryModel } from "./model/real-estate/Category";
import Price, { createPriceModel } from "./model/real-estate/Price";
import UserMessages, { createUserMessagesModel } from "./model/real-estate/UserMessages";
import Property, { createPropertyModel } from "./model/real-estate/Property";
import DebugPropertyImageUpload, { createDebugPropertyImageUpload } from "./model/real-estate/DebugPropertyImageUpload";
import PropertySellerMessage, { createPropertySellerMessage } from "./model/real-estate/PropertySellerMessage";
import PropertyComment, { createPropertyComment } from "./model/real-estate/PropertyComment";
import PropertyRating, { createPropertyRating } from "./model/real-estate/PropertyRating";
import UserFavoriteProperty, { createUserFavoriteProperty } from "./model/real-estate/UserFavoriteProperty";
import GeneralPropertyInformation, { createGeneralPropertyInformationModel } from "./model/real-estate/GeneralPropertyInformation";
import Job, { createJobModel } from "./model/company/Job";
import Address, { createAddressModel } from "./model/Address";
import Product, { createProductModel } from "./model/crm/Product";
import Invoice, { createInvoiceModel } from "./model/crm/Invoice";
import InvoiceProductJunction, { createInvoiceProductJunctionModel } from "./model/crm/InvoiceProductJunction";
import Company, { createCompanyModel } from "./model/company/Company";
import Groups, { createGroupsModel } from "./model/meetup/Groups";
import Meeti, { createMeetiModel } from "./model/meetup/Meeti";
import MeetiParticipants, { createMeetiParticipantsModel } from "./model/meetup/MeetiParticipants";
import Comment, { createCommentModel } from "./model/meetup/Comment";
import SocialCategory, { createSocialCategoryModel } from "./model/meetup/SocialCategory";
import App, { createAppModel } from "./model/app/App";
import AppOutput, { createAppOutputModel } from "./model/app/AppOutput";
import AppTag, { createAppTagModel } from "./model/app/AppTag";
import Process, { createProcessModel } from "./model/app/Process";
import AppGroup, { createAppGroupModel } from "./model/app/AppGroup";
import GroupAppJunction, { createGroupAppJunction } from "./model/app/GroupAppJunction";
import TagAppJunction, { createTagAppJunction } from "./model/app/TagAppJunction";
import EmployeeRole, { createEmployeeRoleModel } from "./model/company/EmployeeRole";
import CompanyStaff, { createCompanyStaffModel } from "./model/company/CompanyStaff";
import Skill, { createSkillModel } from "./model/company/Skill";
import JobSkillJunction, { createJobSkillJunction } from "./model/company/JobSkillJunction";
import Music, { createMusicModel } from "./model/personal-log/Music";
import Note, { createNoteModel } from "./model/personal-log/Note";
import PersonalLog, { createPersonalLogModel } from "./model/personal-log/PersonalLog";
import ListeningTo, { createListeningToModel } from "./model/personal-log/ListeningTo";
import LogNotes, { createLogNotesModel } from "./model/personal-log/LogNotes";
import ContactForm, { createContactFormModel } from "./model/ContactForm";
import File, { createFileModel } from "./model/file/File";
import Folder, { createFolderModel } from "./model/file/Folder";
import FolderFileJunction, { createFolderFileJunctionModel } from "./model/file/FolderFileJunction";
import DuplicatedFile, { createDuplicatedFileModel } from "./model/file/DuplicatedFile";
import ByteRegion, { createByteRegionModel } from "./model/file/ByteRegion";
import StorageDevice, { createStorageDeviceModel } from "./model/system-info/StorageDevice";
import SystemMemory, { createSystemMemoryModel } from "./model/system-info/SystemMemory";
import SystemCore, { createSystemCoreModel } from "./model/system-info/SystemCore";
import SystemResources, { createSystemResourcesModel } from "./model/system-info/SystemResources";
import ServerNode, { createServerNodeModel } from "./model/system-info/ServerNode";
import ServerLocation, { createServerLocation } from "./model/system-info/ServerLocation";
import SystemInfo, { createSystemInfoModel } from "./model/system-info/SystemInfo";
import Service, { createServiceModel } from "./model/Service";
import OAuth2Client, { createOAuth2Client } from "./model/OAuth2Client";
import Role, { createRoleModel } from "./model/user/Role";
import UserRoles, { createUserRolesModel } from "./model/user/UserRoles";

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
	Address: typeof Address;
	ContactForm: typeof ContactForm;
	
    // User tables
	Role: typeof Role;
    User: typeof User;
	UserRoles: typeof UserRoles;
    UserContactMethods: typeof UserContactMethods;
    
    // App manager tables
    App: typeof App;
    AppGroup: typeof AppGroup;
    AppOutput: typeof AppOutput;
	Process: typeof Process;
    AppTag: typeof AppTag;
    TagAppJunction: typeof TagAppJunction;
    GroupAppJunction: typeof GroupAppJunction;
    
    // Real estate tables
    Category: typeof Category;
    Price: typeof Price;
    UserMessages: typeof UserMessages;
    Property: typeof Property;
    DebugPropertyImageUpload: typeof DebugPropertyImageUpload;
    PropertySellerMessage: typeof PropertySellerMessage;
    PropertyComment: typeof PropertyComment;
    PropertyRating: typeof PropertyRating;
    UserFavoriteProperty: typeof UserFavoriteProperty;
    GeneralPropertyInformation: typeof GeneralPropertyInformation;
    
	// Company
	Company: typeof Company;
	EmployeeRole: typeof EmployeeRole;
	CompanyStaff: typeof CompanyStaff;
	
    // Jobs
    Job: typeof Job;
	Skill: typeof Skill;
	JobSkillJunction: typeof JobSkillJunction;
	
	// Meetup tables
	SocialCategory: typeof SocialCategory;
	Groups: typeof Groups;
	Meeti: typeof Meeti;
	MeetiParticipants: typeof MeetiParticipants;
	Comment: typeof Comment;
	
	// CRM tables
	Product: typeof Product;
	Invoice: typeof Invoice;
	InvoiceProductJunction: typeof InvoiceProductJunction;
	
	// Personal log
	Music: typeof Music;
	Note: typeof Note;
	PersonalLog: typeof PersonalLog;
	ListeningTo: typeof ListeningTo;
	LogNotes: typeof LogNotes;
	
	// File system
	File: typeof File;
	Folder: typeof Folder;
	FolderFileJunction: typeof FolderFileJunction;
	DuplicatedFile: typeof DuplicatedFile;
	ByteRegion: typeof ByteRegion;
	
	// System information
	SystemResources: typeof SystemResources;
	StorageDevice: typeof StorageDevice;
	SystemMemory: typeof SystemMemory;
	SystemCore: typeof SystemCore;
	ServerLocation: typeof ServerLocation;
	SystemInfo: typeof SystemInfo;
	ServerNode: typeof ServerNode;
	
	Service: typeof Service;
	OAuth2Client: typeof OAuth2Client;
	
    /**
     * Constructor
     */
    constructor(options?: {
		connection: Sequelize,
	}) {
        this.connection = (options && options.connection) ?? mysqlConn();
        
        // Independent tables
		this.Address = createAddressModel(this.connection);
		this.ContactForm = createContactFormModel(this.connection);
		
		// User tables
		this.Role = createRoleModel(this.connection);
        this.User = createUserModel(this.connection);
		this.UserRoles = createUserRolesModel(this.connection, this.User, this.Role);
        this.UserContactMethods = createUserContactMethods(this.connection, this.User);
        
        // App tables
        this.App = createAppModel(this.connection);
        this.AppTag = createAppTagModel(this.connection);
        this.AppGroup = createAppGroupModel(this.connection);
		this.Process = createProcessModel(this.connection);
        
        this.AppOutput = createAppOutputModel(this.connection, this.App);
        this.TagAppJunction = createTagAppJunction(
			this.connection,
			this.AppTag,
			this.App,
		);
        this.GroupAppJunction = createGroupAppJunction(
			this.connection, this.App, this.AppGroup
		);
		
        // Real estate
        this.Category = createCategoryModel(this.connection);
        this.Price = createPriceModel(this.connection);
        
        this.UserMessages = createUserMessagesModel(this.connection, this.User);
        this.Property = createPropertyModel(
			this.connection,
			this.User,
			this.Category,
			this.Price
		);
        
        this.DebugPropertyImageUpload = createDebugPropertyImageUpload(
			this.connection, this.Property
		);
        this.PropertySellerMessage = createPropertySellerMessage(
			this.connection, this.User, this.Property
		);
        this.PropertyComment = createPropertyComment(
			this.connection, this.User, this.Property
		);
        this.PropertyRating = createPropertyRating(
			this.connection, this.User, this.Property
		);
        this.UserFavoriteProperty = createUserFavoriteProperty(
			this.connection, this.User, this.Property
		);
		
        this.GeneralPropertyInformation = createGeneralPropertyInformationModel(
            this.connection,
            this.Property,
            this.PropertySellerMessage,
            this.PropertyRating,
            this.PropertyComment
        );
        
		// Company
		this.Company = createCompanyModel(
			this.connection,
			this.Address
		);
		this.EmployeeRole = createEmployeeRoleModel(this.connection);
		this.CompanyStaff = createCompanyStaffModel(
			this.connection,
			this.User,
			this.EmployeeRole,
			this.Company
		);
		
        // Job(Dev jobs)
        this.Job = createJobModel(
            this.connection,
			this.Company,
        );
		this.Skill = createSkillModel(
			this.connection
		);
		
		this.JobSkillJunction = createJobSkillJunction(
			this.connection,
			this.Job,
			this.Skill
		);
		
		// Meetup(Meeti)
		this.SocialCategory = createSocialCategoryModel(this.connection);
		
		this.Groups = createGroupsModel(this.connection, this.SocialCategory, this.User);
		
		this.Meeti = createMeetiModel(
			this.connection,
			this.User,
			this.Groups,
			this.Address
		);
		
		this.MeetiParticipants = createMeetiParticipantsModel(
			this.connection,
			this.Meeti,
			this.User
		);
		this.Comment = createCommentModel(
			this.connection,
			this.User,
			this.Meeti
		);
		
		// CRM
		this.Product = createProductModel(
			this.connection
		);
		
		this.Invoice = createInvoiceModel(
			this.connection,
			this.User
		);
		
		this.InvoiceProductJunction = createInvoiceProductJunctionModel(
			this.connection,
			this.Invoice,
			this.Product
		);
		
		// Personal log
		this.Music = createMusicModel(this.connection);
		this.Note = createNoteModel(this.connection);
		this.PersonalLog = createPersonalLogModel(this.connection, this.Address);
		this.ListeningTo = createListeningToModel(this.connection, this.Music, this.PersonalLog);
		this.LogNotes = createLogNotesModel(this.connection, this.PersonalLog, this.Note);
		
		// Filesystem
		this.File = createFileModel(this.connection);
		this.Folder = createFolderModel(this.connection);
		this.FolderFileJunction = createFolderFileJunctionModel(
			this.connection,
			this.File,
			this.Folder
		);
		this.DuplicatedFile = createDuplicatedFileModel(
			this.connection,
			this.File
		);
		this.ByteRegion = createByteRegionModel(this.connection);
		
		// System information
		// Mainly for 'swarm-weave' repository
		this.SystemResources = createSystemResourcesModel(
			this.connection,
		);
		this.StorageDevice = createStorageDeviceModel(
			this.connection,
			this.SystemResources,
		);
		this.SystemMemory = createSystemMemoryModel(
			this.connection,
			this.SystemResources,
		);
		this.SystemCore = createSystemCoreModel(
			this.connection,
			this.SystemResources,
		);
		this.ServerLocation = createServerLocation(
			this.connection,
		);
		this.SystemInfo = createSystemInfoModel(
			this.connection
		);
		this.ServerNode = createServerNodeModel(
			this.connection,
			this.ServerLocation,
            this.SystemInfo,
			this.SystemResources,
		);
		
		this.Service = createServiceModel(this.connection);
		this.OAuth2Client = createOAuth2Client(this.connection);
    }
	
    /**
     * Models from high independence to low independence
     */
    models() {
        const modelArray = [
			this.Address,
			this.ContactForm,
			
			this.Role,
			this.User,
			this.UserRoles,
			this.UserContactMethods,
			
			// App manager
			this.App,
			this.AppGroup,
			this.AppOutput,
			this.Process,
			this.AppTag,
			this.TagAppJunction,
			this.GroupAppJunction,
			
			// Real estate
			this.Category,
			this.Price,
			this.UserMessages,
			this.Property,
			this.DebugPropertyImageUpload,
			this.PropertySellerMessage,
			this.PropertyComment,
			this.PropertyRating,
			this.UserFavoriteProperty,
			this.GeneralPropertyInformation,
			
			// Company
			this.Company,
			this.EmployeeRole,
			this.CompanyStaff,
			
			// Jobs
			this.Job,
			this.Skill,
			this.JobSkillJunction,
			
			// Meetup
			this.SocialCategory,
			this.GroupAppJunction,
			this.Meeti,
			this.MeetiParticipants,
			this.Comment,
			
			// CRM
			this.Product,
			this.Invoice,
			this.InvoiceProductJunction,
			
			// Personal log
			this.Music,
			this.Note,
			this.PersonalLog,
			this.ListeningTo,
			this.LogNotes,
			
			// File
			this.File,
			this.Folder,
			this.FolderFileJunction,
			this.DuplicatedFile,
			this.ByteRegion,
			
			// System information
			this.SystemResources,
			this.StorageDevice,
			this.SystemMemory,
			this.SystemCore,
			this.ServerLocation,
			this.SystemInfo,
            this.ServerNode,
			
			this.Service,
            this.OAuth2Client,
        ];
        
        return modelArray;
    }
	
	// --- Get group models ---
    /**
     * Real estate models
     */
    realEstateModels() {
        const orderedModels = [
            this.Category,
            this.Price,
			
            this.Property,
            this.UserMessages,
            
            this.PropertySellerMessage,
            this.PropertyComment,
            this.PropertyRating,
            this.UserFavoriteProperty,
            
            this.GeneralPropertyInformation,
        ];
        
        return orderedModels;
    }
	
	/**
	 * Personal log models
	 */
	personalLogModels() {
		const orderedModels = [
            this.Music,
            this.Note,
            this.PersonalLog,
            this.ListeningTo,
            this.LogNotes,
        ];
        
        return orderedModels;
	}
}
