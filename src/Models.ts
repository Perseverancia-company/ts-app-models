import { Sequelize } from "sequelize";

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
import App, { createAppModel } from "./model/App";
import AppOutput, { createAppOutputModel } from "./model/AppOutput";
import AppTag, { createAppTagModel } from "./model/AppTag";
import Process, { createProcessModel } from "./model/Process";
import AppGroup, { createAppGroupModel } from "./model/AppGroup";
import GroupAppJunction, { createGroupAppJunction } from "./model/GroupAppJunction";
import TagAppJunction, { createTagAppJunction } from "./model/TagAppJunction";
import EmployeeRole, { createEmployeeRoleModel } from "./model/EmployeeRole";
import CompanyStaff, { createCompanyStaffModel } from "./model/CompanyStaff";
import Skill, { createSkillModel } from "./model/Skill";
import JobSkillJunction, { createJobSkillJunction } from "./model/JobSkillJunction";
import Music, { createMusicModel } from "./model/Music";
import Note, { createNoteModel } from "./model/Note";
import PersonalLog, { createPersonalLogModel } from "./model/PersonalLog";
import ListeningTo, { createListeningToModel } from "./model/ListeningTo";
import LogNotes, { createLogNotesModel } from "./model/LogNotes";
import ContactForm, { createContactFormModel } from "./model/ContactForm";
import File, { createFileModel } from "./model/File";
import Folder, { createFolderModel } from "./model/Folder";
import FolderFileJunction, { createFolderFileJunctionModel } from "./model/FolderFileJunction";
import DuplicatedFile, { createDuplicatedFileModel } from "./model/DuplicatedFile";
import ByteRegion, { createByteRegionModel } from "./model/ByteRegion";
import StorageDevice, { createStorageDeviceModel } from "./model/StorageDevice";
import SystemMemory, { createSystemMemoryModel } from "./model/SystemMemory";
import SystemCore, { createSystemCoreModel } from "./model/SystemCore";
import SystemResources, { createSystemResourcesModel } from "./model/SystemResources";

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
    User: typeof User;
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
		
    /**
     * Constructor
     */
    constructor() {
        this.connection = mysqlConn();
        
        // Independent tables
		this.Address = createAddressModel(this.connection);
		this.ContactForm = createContactFormModel(this.connection);
		
		// User tables
        this.User = createUserModel(this.connection);
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
    }
	
    /**
     * Models from high independence to low independence
     */
    models() {
        const modelArray = [
			this.Address,
			this.ContactForm,
			
			this.User,
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
