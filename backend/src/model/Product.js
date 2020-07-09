class Product {
    Product(name, brand, dateAdded, priceSources) {
        this.name = name;
        this.brand = brand;
        this.dateAdded = dateAdded;
        this.priceSources = priceSources;
    }

    toString() {
        return `[Product name="${this.name}" brand="${this.brand}"]`
    }
}

module.exports = Product;
