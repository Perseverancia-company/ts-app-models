import shortid from "shortid";
import slug from 'slug';
import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";
import Groups from "./Groups";
import Address from "./Address";

/**
 * Meeti model
 */
export default class Meeti extends Model<
	InferAttributes<
		Meeti
	>,
	InferCreationAttributes<
		Meeti,
		{ omit: 'id' | "featuring" | "coupon" | "slug" | 'createdAt' | 'updatedAt' }
	>> {
	declare id: number;
	declare title: string;
	declare featuring: string;
	declare coupon: number;
	declare description: string;
	declare date: Date;
	declare time: Date;
	declare slug: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}


/**
 * Meeti model
 */
export function createMeetiModel(
	conn: Sequelize,
	user: typeof User,
	groups: typeof Groups,
	address: typeof Address
) {
	const TABLE_NAME = "meeti";
	const MeetiModel = Meeti.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(256),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Title cannot be empty"
				}
			}
		},
		featuring: {
			type: DataTypes.STRING(256),
		},
		coupon: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The description can't be empty"
				}
			}
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Add a date for the Meeti"
				}
			}
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Add a time for the Meeti"
				}
			}
		},
		slug: {
			type: DataTypes.STRING,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		hooks: {
			async beforeCreate(meeti) {
				const title = meeti.title.toLowerCase();
				const url = slug(`${title}-${shortid.generate()}`);
				meeti.slug = url;
			}
		}
	});
	
	// For owner
	MeetiModel.belongsTo(user);
	MeetiModel.belongsTo(groups);
	MeetiModel.belongsTo(address);
	
	return MeetiModel;
}

module.exports = createMeetiModel;
