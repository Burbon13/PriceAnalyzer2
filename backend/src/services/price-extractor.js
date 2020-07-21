const logger = require('../utils/logger');
const parser = require('node-html-parser');
const extractDomain = require('extract-domain');
const extractorConfig = require('./config');
const fetch = require("node-fetch");

/**
 *
 */
class PriceExtractor {

    /**
     *
     */
    constructor() {
        this.extractorConfig = extractorConfig;
    }

    /**
     *
     * @param product
     * @returns {[]}
     */
    extractPrices(product) {
        logger.info(`Extracting price for ${product.toString()}`);
        const prices = [];
        product.priceSources.forEach((priceSource) => {
            prices.push(this.extractPriceFromPriceSource(priceSource));
        });
        return prices;
    }

    /**
     * Given a price source (url), the domain will be determined and the price +
     * currency will be retrieved from the HTML page. If the domain is unknown
     * (i.e. not specified in the config file, exception will be thrown).
     * @param priceSource = {
     *     url: string
     * }
     */
    async extractPriceFromPriceSource(priceSource) {
        logger.info(`Extracting price from ${JSON.stringify(priceSource, null, 2)}.`);
        const domain = extractDomain(priceSource.url);

        if (!(domain in this.extractorConfig)) {
            logger.info(`No configuration exists form domain ${domain}`);
            throw new Error(`No configuration exists form domain ${domain}`);
        }

        logger.info(`Fetching page from ${priceSource.url}`);
        let result;

        try {
            result = await fetch(priceSource.url, {method: 'GET', mode: 'no-cors'});
        } catch (e) {
            logger.error(`Error occurred while fetching page: ${e.message}`);
            throw new Error(`Error occurred while fetching page: ${e.message}`);
        }
        logger.info('Successful fetch!');

        const htmlContent = await result.text();
        const priceAndCurrency = this.processHtmlPage(htmlContent, domain);
        priceAndCurrency.date = new Date();
        logger.info(`Data fetched: ${priceAndCurrency}`);
        return priceAndCurrency;
    }

    /**
     * Retrieves the current price from a HTML page, based on the
     * domain-specific configuration.
     * @param htmlPage - the HTML content.
     * @param domain - the domain of the site (e.g. www.shopsample.org),
     * must be specified inside the config file!
     * @returns {{price: number, currency: string}}
     */
    processHtmlPage(htmlPage, domain) {
        logger.info(`Processing html page from ${domain}`);
        const currentConfig = this.extractorConfig[domain];
        let htmlContent = htmlPage;
        if (currentConfig.htmlIdentification === 'class') {
            htmlContent = this.retrieveTextFromHtmlClassTag(htmlPage, currentConfig.htmlClass);
        } else if (currentConfig.htmlIdentification === 'id') {
            htmlContent = this.retrieveTextFromHtmlIdTag(htmlPage, currentConfig.htmlId);
        } else {
            logger.warn('No valid HTML identification configuration found!');
        }
        return this.textToPriceAndCurrency(htmlContent);
    }

    /**
     * Retrieves the price from a string. Expected string format
     * should be: <price><currency>.
     * All spaces, dots and commas are ignored. If there are not exactly
     * one price and currency, an Error will be thrown.
     * $ will be converted to dollar
     * € weill be converted to euro
     * E.g. "234.546 $" will return price 23456 and currency dollar.
     * @param text
     * @returns {{price: number, currency: string}}
     */
    textToPriceAndCurrency(text) {
        const priceAndCurrency = {
            price: this.textToPrice(text),
            currency: this.textToCurrency(text)
        };
        if (priceAndCurrency.currency === '$') {
            priceAndCurrency.currency = 'dollar';
        }
        if (priceAndCurrency.currency === '€') {
            priceAndCurrency.currency = 'euro';
        }
        if (priceAndCurrency.currency === 'lei') {
            priceAndCurrency.currency = 'ron';
        }
        logger.info('Price and currency found: '
            + `${JSON.stringify(priceAndCurrency, null, 2)}`);
        return priceAndCurrency;
    }

    /**
     * Extracts the currency, ignoring the price.
     * @param text - the input text to be processed.
     * @returns {string} - the found currency
     */
    textToCurrency(text) {
        const currencyText = text.toLowerCase().match(/(lei|ron|euro|dollar|\$|€)/g);
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
     * If multiple HTML tags have the same class, the first one is chosen by default,
     * set tagIndex to chose another one.
     * @param html - the web page to be parsed
     * @param tagClass - the class of the tag to be searched
     * @param tagIndex - the position of the desired tag
     * @returns {string} - the text inside of the tag if found, null otherwise
     */
    retrieveTextFromHtmlClassTag(html, tagClass, tagIndex = 0) {
        logger.info(`Retrieving text from html class tag = "${tagClass}"`);
        const elements = parser.parse(html).querySelectorAll(`.${tagClass}`);
        if (elements.length === 0) {
            logger.warn(`No tag with class "${tagClass}" was found`);
            return null;
        }
        const element = elements[tagIndex];
        return element.text;
    }

    /**
     * Retrieves the text inside a HTML tag (INCLUDING SUB-ELEMENTS' TEXTS).
     * If multiple HTML tags have the same id, the first one is chosen by default,
     * set tagIndex to chose another one.
     * @param html - the web page to be parsed
     * @param tagId - the id of the tag to be searched
     * @param tagIndex - the position of the desired tag
     * @returns {string} - the text inside of the tag if found, null otherwise
     */
    retrieveTextFromHtmlIdTag(html, tagId, tagIndex = 0) {
        logger.info(`Retrieving text from html id tag = "${tagId}"`);
        const elements = parser.parse(html).querySelectorAll(`#${tagId}`);
        if (elements.length === 0) {
            logger.warn(`No tag with id "${tagId}" was found`);
            return null;
        }
        const element = elements[tagIndex];
        return element.text;
    }
}

module.exports = PriceExtractor;
