# This is a super simple utility script
> Input a string with many colons `:` and knock off anything after the last one.
I use it to de-qualify fully qualified ARNs of lambdas.


> you can add `-q` to instead return what qualifies

```$ npm install -g dequalify`
then: `someProcessThatOutputsARN | dequalify | whatever output```

or: ```aws lambda update-alias --function-name $(someProcessThatOutputsARN | dequalify) -- name PROD --function-version $(someProcessThatOutputsARN | dequalify -q)```
