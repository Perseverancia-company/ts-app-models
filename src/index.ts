import { mysqlProductionConnection } from "./connection/mysqlConn";
import mysqlConn from "./connection/mysqlConn";
import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";
import { resetTables } from "./cmd/tables";
import Models from "./Models";
import { PartialConnectionOptions } from "./connection/mysqlConn";
import TablesController from "./lib/TablesController";
import TablesGroupController from "./lib/TablesGroupController";
import databaseName, {
	defaultDatabaseName,
	developmentDatabaseName,
	testingDatabaseName,
	productionDatabaseName,
	initializeDotenv,
	isTesting,
	isDevelopment,
} from "./env";

// Importing model files
import User from "./model/user/User";
import UserRoles from "./model/user/UserRoles";
import UserContactMethods from "./model/user/UserContactMethods";
import Role from "./model/user/Role";
import OAuth2Client from "./model/oauth/OAuth2Client";
import OAuthAccessToken from "./model/oauth/OAuthAccessToken";
import OAuthAuthorizationCode from "./model/oauth/OAuthAuthorizationCode";
import OAuthRefreshToken from "./model/oauth/OAuthRefreshToken";

// Real-estate models
import Category from "./model/real-estate/Category";
import Price from "./model/real-estate/Price";
import UserMessages from "./model/real-estate/UserMessages";
import Property from "./model/real-estate/Property";
import DebugPropertyImageUpload from "./model/real-estate/DebugPropertyImageUpload";
import PropertySellerMessage from "./model/real-estate/PropertySellerMessage";
import PropertyComment from "./model/real-estate/PropertyComment";
import PropertyRating from "./model/real-estate/PropertyRating";
import UserFavoriteProperty from "./model/real-estate/UserFavoriteProperty";
import GeneralPropertyInformation from "./model/real-estate/GeneralPropertyInformation";

// Company models
import Job from "./model/company/Job";
import Address from "./model/Address";
import Product from "./model/crm/Product";
import Invoice from "./model/crm/Invoice";
import InvoiceProductJunction from "./model/crm/InvoiceProductJunction";
import Company from "./model/company/Company";
import Groups from "./model/meetup/Groups";
import Meeti from "./model/meetup/Meeti";
import MeetiParticipants from "./model/meetup/MeetiParticipants";
import Comment from "./model/meetup/Comment";
import SocialCategory from "./model/meetup/SocialCategory";
import App from "./model/app/App";
import AppOutput from "./model/app/AppOutput";
import AppTag from "./model/app/AppTag";
import Process from "./model/app/Process";
import AppGroup from "./model/app/AppGroup";
import GroupAppJunction from "./model/app/GroupAppJunction";
import TagAppJunction from "./model/app/TagAppJunction";
import EmployeeRole from "./model/company/EmployeeRole";
import CompanyStaff from "./model/company/CompanyStaff";
import Skill from "./model/company/Skill";
import JobSkillJunction from "./model/company/JobSkillJunction";

// Personal log models
import Music from "./model/personal-log/Music";
import Note from "./model/personal-log/Note";
import PersonalLog from "./model/personal-log/PersonalLog";
import ListeningTo from "./model/personal-log/ListeningTo";
import LogNotes from "./model/personal-log/LogNotes";

// File models
import ContactForm from "./model/ContactForm";
import File from "./model/file/File";
import Folder from "./model/file/Folder";
import FolderFileJunction from "./model/file/FolderFileJunction";
import DuplicatedFile from "./model/file/DuplicatedFile";
import ByteRegion from "./model/file/ByteRegion";

// System info models
import StorageDevice from "./model/system-info/StorageDevice";
import SystemMemory from "./model/system-info/SystemMemory";
import SystemCore from "./model/system-info/SystemCore";
import SystemResources from "./model/system-info/SystemResources";
import ServerNode from "./model/system-info/ServerNode";
import ServerLocation from "./model/system-info/ServerLocation";
import SystemInfo from "./model/system-info/SystemInfo";

// Service model
import Service from "./model/Service";

// Seeding and testing models
import UserRolesModels from "./test/modelSet/UserRolesModels";
import DefaultUsers from "./seed/DefaultUsers";

// Configuration
import Configuration from "./model/configuration/Configuration";
import AppConfig from "./model/configuration/AppConfig";

import UniversalOAuth2Client from "./universal/oauth/UniversalOAuth2Client";

// Exporting models, controllers, and helpers
export {
	// Connections
	mysqlConn,
	mysqlProductionConnection,

	// Environment variables and initialization
	initializeDotenv,
	databaseName,
	defaultDatabaseName,
	developmentDatabaseName,
	testingDatabaseName,
	productionDatabaseName,
	isTesting,
	isDevelopment,

	// Seeding and testing
	DefaultUsers,
	UserRolesModels,

	// Debugging and utilities
	printMysqlEnvironmentVariables,

	// Tables handling
	resetTables,
	TablesController,
	TablesGroupController,

	// Universal models
	UniversalOAuth2Client,

	// Models
	Models,

	// Models grouped by category
	User,
	UserRoles,
	UserContactMethods,
	Role,
	OAuth2Client,
	OAuthAccessToken,
	OAuthAuthorizationCode,
	OAuthRefreshToken,

	// Real-estate models
	Category,
	Price,
	UserMessages,
	Property,
	DebugPropertyImageUpload,
	PropertySellerMessage,
	PropertyComment,
	PropertyRating,
	UserFavoriteProperty,
	GeneralPropertyInformation,

	// Company models
	Job,
	Address,
	Product,
	Invoice,
	InvoiceProductJunction,
	Company,
	Groups,
	Meeti,
	MeetiParticipants,
	Comment,
	SocialCategory,
	App,
	AppOutput,
	AppTag,
	Process,
	AppGroup,
	GroupAppJunction,
	TagAppJunction,
	EmployeeRole,
	CompanyStaff,
	Skill,
	JobSkillJunction,

	// Personal log models
	Music,
	Note,
	PersonalLog,
	ListeningTo,
	LogNotes,

	// File models
	ContactForm,
	File,
	Folder,
	FolderFileJunction,
	DuplicatedFile,
	ByteRegion,

	// System info models
	StorageDevice,
	SystemMemory,
	SystemCore,
	SystemResources,
	ServerNode,
	ServerLocation,
	SystemInfo,

	// Service models
	Service,

	// Configuraiton
	Configuration,
	AppConfig,
};

export type { PartialConnectionOptions };
