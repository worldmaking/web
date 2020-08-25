let logger = require('./gp-logger');
const readline = require("readline");
const inquery = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.choose = function(question, answer = []){
    ret = null;
    inquery.question(`> ${question} [${answer}] `, (out) => {
        if (answer.includes(out)){
            ret = out;  
            inquery.close();
        }
        else
            ret = this.choose(question, answer);
    });
    return ret;
}

exports.bool = function(question){
    return new Promise(function(resolve){
        ret = null;
        answer = ['y','n']
        inquery.question(`> ${question} [${answer}] `, (out) => {
            ret = out;  
            inquery.close();
        });
        if (ret == 'y')
            resolve = true;
        else
            resolve = false;
        return resolve;
    });
}