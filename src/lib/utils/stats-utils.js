export const averagePrice = (priceHistory) => {
    return priceHistory.reduce((sum, product) => sum + product.price, 0) / priceHistory.length;
};

export const lowestPrice = (priceHistory) => {
    return Math.min(...priceHistory.map(product => product.price));
};

export const highestPrice = (priceHistory) => {
    return Math.max(...priceHistory.map(product => product.price));
};
