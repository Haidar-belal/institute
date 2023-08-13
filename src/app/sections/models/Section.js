const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');

const Section = database.define(
	'Section',
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

module.exports = Section;
