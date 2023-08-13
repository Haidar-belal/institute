const { DataTypes } = require('sequelize');
const { database, collation } = require('../../../../utils/index');
const { gender, user } = require('./enum.json');
const bcrypt = require('bcrypt');
const { saltWorkFactor, key, cipherAlgorithm } = require('../../../../config/index');
const jwt = require('jsonwebtoken');

const User = database.define(
	'User',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			trim: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mobilePhone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		gender: {
			type: DataTypes.ENUM,
			values: gender,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},
		type: {
			type: DataTypes.ENUM,
			values: user,
			defaultValue: user[1],
		},
		verificationCode: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['username', 'email'],
			},
		],
	}
);

const hashPassword = async function (user) {
	try {
		const password = user.password || user.attributes.password;
		if (password !== undefined) {
			if (user.password === undefined) {
				user.attributes.password = await bcrypt.hash(password, saltWorkFactor);
			} else {
				user.password = await bcrypt.hash(password, saltWorkFactor);
			}
			return user;
		}
		return null
	} catch (error) {
		console.log(error.message);
		return null;
	}
};

User.prototype.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

User.prototype.generateVerificationToken = async function () {
	return jwt.sign({ id: this.id }, key, {
		algorithm: cipherAlgorithm,
	});
};

User.beforeCreate(hashPassword);
User.beforeBulkUpdate(hashPassword);

User.prototype.toJSON = function () {
	let user = Object.assign({}, this.get());
	delete user.password;
	delete user.createdAt;
	delete user.updatedAt;
	delete user.verificationCode;
	return user;
};


module.exports = User;
