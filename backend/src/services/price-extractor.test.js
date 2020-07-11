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
