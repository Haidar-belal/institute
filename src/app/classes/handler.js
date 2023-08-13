const Class = require('./service');

module.exports = {
	add: async (req, res) => {
		const data = req.body.title;
		const result = await new Class(data).add();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const data = req.body.title;
		const classId = req.body.classId;
		const result = await new Class(data).update(classId);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteClass: async (req, res) => {
		const id = req.params.id;
		const result = await Class.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await Class.get();
		res.status(result.code).send({
			data: result.data,
		});
	},
};
