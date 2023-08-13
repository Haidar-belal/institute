const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Instructor = database.define(
	'Instructor',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mobilePhone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}
);

module.exports = Instructor;
