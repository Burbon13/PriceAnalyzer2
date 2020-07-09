const Datastore = require('nedb-promises');
const logger = require('../utils/logger');

class ProductRepository {
    constructor(options) {
        logger.info(`Initializing Datastore with options ${options}`);
        this.store = Datastore.create(options);
    }

    findOne(props) {
        logger.info(`Retrieving one product with ${props}`);
        return this.store.findOne(props);
    }

    add(product) {
        logger.info(`Adding new product ${product.toString()}`);
        return this.store.insert(product);
    }

    remove(props) {
        logger.info(`Removing product with ${props}`);
        return this.store.remove(props);
    }
}

module.exports = new ProductRepository(({filename: './db/products.json', autoload: true}));
