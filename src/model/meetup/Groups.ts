import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import SocialCategory from "./SocialCategory";
import User from "../user/User";

/**
 * Meetup groups model
 */
export default class Groups extends Model<
    InferAttributes<
		Groups
    >,
    InferCreationAttributes<
		Groups,
        { omit: 'id' | "description" | "url" | "image" | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
	declare name: string;
	declare description: string;
	declare url: string;
	declare image: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Meetup groups model
 */
export function createGroupsModel(
	conn: Sequelize,
	socialCategory: typeof SocialCategory,
	user: typeof User
) {
	const TABLE_NAME = "groups";
	
	const GroupsModel = Groups.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(256),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The group must have name"
				}
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: "Description can't be empty"
				}
			}
		},
		url: DataTypes.TEXT,
		image: DataTypes.STRING(64),
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	GroupsModel.belongsTo(socialCategory);
	GroupsModel.belongsTo(user);
	
	return GroupsModel;
}
