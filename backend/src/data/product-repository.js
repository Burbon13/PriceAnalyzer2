const Datastore = require('nedb-promises');
const logger = require('../utils/logger');

class ProductRepository {
    constructor(filename) {
        logger.info(`Initializing Datastore with filename ${filename}`);
        this.store = Datastore.create({
            filename: filename,
            autoload: true
        });
    }

    findOne(props) {
        logger.info(`Retrieving one product with ${JSON.stringify(props, null, 2)}`);
        return this.store.findOne(props);
    }

    find(props) {
        logger.info(`Retrieving products with ${JSON.stringify(props, null, 2)}`);
        return this.store.find(props);
    }

    add(product) {
        logger.info(`Adding new product ${product.toString()}`);
        return this.store.insert(product);
    }

    removeOne(props) {
        logger.info(`Removing product with ${JSON.stringify(props, null, 2)}`);
        return this.store.remove(props);
    }

    remove(props) {
        logger.info(`Removing all products`);
        return this.store.remove(props, {multi: true});
    }
}

module.exports = ProductRepository;
