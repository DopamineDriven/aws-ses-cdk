const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
module.exports = async function handler(req, res) {
	aws.config.update({
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_KEY,
		region: process.env.REGION,
		signatureVersion: 'v4'
	});
	const text = 'this is some text';
	const emailAddress = 'andrew@windycitydevs.io';
	const name = 'Andrew Ross';
	const subject = 'This is a subject via aws cdk';

	const ccAddress = 'andrew.simpson.ross@gmail.com';
	const bccAddress = 'andrew@windycitydevs.io';
	const toAddress = 'andrew@windycitydevs.io';

	const body_subject = `Contact Us Submission Event - ${subject}`;
	const body_text = `Contact Us Form Submission via AWS SES & Nodemailer
---------------------------------------------------------
${text}
`;
	const body_html = `<html>
<head></head>
<body>
    <h1>${subject}</h1>
    \n
    <h2>Name: ${name}</p>
    \n
    <h2>email: ${emailAddress}</h2>
    \n
    <p>${text}</p>
</body>
</html>`;

	const ses = new aws.SES();
	const email = await ses.sendEmail({
		Bucket: process.env.BUCKET_NAME,
		Fields: {
			key: req.query.Fields
		},
		Expires: 60, // seconds
		Conditions: [
			['content-length-range', 0, 1048576] // up to 1 MB
		]
	});
	let transporter = nodemailer.createTransport({
		host: 'email-smtp.us-east-1.amazonaws.com',
		port: 465,
		secure: true,
		auth: {
			accessKeyId: process.env.ACCESS_KEY,
			secretAccessKey: process.env.SECRET_KEY
		}
	});
	let mailOptions = {
		sender: email,
		from: emailAddress,
		to: toAddress,
		cc: ccAddress,
		bcc: bccAddress,
		subject: body_subject,
		text: body_text,
		html: body_html
	};
	let response = transporter.sendMail(mailOptions, (info, err) => {
		if (!err)
			console.log(
				'\n info.message: ',
				info?.message,
				'\n info.stack: ',
				info?.stack,
				'\n info.name: ',
				info?.name
			);
		console.log(err);
		return info;
	});
	if (response === typeof Error) {
		return res.status(400).json({
			error:
				'There was an internal error ⚙... \n Shoot me an email at [Mary.Drisdell@drisdellconsulting.com]'
		});
	}
	return res.status(200).json({ error: '', data: response ?? '' });
};
