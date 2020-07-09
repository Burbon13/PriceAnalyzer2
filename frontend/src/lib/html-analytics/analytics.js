import https from 'https';

/**
 * Makes GET request to the specified url
 * @param url - where to make the GET request
 * @param thenDo - function with result param
 * @param thenError - function with the error param in case anything goes wrong
 */
const fetchProductPage = (url, thenDo, thenError) => {
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            thenDo(data);
        });
    }).on('error', (error) => {
        thenError(error);
    });
};

/**
 *
 * @param html
 * @param options {
 *     currency: string,
 *     price: string,
 *     enclosingId: string,
 *     enclosingClass: string,
 *     enclosingHtmlType: string
 * }
 * @returns {{date: Date, price: number, currency: string}}
 */
const retrieveProductDetails = (html, options) => {
    return {
        price: 100,
        currency: 'RON',
        date: new Date()
    }
};

export const getLatestProductDetails = (product, options) => {
    product = {
        url: 'https://www.emag.ro/apple-ipad-air-3-10-5-64gb-wi-fi-space-grey-muuj2hc-a/pd/D0W31ZBBM/?ref=others_also_viewed_1_6&provider=rec&recid=rec_43_1eddc057cb710aa7631a8a467645b1509f02e1602c6877a0d2a6cd753479b8bd_1594146263&scenario_ID=43'
    }

    fetchProductPage(
        product.url,
        (html) => {
            console.log(html);
            // log.info(html);
            const productDetails = retrieveProductDetails(html, options);
        },
        (error) => {

        });
};
