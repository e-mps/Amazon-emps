var express = require("express");
var router = express.Router();
const linnsController = require("../controller/linnworks");
router.get("/", (req, res) => {
  res.status(200).send("Linnworks Api Endpoint");
});
router.post("/test", (req, res) => {
  res.status(200).send("Test Successful");
});
router.post("/getAmazonCategories", linnsController.amazonCategories);
router.post("/getCategoryAttributes", linnsController.categoryXMLAttributes);
router.post("/getAmazonBrowseNodes", linnsController.getAmazonBrowseNodes);
module.exports = router;
