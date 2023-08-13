const Notification = require('./service');

module.exports = {
	add: async (notification, io, idS) => {
		const result = await new Notification({}).add(notification, io, idS);
		return 'done';
	},

	getNew: async (req, res) => {
		if (req.user) {
			const id = req.user.id;
			const io = req.app.get('socketio');
			const result = await Notification.getNew(id, io);
			res.status(result.code).send({
				data: result.data,
			});
		}
	},

	unreadNotifications: async (req, res) => {
		const id = req.user.id;
		const result = await Notification.unreadNotifications(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const id = req.user.id;
		const result = await Notification.getAll(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	update: async (req, res) => {
		const id = req.user.id;
		const result = await Notification.update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	createNotesAbsent: async (req, res) => {
		const id = req.body.user;
		const io = req.app.get('socketio');
		const notification = {
			title: req.body.course,
			body: req.body.body,
		};
		let idS = [];
		idS.push(id);
		const result = await new Notification({}).add(notification, io, idS);
		res.status(result.code).send({
			data: 'done',
		});
	},
};
