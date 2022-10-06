const LinnsApi = require("../linnApi")

async function getAmazonCategories() {
    var endpoint = '/Listings/GetAmazonCategories';
    var method = 'POST';
    var body = JSON.stringify({
    });
    const data = await LinnsApi.LinnsApi(endpoint, method, body)
    console.log(data);
    return data
}

module.exports = {
    getAmazonCategories
}