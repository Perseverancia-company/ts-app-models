import Sequelize, {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize as SequelizeConnection,
	DataTypes
} from "sequelize";

/**
 * User model
 */
export default class SocialCategory extends Model<
    InferAttributes<
		SocialCategory
    >,
    InferCreationAttributes<
		SocialCategory,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare nameId: string;
	declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create social category model
 */
export function createSocialCategoryModel(conn: SequelizeConnection) {
    const TABLE_NAME = "social-category";
	
	const SocialCategoryModel = SocialCategory.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nameId: {
			type: DataTypes.STRING(64),
		},
		name: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
	}, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME
	});
	
	return SocialCategoryModel;
}
