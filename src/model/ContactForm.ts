import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Property seller message
 */
export default class ContactForm extends Model<
    InferAttributes<
		ContactForm
    >,
    InferCreationAttributes<
		ContactForm,
        { omit: 'id' | 'createdAt' | "email" | "phoneNumber" | 'updatedAt' }
    >> {
    declare id: number;
	declare name: string;
    declare message: string;
	declare email: string;
	declare phoneNumber: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Contact form
 */
export function createContactFormModel(conn: Sequelize) {
    const TABLE_NAME = "contact-form";
        
    const ContactFormModel = ContactForm.init({
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
		name: {
			type: DataTypes.STRING(128),
            allowNull: false,
		},
		// Either an email or a phone is required
		email: {
			type: DataTypes.STRING(128),
            validate: {
                isEmail: {
					msg: "Please enter a valid email address.",
                },
            },
		},
		phoneNumber: {
			type: DataTypes.STRING(128),
		},
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
    return ContactFormModel;
}
