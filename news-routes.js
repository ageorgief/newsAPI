const Router  = require("koa-router");
const bodyParser = require('koa-bodyparser');
const { News, news } = require("./News");
const router = new Router();

router.use(bodyParser());

//Read Route for id
router.get("/news/:id", async (context) => {
    const id = context.params.id;
    context.body = news[id];
});

//Read Route 
router.get("/news", async (context) => {
    context.body = news;
});

module.exports = router;