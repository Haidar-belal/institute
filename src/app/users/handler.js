const _ = require('lodash');
const User = require('./service');

module.exports = {
	register: async (req, res) => {
		const data = req.body;
		const result = await new User(data).register();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	login: async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		const result = await User.login(username, password);
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const id = req.body.studentId || req.user.id;
		const data = req.body;
		const result = await new User(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	updateActivation: async (req, res) => {
		const id = req.body.studentId;
		const isActive = req.body.status;
		const result = await User.updateActivation(id, isActive);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteUser: async (req, res) => {
		const id = req.params.id;
		const result = await User.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await User.get();
		res.status(result.code).send({
			data: result.data,
		});
	},

	sendMail: async (req, res) => {
		const email = req.body.email;
		const result = await User.sendMail(email);
		res.status(result.code).send({
			data: result.data,
		});
	},

	checkCode: async (req, res) => {
		const email = req.body.email;
		const code = req.body.code;
		const result = await User.checkCode(email, code);
		res.status(result.code).send({
			data: result.data,
		});
	},

	resetPassword: async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const result = await User.resetPassword(password, email);
		res.status(result.code).send({
			data: result.data,
		});
	},

	updatePassword: async (req, res) => {
		const id = req.user.id;
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.newPassword;
		const result = await User.updatePassword(id, oldPassword, newPassword);
		res.status(result.code).send({
			data: result.data,
		});
	},
};
