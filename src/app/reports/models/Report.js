const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Report = database.define(
	'Report',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		body: {
			type: DataTypes.TEXT,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
		},
		isRead: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	}
);

module.exports = Report;
