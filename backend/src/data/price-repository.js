const Datastore = require('nedb-promises');
const logger = require('../utils/logger');

/**
 *
 */
class PriceRepository {

    /**
     * @param filename - Relative path where the DB will be created and exist.
     */
    constructor(filename) {
        logger.info(`Initializing Datastore with filename ${filename}`);
        this.store = Datastore.create({
            filename: filename,
            autoload: true
        });
    }

    /**
     *
     * @param price
     * @returns {Promise<any>}
     */
    add(price) {
        logger.info(`Adding new price ${product.toString()}`);
        return this.store.insert(price);
    }

    /**
     *
     * @param productId
     * @returns {Nedb.Cursor<Document[]>}
     */
    getProductPrices(productId) {
        logger.info(`Retrieving prices for productId="${productId}"`);
        return this.store.find({productId: productId});
    }

    /**
     *
     * @param productId
     * @returns {Promise<number>}
     */
    deleteProductPrices(productId) {
        logger.info(`Removibng prices for productId="${productId}"`);
        return this.store.remove({productId: productId}, {multi: true});
    }
}

module.exports = PriceRepository;
