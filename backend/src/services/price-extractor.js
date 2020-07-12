const logger = require('../utils/logger');
const parser = require('node-html-parser');

class PriceExtractor {

    constructor() {
    }

    extractPrice(product) {
        logger.info(`Extracting price for ${product.toString()}`);
        product.priceSources.forEach((priceSource) => {

        });
    }

    extractPriceFromPriceSource(priceSource) {

    }

    textToPriceAndCurrency(text) {
        return {
            price: this.textToPrice(text),
            currency: this.textToCurrency(text)
        }
    }

    /**
     * Extracts the currency, ignoring the price.
     * @param text - the input text to be processed.
     * @returns {string} - the found currency
     */
    textToCurrency(text) {
        const currencyText = text.toLowerCase().match(/(ron|euro|dollar|\$|€)/g);
        if (currencyText === null || currencyText.length !== 1) {
            throw new Error('Given text does not contain exactly one currency!');
        }
        return currencyText[0];
    }

    /**
     * Extracts the price, ignoring the decimals.
     * E.g. a price of 123.43 will be returned as 12343.
     * @param text - the input text to be processed.
     * @returns {number} the actual value
     */
    textToPrice(text) {
        const noSpaceText = text.replace(/[\s,.]/g, '');
        const priceText = noSpaceText.match(/[1-9][0-9]*/g);
        if (priceText === null || priceText.length !== 1) {
            throw new Error('Given text does not contain exactly one price!');
        }
        return parseInt(priceText[0]);
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
