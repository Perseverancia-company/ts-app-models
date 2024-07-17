import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import Meeti from "./Meeti";
import User from "./User";

/**
 * Meeti participants
 */
export default class MeetiParticipants extends Model<
    InferAttributes<
		MeetiParticipants
    >,
    InferCreationAttributes<
		MeetiParticipants,
        { omit: 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Meeti assistants
 */
export function createMeetiParticipantsModel(
	conn: Sequelize,
	meeti: typeof Meeti,
	user: typeof User,
) {
	const TABLE_NAME = "meeti-participants";
	const MeetiParticipantsModel = MeetiParticipants.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME
	});
	
	// Many to many relationship M:N
	meeti.belongsToMany(user, { through: MeetiParticipantsModel });
	user.belongsToMany(meeti, { through: MeetiParticipantsModel });
	
	return MeetiParticipantsModel;
}
