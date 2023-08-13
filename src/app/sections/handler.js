const Section = require('./service');

module.exports = {
	add: async (req, res) => {
		const data = req.body;
		const result = await new Section(data).add();
		res.status(result.code).send({
			data: result.data,
			token: result.token,
		});
	},

	update: async (req, res) => {
		const data = req.body;
		const id = req.body.sectionId;
		const result = await new Section(data).update(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	deleteSection: async (req, res) => {
		const id = req.body.sectionId;
		const result = await Section.delete(id);
		res.status(result.code).send({
			data: result.data,
		});
	},

	getAll: async (req, res) => {
		const result = await Section.get();
		res.status(result.code).send({
			data: result.data,
		});
	},
};
