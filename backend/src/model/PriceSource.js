class PriceSource {
    constructor(sourceName, link, history, priceExtractorSettings) {
        this.sourceName = sourceName;
        this.history = history;
        this.priceExtractorSettings = priceExtractorSettings;
    }

    toString() {
        return `[PriceSource sourceName="${this.sourceName}" `
            + `priceExtractorSettings="${this.priceExtractorSettings.toString()}"]`;
    }
}

module.exports = PriceSource;
