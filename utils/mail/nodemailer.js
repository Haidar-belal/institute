const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'atechconcept@gmail.com',
		pass: 'A7m@d-T@h@',
	},
});

module.exports = {
	sendVerificationCode: async (email) => {
		try {
			const code = Math.random().toString(8).substring(3, 9);
			const mailOptions = {
				from: 'atechconcept@gmail.com',
				to: email,
				subject: 'Al-Sabbagh Institute verification code',
				html: '<h3>Please enter this code <u>' + code + ' </u> to reset your password </h3>',
			};
			await transporter.sendMail(mailOptions);
			return code;
		} catch (error) {
			return undefined;
		}
	},
};
