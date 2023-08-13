const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Class = database.define(
	'Class',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}
);

module.exports = Class;
