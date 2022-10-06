const fetch = require('node-fetch');
const linnworksUrl = 'https://api.linnworks.net//api/'
const action = 'Auth/AuthorizeByApplication?'
const config = require('config');
const linssConfig = config.get('Linnworks.auth')
const applicationId = linssConfig.applicationId;
const applicationSecret = linssConfig.applicationSecret;
const tokenId = linssConfig.token;

var surl = `${linnworksUrl}${action}`;

const LinnsAuth = async () => {
    const api_call = await fetch(surl, {
        method: 'POST',
        body: JSON.stringify({
            "ApplicationId": applicationId,
            "ApplicationSecret": applicationSecret,
            "Token": tokenId,
        })
    }).catch((error) => {
        console.log(error)
    });
    const data = await api_call.json();
    return data;
}

module.exports = {
    LinnsAuth
}