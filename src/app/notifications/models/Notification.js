const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Notification = database.define(
	'Notification',
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
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		isNotify: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isRead: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	}
);

module.exports = Notification;
