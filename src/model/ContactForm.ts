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
	
	// Communication
	declare email: string;
	declare phoneNumber: string;
	
	// The service that the user wanted to get in contact from
	declare fromWebsite: string;
	declare fromApp: string;
	
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Contact form
 */
export function createContactFormModel(conn: Sequelize) {
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
        message: {
            type: DataTypes.TEXT,
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
		fromWebsite: {
			type: DataTypes.STRING(128),
			validate: {
				isUrl: {
					msg: "Please enter a valid URL.",
				}
			}
		},
		fromApp: {
			type: DataTypes.STRING(128),
            defaultValue: false,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn
    });
	
    return ContactFormModel;
}
