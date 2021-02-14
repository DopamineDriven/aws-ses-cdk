const s3 = require('@aws-cdk/aws-s3');
const ses = require('@aws-cdk/aws-ses');
const actions = require('@aws-cdk/aws-ses-actions');
const sns = require('@aws-cdk/aws-sns');
const core = require('@aws-cdk/core');

class HelloCdkStack extends core.Stack {
	constructor(scope, id, props) {
		super(scope, id, props);

		const bucket = new s3.Bucket(this, 'Bucket', {
			versioned: true,
			removalPolicy: core.RemovalPolicy.DESTROY,
			accessControl: 'Private',
			publicReadAccess: false,
			cors: [
				{
					allowedHeaders: ['*'],
					allowedMethods: ['POST'],
					allowedOrigins: ['*']
				}
			]
		});
		const topic = new sns.Topic(this, 'Topic', {
			versioned: true,
			removalPolicy: core.RemovalPolicy.DESTROY,
			accessControl: 'Private',
			publicReadAccess: false,
			cors: [
				{
					allowedHeaders: ['*'],
					allowedMethods: ['POST'],
					allowedOrigins: ['*']
				}
			]
		});

		new ses.ReceiptRuleSet(this, 'RuleSet', {
			rules: [
				{
					recipients: [
						'aws.com',
						'drisdell.com',
						'andrew@windycitydevs.io',
						'resumes@drisdellconsulting.com',
						'mary.drisdell@drisdellconsulting.com',
						'drisdell-headless.com'
					],
					actions: [
						new actions.AddHeader({
							name: 'X-Special-Header',
							value: 'aws'
						}),
						new actions.S3({
							bucket,
							objectKeyPrefix: 'emails/',
							topic
						})
					]
				},
				{
					recipients: [
						'aws.com',
						'drisdell.com',
						'andrew@windycitydevs.io',
						'resumes@drisdellconsulting.com',
						'mary.drisdell@drisdellconsulting.com',
						'drisdell-headless.com'
					],
					actions: [
						new actions.Sns({
							topic
						})
					]
				}
			]
		});
	}
}

module.exports = { HelloCdkStack };
