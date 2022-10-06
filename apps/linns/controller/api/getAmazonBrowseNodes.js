const LinnsApi = require("../linnApi");

async function getAmazonBrowseNodes(site, category) {
  var endpoint = "/Listings/GetAmazonBrowseNodes";
  var method = "POST";
  var body = JSON.stringify({
    site: site,
    category: category,
  });
  const data = await LinnsApi.LinnsApi(endpoint, method, body);
  console.log(data);
  return data;
}

module.exports = {
  getAmazonBrowseNodes,
};
