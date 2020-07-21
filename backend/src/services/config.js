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
    'pcgarage.ro': {
        htmlIdentification: 'class',
        htmlClass: 'ps_sell_price',
        currency: 'ron',
        priceHasDecimals: true,
        shopName: 'PcGarage',
        website: 'https://www.pcgarage.ro'
    },
    'f64.ro': {
        htmlIdentification: 'class',
        htmlClass: 'skuBestPrice', // Problem when "resigilat" is available
        currency: 'ron',
        priceHasDecimals: true,
        shopName: 'f64',
        website: 'https://www.f64.ro'
    },
    'flanco.ro': {
        htmlIdentification: 'class',
        htmlClass: 'price',
        currency: 'lei',
        priceHasDecimals: true,
        shopName: 'Flanco',
        website: 'https://www.flanco.ro'
    }
};

module.exports = extractionConfig;
