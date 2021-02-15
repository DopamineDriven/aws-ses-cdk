# aws-ses-cdk

# Extended from [Lee Robinson's](https://github.com/leerob/nextjs-aws-s3/tree/bf9a48055f51e1993d86dbdd3c1cfcb3ed361c0d) example

## Step 1

- create a programmatic IAM user with the following FullAccess Policies via the AWS-CLI
  - AmazonS3
  - AmazonSES
  - AmazonSNS
  - AWSCloudFormation

## Step 2

- save the access key and secret key of the newly created programmatic IAM user to your .env.local file

## AWS Terminology

### CDK: Cloud Development Kit

### Constructs: basic building blocks of AWS CDK apps

> a construct represents a "cloud component" and encapsulates everything AWS CloudFormation needs to create the component

### [Construct Initialization](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html#constructs_lib)

- Implemented in Classes that Extend the Construct base class
- All Constructs take Three parameters upon initialization
  - 1. Scope
    - The construct within which this construct is defined. You should usually pass this for the scope, because it represents the current scope in which you are defining the construct.
  - 2. id
    - An identifier that must be unique within this scope. The identifier serves as a namespace for everything that's defined within the current construct and is used to allocate unique identities such as resource names and AWS CloudFormation logical IDs.
    - Only need to be unique within a scope
  - 3. Props
    - A set of properties or keyword arguments, depending upon the language, that define the construct's initial configuration. In most cases, constructs provide sensible defaults, and if all props elements are optional, you can leave out the props parameter completely.
- **L2 Constructs** are used in this repo

## Use multiple aws accounts from command line

- https://stackoverflow.com/questions/593334/how-to-use-multiple-aws-accounts-from-the-command-line#:~:text=You%20can%20work%20with%20two,region%2C%20so%20have%20them%20ready.&text=You%20can%20then%20switch%20between,the%20profile%20on%20the%20command.
