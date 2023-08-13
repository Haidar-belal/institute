const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const EnrollmentStudent = database.define(
	'EnrollmentStudent',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		month: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}
);

module.exports = EnrollmentStudent;
