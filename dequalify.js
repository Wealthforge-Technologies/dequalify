#!/usr/bin/env node
var inputString = '';
var qualify = false;
if(process.argv.length > 1 && process.argv[process.argv.length - 1] === '-q'){
    qualify = true;
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
    inputString += chunk;
});
process.stdin.on('end', function() {
    callback(inputString)
});
callback = (data) => {
    var midParse = data.replace(/(\r\n|\n|\r)/gm,"").split(':');
    var qualification = midParse.pop();
    if(qualify){
        process.stdout.write(qualification);
    }
    else{
        process.stdout.write(midParse.join(':'));
    }

};
