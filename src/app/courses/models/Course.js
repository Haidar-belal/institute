const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Course = database.define(
	'Course',
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
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}
);

module.exports = Course;
