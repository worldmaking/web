exports.alert = function(...arg){
    console.log("\x1b[41m\x1b[37mWarning: "+Stringify(arg)+"\x1b[0m")
}

exports.clear = function(...arg){
    console.log("\x1b[42m\x1b[30mSuccess: "+Stringify(...arg)+"\x1b[0m")
}

exports.warn = function(...arg){
    console.log("\x1b[43m\x1b[30mWARNING: "+Stringify(arg)+"\x1b[0m")
}

exports.note = function(...arg){
    console.log("\x1b[45m\x1b[30mNOTICE: "+Stringify(arg)+"\x1b[0m");
}
exports.log = function(...arg){
    console.log("\x1b[36m"+Stringify(arg)+"\x1b[0m");
}

function Stringify(...arg){
    var str = "";
    for(item of arg){
        str = str + item + " ";
        str = str.replace(',', ' ')
    }
    return str;
}