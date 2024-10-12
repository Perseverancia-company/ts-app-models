import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * App group
 */
export default class AppGroup extends Model<
    InferAttributes<
		AppGroup
    >,
    InferCreationAttributes<
		AppGroup,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
	declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * App group
 * 
 * M:N relation with apps
 */
export function createAppGroupModel(
	conn: Sequelize
) {
	const TABLE_NAME = "app-group";
	const groupModel = AppGroup.init({
		id:{ 
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		// Name of the group like 'Real estate'(for my good roots stack)
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	return groupModel;
}
