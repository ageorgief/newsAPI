const Router  = require("koa-router");
const bodyParser = require('koa-bodyparser');
const router = new Router();

router.use(bodyParser());

module.exports = router;