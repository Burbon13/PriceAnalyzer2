class PriceSource {

    /**
     *
     * @param sourceName
     * @param link
     * @param history
     * @param priceExtractorSettings
     */
    constructor(sourceName, link, history, priceExtractorSettings) {
        this.sourceName = sourceName;
        this.history = history;
        this.link = link;
        this.priceExtractorSettings = priceExtractorSettings;
    }

    toString() {
        return `[PriceSource sourceName="${this.sourceName}" `
            + `priceExtractorSettings="${this.priceExtractorSettings.toString()}"]`;
    }
}

module.exports = PriceSource;
