const logger = require('../utils/logger');
const parser = require('node-html-parser');

class PriceExtractor {

    extractPrice(product) {
        logger.info(`Extracting price for ${product.toString()}`);
        product.priceSources.forEach((priceSource) => {

        });
    }

    extractPriceFromPriceSource(priceSource) {

    }

    /**
     * Retrieves the text inside a HTML tag (INCLUDING SUB-ELEMENTS' TEXTS).
     * If multiple HTML tags have the same class, the first one is chosen.
     * @param html - the web page to be parsed
     * @param tagClass - the class of the tag to be searched
     * @returns {string} - the text inside of the tag if found, null otherwise
     */
    retrieveTextFromHtmlClassTag(html, tagClass) {
        logger.info(`Retrieving text from html class tag = "${tagClass}"`);
        const element = parser.parse(html).querySelector(`.${tagClass}`);
        if (element === null) {
            return null;
        }
        return element.text;
    }

    /**
     * Retrieves the text inside a HTML tag (INCLUDING SUB-ELEMENTS' TEXTS).
     * @param html - the web page to be parsed
     * @param tagId - the id of the tag to be searched
     * @returns {string} - the text inside of the tag if found, null otherwise
     */
    retrieveTextFromHtmlIdTag(html, tagId) {
        logger.info(`Retrieving text from html id tag = "${tagId}"`);
        const element = parser.parse(html).querySelector(`#${tagId}`);
        if (element === null) {
            return null;
        }
        return element.text;
    }
}

module.exports = PriceExtractor;
