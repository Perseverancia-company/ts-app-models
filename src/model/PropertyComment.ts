import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";
import Property from "./Property";
import GeneralPropertyInformation from "./GeneralPropertyInformation";

/**
 * Property comment
 */
export default class PropertyComment extends Model<
    InferAttributes<
        PropertyComment
    >,
    InferCreationAttributes<
        PropertyComment,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare message: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Property comments
 */
export function createPropertyComment(
    conn: Sequelize,
    user: typeof User,
    property: typeof Property
) {
    const TABLE_NAME = "property-comment";
        
    const PropertyCommentModel = PropertyComment.init({
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        message: {
            type: DataTypes.STRING(2048),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    // Relations
    PropertyCommentModel.belongsTo(property);
    PropertyCommentModel.belongsTo(user);
    
    return PropertyCommentModel;
}
