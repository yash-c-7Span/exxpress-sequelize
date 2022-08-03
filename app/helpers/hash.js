const Crypto = require("crypto-js");
const Config = require("../config.json");

function encrypt(str){
    str = Crypto.AES.encrypt(str, Config.auth_key);
    return str.toString();
}

function decrypt(str){
    str = Crypto.AES.decrypt(str, Config.auth_key);
    return str.toString(Crypto.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}