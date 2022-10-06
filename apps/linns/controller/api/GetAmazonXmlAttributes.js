const LinnsApi = require("../linnApi")

async function getAmazonXmlAttributes(site, categoryName, subCategory) {
    var endpoint = '/Listings/GetAmazonXmlAttributes';
    var method = 'POST';
    var body = JSON.stringify({
        'site': site,
        'categoryName': categoryName,
        'subCategory': subCategory
    });

    const data = await LinnsApi.LinnsApi(endpoint, method, body)
    console.log(data);
    return data

}

module.exports = { getAmazonXmlAttributes }