const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const News = require('../models/news');
const { default: mongoose } = require('mongoose');
const newsValidationSchema = require('../validation/newsSchema');

router.use(bodyParser());

// Create Route
router.post("/news", async (context) => {
    if (Object.keys(context.query).length != 0) {
        context.response.status = 400;
        return;
    }

    const body = context.request.body
    const { error, value } = newsValidationSchema.validate(body, {
        abortEarly: false,
    });
    if (error) {
        context.response.status = 400;
        context.body = error.details;
        return;
    }

    const news = new News({
        _id: new mongoose.Types.ObjectId,
        date: new Date(),
        title: body.title,
        description: body.description,
        text: body.text
    });

    await news.save()
        .then(result => {
            console.log(result);
            context.response.status = 201;
            context.body = value;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 500;
        });
});

// Read Route 
router.get("/news", async (context) => {
    let filterBy = context.query.filterBy;
    let sortBy = context.query.sortBy;
    console.log(filterBy);
    console.log(sortBy);


    let query = News.find();

    if (filterBy) {
        if (!Array.isArray(filterBy)) {
            filterBy = Array.of(filterBy);
            
        } 

        for (const filter of filterBy) {
            const [field, value] = filter.split('~');
            if (field === 'date') {
                if (!(/^\d{4}-\d{2}-\d{2}$/.test(value))) {
                    context.response.status = 400; 
                    return;
                }
                const date = new Date(value);
                const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // extract the date portion only
                query = query.where(field).gte(dateOnly).lt(new Date(dateOnly.getTime() + 24 * 60 * 60 * 1000));
            } else {
                query = query.where(field).regex(new RegExp(value, 'i'));
            }
        }
    }

    if (sortBy) {
        if (!Array.isArray(sortBy)) {
            sortBy = Array.of(sortBy);
        } 

        const sortParams = sortBy.map(param => {
            const [field, direction] = param.split('~');
            return [field, direction === 'desc' ? -1 : 1];
        });

        query = query.sort(sortParams);
    }

    await query.exec()
        .then((doc) => {
            console.log(doc);
            context.response.status = 200;
            context.body = doc;
        })
        .catch((err) => {
            console.log(err);
            context.response.status = 500;
        });
});


// Read Route for id
router.get("/news/:id", async (context) => {
    const id = context.params.id;

    await News.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            context.response.status = 200;
            context.body = doc;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 500;
        });
});


// Update Route
router.put("/news/:id", async (context) => {
    const id = context.params.id
    const body = context.request.body;

    const { error, value } = newsValidationSchema.validate(body, {
        abortEarly: false,
    });
    if (error) {
        context.response.status = 400;
        context.body = error.details;
        return;
    }

    const currentDate = { date: Date.now() };
    const updatedBody = Object.assign({}, body, currentDate);

    await News.updateOne({ _id: id }, { $set: updatedBody })
        .exec()
        .then(result => {
            console.log(result);
            context.response.status = 200;
            context.body = value;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 500;
        });
});

// Delete Route
router.delete("/news/:id", async (context) => {
    const id = context.params.id

    await News.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            context.response.status = 200;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 500;
        });
});

module.exports = router;