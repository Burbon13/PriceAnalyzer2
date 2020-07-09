const logger = require('./src/utils/logger');

class PriceExctractor {

    extractPrice(product) {
        logger.info(`Extracting price for ${product.toString()}`);
        product.priceSources.forEach((priceSource) => {

        });
    }

    _extractPriceFromPriceSource(priceSource) {

    }
}
