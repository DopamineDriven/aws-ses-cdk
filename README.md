# aws-ses-cdk

# Extended from [Lee Robinson's](https://github.com/leerob/nextjs-aws-s3/tree/bf9a48055f51e1993d86dbdd3c1cfcb3ed361c0d) example

## Step 1

- create a programmatic IAM user with the following FullAccess Policies
  - AmazonS3
  - AmazonSES
  - AmazonSNS
  - AWSCloudFormation

## Step 2

- save the access key and secret key of the newly created programmatic IAM user to your .env.local file

## Use multiple aws accounts from command line

- https://stackoverflow.com/questions/593334/how-to-use-multiple-aws-accounts-from-the-command-line#:~:text=You%20can%20work%20with%20two,region%2C%20so%20have%20them%20ready.&text=You%20can%20then%20switch%20between,the%20profile%20on%20the%20command.
