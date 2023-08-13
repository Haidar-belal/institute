const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Enrollment = database.define(
	'Enrollment',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['month'],
			},
		],
	}
);

module.exports = Enrollment;
