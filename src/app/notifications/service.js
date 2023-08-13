const { httpStatus, console, logger } = require('../../../utils/index');

const NotificationModel = require('./models/Notification');
const UserModel = require('../users/models/User');
const { Op } = require('sequelize');
const msg = ' تحديد موعد ';
class Notification {
	constructor(data) {}

	async add(data, io, idS) {
		try {
			let nots = [];
			idS.map((id) => {
				const obj = {
					title: data.title,
					body: data.body,
					userId: id,
				};
				nots.push(obj);
			});
			const result = await NotificationModel.bulkCreate(nots);
			const users = await UserModel.findAll({
				where: { id: { [Op.in]: idS } },
				attributes: ['username'],
			});
			users.map((username) => {
				io.emit(username.username, {
					title: data.title,
					message: data.body,
				});
			});
			return {
				data: result,
				code: httpStatus.CREATED,
			};
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getNew(id, io) {
		try {
			const result = await NotificationModel.findAll({
				where: {
					userId: id,
					isNotify: false,
				},
			});
			const username = await UserModel.findOne({
				where: {
					id: id,
				},
				attributes: ['username'],
			});
			result.map((notification) => {
				io.emit(username.username, {
					title: notification.title,
					message: notification.body,
				});
			});
			await NotificationModel.update(
				{
					isNotify: true,
				},
				{
					where: {
						userId: id,
						isNotify: false,
					},
				}
			);
			return {
				data: 'done',
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async unreadNotifications(id) {
		try {
			const result = await NotificationModel.findAll({
				where: {
					userId: id,
					isRead: false,
				},
			});
			return {
				data: result.length,
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async getAll(id) {
		try {
			const result = await NotificationModel.findAll({
				where: {
					userId: id,
				},
				order: [['createdAt', 'DESC']],
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

	static async update(id) {
		try {
			await NotificationModel.update(
				{
					isRead: true,
				},
				{
					where: {
						userId: id,
						isRead: false,
					},
				}
			);
			return {
				data: 'updated',
				code: httpStatus.OK,
			};
		} catch (error) {
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

module.exports = Notification;
