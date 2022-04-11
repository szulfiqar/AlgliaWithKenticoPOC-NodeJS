import express from 'express';
const algoliasearch = require("algoliasearch");
const client = algoliasearch("T294KCFK6N", "2e0f9df4a1bf827fc36f086a9f316994");
const index = client.initIndex("poc_index_1");
const router = express.Router()

router.get('/search/:q', async (req, res) => {
    let result = null;
    try {
        result = await index.search(req.params.q);
    } catch (error) {
        console.log(error)
    }
    return res.json({ success: true, data: result, message: 'Request successful!' })
});

router.post('/create', async (req, res) => {
    let result = null;
    try {
        const indexObjects = [{
            title: "Blackberry and blueberry pie",
            description: "A delicious pie recipe that combines blueberries and blackberries.",
            image: "https://yourdomain.com/blackberry-blueberry-pie.jpg",
            likes: 1128,
            sales: 284,
            categories: ["pie", "dessert", "sweet"],
            gluten_free: false
        }];
        result = await index.saveObjects(indexObjects, { autoGenerateObjectIDIfNotExist: true });
    } catch (error) {
        console.log(error)
    }
    return res.json({ success: true, data: result, message: 'Request successful!' })
});

export default router;