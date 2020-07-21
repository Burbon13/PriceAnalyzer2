/**
 *
 */
class PriceDataPoint {

    /**
     *
     * @param productId
     * @param date
     * @param price
     * @param url
     */
    constructor(productId, date, price, url) {
        this.productId = productId;
        this.date = date;
        this.price = price;
        this.url = url;
    }

    toString() {
        return `[PriceDataPoint productId="${this.productId} date="${this.date}" `
            + `price="${JSON.stringify(this.price, null, 2)}"  url="${this.url}"]`;
    }
}

module.exports = Price;
