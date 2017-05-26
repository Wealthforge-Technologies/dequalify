## This is a super simple utility script
> Input a string with many colons `:` and knock off anything after the last one.
I use it to de-qualify fully qualified ARNs of lambdas.

# `npm install -g dequalify`.

or `npm install -g` from within where you clone this if you roll that way.

# use
This is expected to be installed to your $PATH, and used as a single use parser in larger scripts via `|`.

Pass in a fully qualified ARN, Get an unqualified ARN back.

`echo "arn:aws:lambda:region:account-id:function:function-name:version" | dequalify`

for example would return

`arn:aws:lambda:region:account-id:function:function-name`

You can add `-q` to instead return what qualifies:
`echo "arn:aws:lambda:region:account-id:function:function-name:version" | dequalify -q` for example would return `version`.


> If you'd like to find a use for this script in your day to day CI/CD: Here's how we use it.
Local environments use [Apex](http://apex.run), and each function within a project has it's own git repo. There are thoughts on project level repos #WIP.
When a change is ready to go into the CI/CD pipeline, commit to the develop branch.
Build server picks up the changes and runs something like:

```
# clean up after yourself
rm -rf lambda.zip
rm -f ARN
rm -f log
rm -f .gitignore
rm -rf .git

# Generate code to send to AWS
zip -r lambda.zip .
# send it to AWS and save a log
aws lambda update-function-code --function-name YourLambdaFunctionHere --publish --zip-file fileb://./lambda.zip > log
# parse that log to grab the full ARN to an artifact that can be used to deploy arbitrarily later
cat ./log
cat ./log | grep FunctionArn | cut -d '"' -f4 > ARN
cat ARN
```

> That build generates an ARN that you can use to deploy to different environments using aliases. Hence this script that _literally everybody_* will have use for.
Give the `aws lambda update-alias --function-name $(cat ARN | dequalify) --name YourEnvironmentHere --function-version $(cat ARN | dequalify -q)` script an alias that your environment points to.
Boom.
CD.


> >PS. Dear Amazon. Lambdas are awesome. Please let me choose the version number when publishing one. I'd like to have that control back.
Sincerely,
@excenter
