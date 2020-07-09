const ProductRepository = require('./product-repository');
const Product = require('../models/product');
const PriceExtractionSettings = require('../models/price-extraction-settings');
const PriceSource = require('../models/price-source');
const fs = require('fs');

describe('CRUD Product operations', () => {
    const repoPath = './db.tests/products_insert.json';
    let productRepository;

    beforeAll(() => {
        if (fs.existsSync(repoPath)) {
            fs.unlinkSync(repoPath);
        }
        productRepository = new ProductRepository(repoPath);
    });

    afterAll(() => {
        fs.unlinkSync(repoPath);
    });

    beforeEach(async () => {
        await productRepository.add(new Product('iPhone', 'Apple', null, null));
        await productRepository.add(new Product('A10', 'Samsung', null, null));
        await productRepository.add(new Product('I30', 'BMW', null, null));
        await productRepository.add(new Product('I30', 'BMW', null, null));
        await productRepository.add(new Product('P2720D', 'DELL', null, null));
    });

    afterEach(async () => {
        await productRepository.remove({});
    });

    test('Add a new product', async () => {
        const dateAdded = new Date();
        const newProduct = new Product('iPad', 'Apple', dateAdded, null);
        const savedProduct = await productRepository.add(newProduct);
        const fetchedProduct = await productRepository.findOne({_id: savedProduct._id});
        expect(fetchedProduct.dateAdded).toEqual(dateAdded);
        expect(fetchedProduct.name).toEqual('iPad');
    });

    test('Remove all products', async () => {
        const allProducts = await productRepository.find({});
        expect(allProducts).toHaveLength(5);
        await productRepository.remove({});
        const noProducts = await productRepository.find({});
        expect(noProducts).toHaveLength(0);
    });

    test('Remove one product from collection', async () => {
        const allProducts = await productRepository.find({});
        expect(allProducts).toHaveLength(5);
        await productRepository.removeOne({name: 'A10'});
        const noProducts = await productRepository.find({});
        expect(noProducts).toHaveLength(4);
    });

    test('Find multiple products with same name', async () => {
        const productsI30 = await productRepository.find({name: "I30"});
        expect(productsI30).toHaveLength(2);
    });

    test('Manipulate Product with all subclasses set', async () => {
        const priceExtractionSettings = new PriceExtractionSettings();
        const priceSource = new PriceSource(
            'Source name',
            'https://www.sample.com',
            [],
            priceExtractionSettings);
        const product = new Product('x30', 'Huawei', new Date(), [priceSource]);
        await productRepository.add(product);
        const fetchedProduct = await productRepository.findOne({name: 'x30'});
        expect(fetchedProduct.priceSources).toHaveLength(1);
        expect(fetchedProduct.priceSources[0].link).toEqual('https://www.sample.com');
    });
});
