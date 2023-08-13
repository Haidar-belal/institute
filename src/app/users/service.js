const { httpStatus, sendMail, console } = require('../../../utils/index');
const UserModel = require('./models/User');
const { Op } = require('sequelize');
class User {
	constructor(data) {
		this.username = data.username;
		this.email = data.email;
		this.name = data.name;
		this.password = data.password;
		this.mobilePhone = data.mobilePhone;
		this.phone = data.phone;
		this.type = data.type;
		this.gender = data.gender;
		this.address = data.address;
		this.sectionId = data.sectionId;
	}

	async register() {
		try {
			const result = await UserModel.create(this);
			const token = await result.generateVerificationToken();
			return {
				data: result,
				token: token,
				code: httpStatus.CREATED,
			};
		} catch (error) {
			console.error(error);
			if (error.message.includes('email'))
				return {
					data: 'email already existed, please login',
					code: httpStatus.ALREADY_REGISTERED,
				};
			else if (error.message.includes('username'))
				return {
					data: 'username already existed, please choose another one',
					code: httpStatus.ALREADY_REGISTERED,
				};
			else
				return {
					data: error.message,
					code: httpStatus.ALREADY_REGISTERED,
				};
		}
	}

	static async login(username, password) {
		try {
			const result = await UserModel.findOne({
				where: {
					username: username,
				},
			});
			if (result && (await result.comparePassword(password))) {
				const token = await result.generateVerificationToken();
				return {
					data: result,
					token: token,
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'username or password is not correct',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async get() {
		try {
			const result = await UserModel.findAll({
				where: { type: { [Op.not]: 'manager' } },
			});
			return {
				data: result,
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await UserModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] === 1) {
				return {
					data: 'updated successfully',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async updateActivation(id, isActive) {
		try {
			const result = await UserModel.update(
				{
					isActive: isActive,
				},
				{
					where: {
						id: id,
					},
				}
			);
			if (result[0] === 1) {
				return {
					data: `updated`,
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			await UserModel.destroy({
				where: {
					id: id,
				},
			});
			if (result) {
				return {
					data: 'deleted successfully',
					code: httpStatus.DELETED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async sendMail(email) {
		try {
			const code = sendMail(email);
			if (code !== undefined) {
				const result = await UserModel.update(
					{
						verificationCode: code,
					},
					{
						where: {
							email: email,
						},
					}
				);
				if (result[0] === 1) {
					return {
						data: 'we sent a verification code to your email, please check it',
						code: httpStatus.OK,
					};
				} else {
					return {
						data: 'something wrong happened',
						code: httpStatus.BAD_REQUEST,
					};
				}
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async checkCode(email, code) {
		try {
			const result = await UserModel.findOne({
				where: {
					email: email,
					verificationCode: code,
				},
			});
			if (result) {
				return {
					data: 'done',
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'please check your code',
					code: httpStatus.NOT_FOUND,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async resetPassword(password, email) {
		try {
			const result = await UserModel.update(
				{
					password: password,
				},
				{
					where: {
						email: email,
					},
				}
			);
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async updatePassword(id, oldPassword, newPassword) {
		try {
			const result = await UserModel.findOne({
				where: {
					id: id,
				},
			});
			if (await result.comparePassword(oldPassword)) {
				const user = await UserModel.update(
					{
						password: newPassword,
					},
					{
						where: {
							id: id,
						},
					}
				);
				if (user[0] == 1) {
					return {
						data: 'updated successfully',
						code: httpStatus.UPDATED,
					};
				} else {
					return {
						data: 'something wrong happened',
						code: httpStatus.BAD_REQUEST,
					};
				}
			} else {
				return {
					data: 'password is not correct',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

module.exports = User;
