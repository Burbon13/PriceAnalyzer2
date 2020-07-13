const logger = require('../utils/logger');
const parser = require('node-html-parser');
const extractDomain = require('extract-domain');
const fetch = require('node-fetch');
const extractorConfig = require('./config');

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
     */
    extractPrice(product) {
        logger.info(`Extracting price for ${product.toString()}`);
        product.priceSources.forEach((priceSource) => {

        });
    }

    /**
     *
     * @param priceSource = {
     *     url: string
     * }
     */
    extractPriceFromPriceSource(priceSource) {
        logger.info(`Extracting price from ${priceSource}.`);
        const domain = extractDomain(priceSource.url);

        if (!(domain in this.extractorConfig)) {
            logger.info(`No configuration exists form domain ${domain}`);
            throw new Error(`No configuration exists form domain ${domain}`);
        }

        logger.info(`Fetching page from ${priceSource.url}`);
        fetch(priceSource.url)
            .then(result => {
                if (!result.ok) {
                    logger.error(`Error while fetching html page: ${result.statusText}`);
                    throw new Error(`Error while fetching html page: ${result.statusText}`);
                }
                logger.info('Successful fetch!');
                return result;
            })
            .then(result => {
                const priceAndCurrency = this.processHtmlPage(result, domain);
                priceAndCurrency.date = new Date();
                logger.info(priceAndCurrency);
            });
    }

    /**
     * Retrieves the current price from a HTML page, based on the
     * domain-specific configuration.
     * @param htmlPage - the HTML content.
     * @param domain - the domain of the site (e.g. www.shopsample.org).
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
