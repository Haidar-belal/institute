const { httpStatus, console } = require('../../../utils/index');

const ReportModel = require('./models/Report');
const User = require('../users/models/User');

class Report {
	constructor(data, id) {
		this.body = data.body;
		this.userId = id;
	}

	async add() {
		try {
			const result = await ReportModel.create(this);
			const date = result.date.toLocaleString();
			const data = {
				id: result.id,
				body: result.body,
				date: date.substring(0, 15) + date.substring(18, 22),
			};
			return {
				data: data,
				code: httpStatus.CREATED,
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
			const result = await ReportModel.update(this, {
				where: {
					id: id,
				},
			});
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
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			const result = await ReportModel.destroy({
				where: {
					id: id,
				},
			});
			if (result === 1) {
				return {
					data: 'deleted',
					code: httpStatus.DELETED,
				};
			} else {
				console.error(result);
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async get() {
		try {
			const result = await ReportModel.findAll({
				order: [['createdAt', 'DESC']],
				include: {
					model: User,
					attributes: ['email', 'name', 'mobilePhone', 'phone', 'gender', 'address'],
				},
			});
			let data = [];
			for (let i of result) {
				let date = i.date.toLocaleString();
				const report = {
					id: i.id,
					body: i.body,
					date: date.substring(0, 15) + date.substring(18, 22),
					email: i.User.email,
					name: i.User.name,
					mobilePhone: i.User.mobilePhone,
					phone: i.User.phone,
					gender: i.User.gender,
					address: i.User.address,
				};
				data.push(report);
			}
			return {
				data: data,
				code: httpStatus.OK,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getReportsPerson(id) {
		try {
			const result = await ReportModel.findAll({
				where: {
					userId: id,
				},
				order: [['createdAt', 'DESC']],
			});
			let data = [];
			for (let i of result) {
				let date = i.date.toLocaleString();
				const report = {
					id: i.id,
					body: i.body,
					date: date.substring(0, 15) + date.substring(18, 22),
				};
				data.push(report);
			}
			return {
				data: data,
				code: httpStatus.OK,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

module.exports = Report;
