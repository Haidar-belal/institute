const Report = require('./service');

module.exports = {
	add: async (req, res) => {
		const data = req.body;
		const id = req.user.id;
		const result = await new Report(data, id).add();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const data = req.body;
		const id = req.body.id;
		const result = await new Report(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteReport: async (req, res) => {
		const id = req.params.id;
		const result = await Report.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await Report.get();
		res.status(result.code).send({
			data: result.data,
		});
	},

	getById: async (req, res) => {
		const id = req.user.id;
		const result = await Report.getReportsPerson(id);
		res.status(result.code).send({
			data: result.data,
		});
	},
};
