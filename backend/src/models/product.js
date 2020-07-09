class Product {
    constructor(name, brand, dateAdded, priceSources, id = null) {
        this.id = null;
        this.name = name;
        this.brand = brand;
        this.dateAdded = dateAdded;
        this.priceSources = priceSources;
    }

    toString() {
        return `[Product name="${this.name}" brand="${this.brand}"]`
    }

    toPureObject() {
        return {
            id: this.id,
            name: this.name,
            brand: this.brand,
            dateAdded: this.dateAdded
        }
    }
}

module.exports = Product;
