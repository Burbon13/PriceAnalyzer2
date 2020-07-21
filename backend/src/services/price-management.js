const logger = require('../utils/logger');

/**
 *
 */
class PriceManagement {

    /**
     * @param productRepository
     * @param priceRepository
     * @param priceExtractor
     */
    constructor(productRepository, priceRepository, priceExtractor) {
        this.productRepository = productRepository;
        this.priceRepository = priceRepository;
        this.priceExtractor = priceExtractor;
    }

    /**
     * Adds the product and fetches the current prices from the given urls.
     * @param name - the name of the product.
     * @param brand - the brand of the product.
     * @param urls - array of the multiple product addresses (strings).
     */
    async addProduct(name, brand, urls) {
        logger.info(`Adding new product with name="${name}" brand="${brand}" `
            + ` urls="${JSON.stringify(urls, null, 2)}"`);
        const newProduct = new Product(name, brand, new Date(), urls);
        const insertedProduct = await this.productRepository.add(newProduct);
        const prices = this.priceExtractor.extractPrices(insertedProduct);
        await this.priceRepository.add(prices);
        logger.info(`New product added and prices were fetched successfully`);
    }

    /**
     *
     * @param productId
     */
    deleteProduct(productId) {
        // TODO
    }

    /**
     *
     * @param productId
     */
    fetchLatestPrice(productId) {
        // TODO
    }
}

module.exports = PriceManagement;
