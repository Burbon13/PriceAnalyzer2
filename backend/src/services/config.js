const extractionConfig = {
    // Last updated: 13.07.2020
    'emag.ro': {
        htmlIdentification: 'class',
        htmlClass: 'product-new-price',
        currency: 'lei',
        priceHasDecimals: true,
        shopName: 'eMag',
        website: 'https://www.emag.ro'
    },
    'altex.ro': {
        htmlIdentification: 'class',
        htmlClass: 'Price-current',
        currency: 'lei',
        priceHasDecimals: true,
        shopName: 'Altex',
        website: 'https://www.altex.ro'
    },
    'mediagalaxy.ro': {
        htmlIdentification: 'class',
        htmlClass: 'Price-current',
        currency: 'lei',
        priceHasDecimals: true,
        shopName: 'MediaGalaxy',
        website: 'https://www.mediagalaxy.ro'
    }
};

module.exports = extractionConfig;
