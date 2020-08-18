import puppeteer from 'puppeteer';
import AbstractProduct from './abstract_product';

export default class LlcProduct extends AbstractProduct {
    urls = {
        generalInfoPage: 'https://www.realtor.com/soldhomeprices/Broward-County_FL'
    };

    async init() {
        this.browser = await this.launchBrowser();
        this.browserPages.generalInfoPage = await this.browser.newPage();
        await this.setParamsForPage(this.browserPages.generalInfoPage);
        await this.browserPages.generalInfoPage?.goto(
            this.urls.generalInfoPage,
            {
                timeout: 1000 * 60
            }
        );
    }

    async read(): Promise<boolean> {
        return true;
    }

    async parseAndSave(): Promise<boolean> {
        await this.browserPages.generalInfoPage?.bringToFront();

        const elements = await this.browserPages.generalInfoPage?.$x('//div[contains(@class,"address")]//child::text()') as puppeteer.ElementHandle[];


        console.log('the elements: ', await this.getTextContent(elements));

        return true;
    }
}


