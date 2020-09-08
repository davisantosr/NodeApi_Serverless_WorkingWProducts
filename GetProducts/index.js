const createMongoClient = require('../shared/mongoClient');

// function to get products
//To create a new func (serverless) using azure function core tool library a new command func new is needed
module.exports = async function (context, req) {

    const{ client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');
    const res = await Products.find({})
    const body = await res.toArray();

    closeConnectionFn();

    context.res = {
        status: 200,
        body
    };
}