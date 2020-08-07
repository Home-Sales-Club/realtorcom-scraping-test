import puppeteer from 'puppeteer';

export default abstract class AbstractProduct {
    browser: puppeteer.Browser | undefined;
    browserPages = {
        generalInfoPage: undefined as undefined | puppeteer.Page
    };

    abstract async init(): Promise<void>;
    abstract async read(): Promise<boolean>;
    abstract async parseAndSave(): Promise<boolean>;

    async startParsing(finishScript?: Function) {
        try {
            // const newProduct = new CivilAuctionProduct(dateFrom, dateTo);
            // initiate pages
            await this.init();
            // check read
            console.log('Check newProduct.read()', await this.read());
            // call parse and save
            let success = await this.parseAndSave();
            // end close browser
            await this.browser?.close();
            if (finishScript) finishScript();
            return success;
          } catch (error) {
            console.log(error);
            if (finishScript) finishScript();
            await this.browser?.close();
            return false;
          }
    }

    async launchBrowser(): Promise<puppeteer.Browser> {
        return await puppeteer.launch({
            headless: false
        });
    }

    async setParamsForPage(page: puppeteer.Page): Promise<void> {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        await page.setViewport({ height: 800, width: 1200 });
    }
}