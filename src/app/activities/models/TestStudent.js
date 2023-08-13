const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const TestStudent = database.define(
	'TestStudent',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		mark: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
			allowNull: false,
		},
	}
);

module.exports = TestStudent;
