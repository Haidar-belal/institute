const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Test = database.define(
	'Test',
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
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	}
);

module.exports = Test;
