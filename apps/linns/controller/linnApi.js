const fetch = require('node-fetch');
const LinnsAuthentication = require("./auth/linns-auth");

async function LinnsApi(endpoint, method, body) {
    let linnsAuth = await LinnsAuthentication.LinnsAuth();
    let url = `${linnsAuth.Server}/api${endpoint}?`;

    const api_call = await fetch(url, {
        headers: {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript',
            'Accept-Language': 'en',
            'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8',
            'Accept-Encoding': 'gzip, deflate',
            //token
            'Authorization': linnsAuth.Token,
        },
        method: method,
        body: body
    }
    );

    const data = await api_call.json();

    return data
}
module.exports = {
    LinnsApi
}