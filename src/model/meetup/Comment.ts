import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import User from "../User";
import Meeti from "./Meeti";

/**
 * Category
 */
export default class Comment extends Model<
    InferAttributes<
		Comment
    >,
    InferCreationAttributes<
		Comment,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare message: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Comment model
 */
export function createCommentModel(
	conn: Sequelize,
	user: typeof User,
	meeti: typeof Meeti
) {
	const TABLE_NAME = "comment";
	const CommentModel = Comment.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "A comment is required"
				}
			}
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	CommentModel.belongsTo(user);
	CommentModel.belongsTo(meeti);
	
	return CommentModel;
}
