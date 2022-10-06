var express = require('express');
var router = express.Router();
router.use('/linns', require('../apps/linns/router/router'))

router.get("/", (req, res) => {
    res.status(200).send("Amazon Api Endpoint")
})

module.exports = router;