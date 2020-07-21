const PriceExtractor = require('./price-extractor');

describe('Retrieving text within HTML element based on id or class', () => {
    let priceExtractor;

    beforeAll(() => {
        priceExtractor = new PriceExtractor();
    });

    test('Retrieve simple text (class)', () => {
        const actualText = 'Haleluia';
        const html = `<head></head><body><div class="cls1">${actualText}</div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlClassTag(html, 'cls1');
        expect(fetchedText).toEqual(actualText);
    });

    test('Retrieved text from deep nested HTML element (class)', () => {
        const html = `<head></head><body>`
            + `<div>`
            + `<div class="cls1">Text1<div class="cls2"></div>Text2<div class="cls3"></div></div>`
            + `<div class="cls4">Text3<div class="cls5">Text4</div></div>`
            + `<div class="cls6"><div class="cls7"></div><div class="cls8"></div></div>`
            + `</div>`
            + `</body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlClassTag(html, 'cls4');
        expect(fetchedText).toEqual('Text3Text4');
    });

    test('No tag with given class is found, null is returned', () => {
        const html = `<head></head><body><div class="cls1">Whatever</div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlClassTag(html, 'cls2');
        expect(fetchedText).toBeNull();
    });

    test('Multiple elements with same class', () => {
        const html = `<head></head><body>`
            + `<div>`
            + `<div class="cls1">Text1<div class="cls2"></div>Text2<div class="cls3"></div></div>`
            + `<div class="cls4">Text3<div class="cls1">Text4</div></div>`
            + `<div class="cls1"><div class="cls7"></div><div class="cls8"></div></div>`
            + `</div>`
            + `</body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlClassTag(html, 'cls1');
        expect(fetchedText).toEqual('Text1Text2');
    });

    test('Empty string if tag is empty (class)', () => {
        const html = `<head></head><body><div class="cls1"></div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlClassTag(html, 'cls1');
        expect(fetchedText).toEqual('');
    });

    test('Retrieve simple text (Id)', () => {
        const actualText = 'Haleluia';
        const html = `<head></head><body><div id="cls1">${actualText}</div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlIdTag(html, 'cls1');
        expect(fetchedText).toEqual(actualText);
    });

    test('Retrieved text from deep nested HTML element (id)', () => {
        const html = `<head></head><body>`
            + `<div>`
            + `<div id="cls1">Text1<div id="cls2"></div>Text2<div id="cls3"></div></div>`
            + `<div id="cls4">Text3<div id="cls5">Text4</div></div>`
            + `<div id="cls6"><div id="cls7"></div><div id="cls8"></div></div>`
            + `</div>`
            + `</body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlIdTag(html, 'cls4');
        expect(fetchedText).toEqual('Text3Text4');
    });

    test('No tag with given id is found, null is returned', () => {
        const html = `<head></head><body><div id="id1">Whatever</div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlIdTag(html, 'id2');
        expect(fetchedText).toBeNull();
    });

    test('Multiple elements with same id', () => {
        const html = `<head></head><body>`
            + `<div>`
            + `<div id="cls1">Text1<div id="cls2"></div>Text2<div id="cls3"></div></div>`
            + `<div id="cls4">Text3<div id="cls1">Text4</div></div>`
            + `<div id="cls1"><div id="cls7"></div><div id="cls8"></div></div>`
            + `</div>`
            + `</body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlIdTag(html, 'cls1');
        expect(fetchedText).toEqual('Text1Text2');
    });

    test('Empty string if tag is empty (id)', () => {
        const html = `<head></head><body><div id="cls1"></div></body>`;
        const fetchedText = priceExtractor.retrieveTextFromHtmlIdTag(html, 'cls1');
        expect(fetchedText).toEqual('');
    });
});

describe('Retrieve price from string', () => {
    let priceExtractor;

    beforeAll(() => {
        priceExtractor = new PriceExtractor();
    });


    test('Price without decimals extraction', () => {
        const actualPrice = priceExtractor.textToPrice('123');
        expect(actualPrice).toEqual(123);
    });

    test('Price with decimals extraction', () => {
        const actualPrice = priceExtractor.textToPrice('546.55');
        expect(actualPrice).toEqual(54655);
    });

    test('Price with decimals and multiple dots extraction', () => {
        const actualPrice = priceExtractor.textToPrice('123,546.55');
        expect(actualPrice).toEqual(12354655);
    });

    test('Price with decimals and multiple dots extraction', () => {
        const actualPrice = priceExtractor.textToPrice('123.546,55');
        expect(actualPrice).toEqual(12354655);
    });

    test('Price with multiple spaces extraction', () => {
        const actualPrice = priceExtractor.textToPrice('123 432');
        expect(actualPrice).toEqual(123432);
    });

    test('Price with dots, spaces and commas extraction', () => {
        const actualPrice = priceExtractor.textToPrice('123 . 546 ,55');
        expect(actualPrice).toEqual(12354655);
    });

    test('No price in the string (empty string) - Exception expected', () => {
        const action = () => {
            priceExtractor.textToPrice('');
        };
        expect(action).toThrowError('Given text does not contain exactly one price!');
    });

    test('Multiple prices in the string - Exception expected', () => {
        const action = () => {
            priceExtractor.textToPrice('213ron 434.345$ 3123');
        };
        expect(action).toThrowError('Given text does not contain exactly one price!');
    });
});

describe('Retrieve currency from string', () => {
    let priceExtractor;

    beforeAll(() => {
        priceExtractor = new PriceExtractor();
    });

    test('Ron extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123ron');
        expect(actualCurrency).toEqual('ron');
    });

    test('Ron extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123.432Ron');
        expect(actualCurrency).toEqual('ron');
    });

    test('Ron extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43.43RON');
        expect(actualCurrency).toEqual('ron');
    });

    test('Euro extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123 Euro');
        expect(actualCurrency).toEqual('euro');
    });

    test('Euro extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123.432euros');
        expect(actualCurrency).toEqual('euro');
    });

    test('Euro extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43.43Euros');
        expect(actualCurrency).toEqual('euro');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123 DOLLARS');
        expect(actualCurrency).toEqual('dollar');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123.432 dollar');
        expect(actualCurrency).toEqual('dollar');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43.43Edollar');
        expect(actualCurrency).toEqual('dollar');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123 DOLLARS');
        expect(actualCurrency).toEqual('dollar');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123.432 dollar');
        expect(actualCurrency).toEqual('dollar');
    });

    test('Dollar extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43.43Edollar');
        expect(actualCurrency).toEqual('dollar');
    });

    test('€ extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123 €');
        expect(actualCurrency).toEqual('€');
    });

    test('€ extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43€');
        expect(actualCurrency).toEqual('€');
    });

    test('$ extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('123 $');
        expect(actualCurrency).toEqual('$');
    });

    test('$ extraction', () => {
        const actualCurrency = priceExtractor.textToCurrency('12,43$');
        expect(actualCurrency).toEqual('$');
    });

    test('No currency - Exception expected', () => {
        const action = () => {
            priceExtractor.textToCurrency('2134.42');
        };
        expect(action).toThrowError('Given text does not contain exactly one currency!');
    });

    test('Multiple currencies found - Exception expected', () => {
        const action = () => {
            priceExtractor.textToCurrency('2134.42ron $ euro');
        };
        expect(action).toThrowError('Given text does not contain exactly one currency!');
    });
});

describe('Retrieve price and currency from string', () => {
    let priceExtractor;

    beforeAll(() => {
        priceExtractor = new PriceExtractor();
    });

    test('Combination test nr 1', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683.99 ron');
        expect(priceAndCurrency).toEqual({
            price: 68399,
            currency: 'ron'
        });
    });

    test('Combination test nr 2', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683.994,78 $');
        expect(priceAndCurrency).toEqual({
            price: 68399478,
            currency: 'dollar'
        });
    });

    test('Combination test nr 3', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683 994,78€ ');
        expect(priceAndCurrency).toEqual({
            price: 68399478,
            currency: 'euro'
        });
    });

    test('Combination test nr 4', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683 994,78euros ');
        expect(priceAndCurrency).toEqual({
            price: 68399478,
            currency: 'euro'
        });
    });

    test('Combination test nr 5 - Lei to ron', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683 994,78lei ');
        expect(priceAndCurrency).toEqual({
            price: 68399478,
            currency: 'ron'
        });
    });

    test('Combination test nr 6 Lei to ron', () => {
        const priceAndCurrency = priceExtractor.textToPriceAndCurrency('683 994,78 Lei ');
        expect(priceAndCurrency).toEqual({
            price: 68399478,
            currency: 'ron'
        });
    });

    test('Missing price', () => {
        const action = () => {
            priceExtractor.textToPriceAndCurrency('dollar');
        };
        expect(action).toThrowError('Given text does not contain exactly one price!');
    });

    test('Missing currency', () => {
        const action = () => {
            priceExtractor.textToPriceAndCurrency('2134.42');
        };
        expect(action).toThrowError('Given text does not contain exactly one currency!');
    });
});

describe('Process complete HTML page', () => {
    let priceExtractor;

    beforeAll(() => {
        priceExtractor = new PriceExtractor();
    });

    test('Unknown domain', () => {
        const htmlContent = '<div class="col-sm-7"><p class="product-new-price">'
            + '2.994<sup>99</sup> <span>$</span></p></div>';
        const action = () => {
            priceExtractor.processHtmlPage(htmlContent, 'unknown.org');
        };
        expect(action).toThrow();
    });

    test('eMag sample html component', () => {
        const htmlContent = '<div class="col-sm-7"><p class="product-new-price">'
            + '2.994<sup>99</sup> <span>Lei</span></p></div>';
        const result = priceExtractor.processHtmlPage(htmlContent, 'emag.ro');
        expect(result).toEqual({
            price: 299499,
            currency: 'ron'
        });
    });

    test('eMag invalid html component - missing currency', () => {
        const htmlContent = '<div class="col-sm-7"><p class="product-new-price">'
            + '2.994<sup>99</sup> <span></span></p></div>';
        const action = () => {
            priceExtractor.processHtmlPage(htmlContent, 'emag.ro');
        };
        expect(action).toThrowError('Given text does not contain exactly one currency!');
    });

    test('eMag invalid html component - missing price', () => {
        const htmlContent = '<div class="col-sm-7"><p class="product-new-price">'
            + '<sup></sup> <span>Lei</span></p></div>';
        const action = () => {
            priceExtractor.processHtmlPage(htmlContent, 'emag.ro');
        };
        expect(action).toThrowError('Given text does not contain exactly one price!');
    });
});

describe('Integration tests', () => {
    describe('eMag integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://www.emag.ro/televizor-samsung-43tu7072-109-cm-smart-4k-ultra-hd-led-ue43tu7072uxxh/pd/DPKJQMMBM/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://www.emag.ro/telefon-mobil-myphone-maestro-dual-sim-silver-tel000481/pd/DRYTDMMBM/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });

    describe('Altex integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://altex.ro/telefon-mobil-myria-senior-my9071bk-256mb-ram-3g-dual-sim-black/cpd/GSMMY9071BK/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://altex.ro/sistem-de-navigatie-gps-smailo-hd5-mediateck-3351-468-mhz-5-inch-64mb-micro-sd-usb-lifetime-update/cpd/NAVSMAILOHD5EUL/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });

    describe('MediaGalaxy integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://mediagalaxy.ro/bere-blonda-noroc-bax-3l-x-6-sticle/cpd/BAR594207000130/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://mediagalaxy.ro/uscator-de-par-philips-thermoprotect-ionic-hp8232-00-2200w-6-viteze-6-trepte-temperatura-alb/cpd/USCHP8232/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });

    describe('PriceGarage integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://www.pcgarage.ro/ultrabook/asus/14-vivobook-14-x403fa-fhd-procesor-intel-core-i7-8565u-8m-cache-up-to-460-ghz-8gb-512gb-ssd-gma-uhd-620-endless-os-silver-blue/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://www.pcgarage.ro/tastaturi/logitech/k280e/';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });

    // TODO: Make it work
    describe('f64 integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://www.f64.ro/samyang-8mm-t3-8-vdslr-csii-sony-a/p?ref=prod_tab';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://www.f64.ro/wacom-intuos-pro-s-2019/p?ref=prod_tab';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });

    // TODO: Make it work
    describe('Flanco integration tests', () => {
        let priceExtractor;

        beforeAll(() => {
            priceExtractor = new PriceExtractor();
        });

        test('Suite 1', async () => {
            const url = 'https://www.flanco.ro/boxa-portabila-jbl-charge-4-bluetooth-rosu.html';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });

        test('Suite 2', async () => {
            const url = 'https://www.flanco.ro/boxa-portabila-akai-abts-h12l-bluetooth-negru.html';
            const result = await priceExtractor.extractPriceFromPriceSource({url: url});
        });
    });
});
