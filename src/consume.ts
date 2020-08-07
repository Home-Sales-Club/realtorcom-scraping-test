import LlcProduct from './llc_product';

(async () => {
    const llcProduct = new LlcProduct();
    await llcProduct.startParsing();
})();