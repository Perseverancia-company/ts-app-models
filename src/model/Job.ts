import slug from "slug";
import shortid from "shortid";
import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * User model
 */
export default class Job extends Model<
    InferAttributes<
        Job
    >,
    InferCreationAttributes<
        Job,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare title: string;
    declare company: string;
    declare location: string;
    declare salary: number;
    declare contract: string;
    declare description: string;
    declare url: string;
    declare skills: string[];
    declare createdAt: Date;
    declare updatedAt: Date;
}

// Job contract types, later may have to be reworked because this is awful, maybe another table?
export const JOB_CONTRACT_TYPES = [
	"full-time",
	"part-time",
	"freelance",
	"contract",
    "temporary",
    "internship",
    "apprenticeship",
    "volunteer",
];

/**
 * Create price model
 * 
 * @param conn 
 * @returns 
 */
export function createJobModel(conn: Sequelize) {
    const TABLE_NAME = "job";
        
    const Model = Job.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
		// TODO: Relation with company model
        company: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contract: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
        hooks: {
            beforeCreate: async function(job: any) {
				// Create url
				const url = slug(job.title);
				job.url = `${url}-${shortid.generate()}`;
            }
        },
    });
	
    return Model;
}
