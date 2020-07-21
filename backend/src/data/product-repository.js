const Datastore = require('nedb-promises');
const logger = require('../utils/logger');

class ProductRepository {

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
     * Searches for ONE product based on the given props.
     * @param props - Object which contains the search criterions, sample: {name: 'iPhone'}.
     * @returns {Promise<Document>}
     */
    findOne(props) {
        logger.info(`Retrieving one product with ${JSON.stringify(props, null, 2)}`);
        return this.store.findOne(props);
    }

    /**
     * Searches for all the products which meet the given props.
     * @param props - Object which contains the search criterions, sample: {name: 'iPhone'}.
     * @returns {Nedb.Cursor<Document[]>}
     */
    find(props) {
        logger.info(`Retrieving products with ${JSON.stringify(props, null, 2)}`);
        return this.store.find(props);
    }

    /**
     * Saves a product to the database.
     * @param product - Product instance.
     * @returns {Promise<any>}
     */
    add(product) {
        logger.info(`Adding new product ${product.toString()}`);
        return this.store.insert(product);
    }

    /**
     * Removes ONE product which meets the props.
     * @param props - Object which contains the search criterions, sample: {name: 'iPhone'}.
     * @returns {Promise<number>}
     */
    removeOne(props) {
        logger.info(`Removing product with ${JSON.stringify(props, null, 2)}`);
        return this.store.remove(props, {});
    }

    /**
     * Removes all the products which meet the props.
     * @param props - Object which contains the search criterions, sample: {name: 'iPhone'}.
     * @returns {Promise<number>}
     */
    remove(props) {
        logger.info(`Removing all products`);
        return this.store.remove(props, {multi: true});
    }

    /**
     * Updates ONE product which meets the props. Does not delete other values, only override the
     * specified ones.
     * @param props - Object which contains the search criterions, sample: {name: 'iPhone'}.
     * @param newValues - Values to be set, sample: {brand: 'Samsung'}.
     * @returns {Promise<number>}
     */
    updateOne(props, newValues) {
        logger.info(`Updating product with ${props} to ${newValues.toString()}`);
        return this.store.update(props, {$set: newValues});
    }
}

module.exports = ProductRepository;
