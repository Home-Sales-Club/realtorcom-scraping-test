import puppeteer from 'puppeteer';
import AbstractProduct from './abstract_product';

export default class LlcProduct extends AbstractProduct {
    urls = {
        generalInfoPage: 'https://www.realtor.com/soldhomes'
    };

    async init() {
        this.browser = await this.launchBrowser();
        this.browserPages.generalInfoPage = await this.browser.newPage();
        await this.setParamsForPage(this.browserPages.generalInfoPage);
        await this.browserPages.generalInfoPage?.goto(
            this.urls.generalInfoPage
        );
    }

    async read(): Promise<boolean> {
        return true;
    }

    async parseAndSave(): Promise<boolean> {
        await this.browserPages.generalInfoPage?.bringToFront();

        const searchBarSelector = 'input[placeholder="Address, School, City, Zip or Neighborhood"]';
        await this.browserPages.generalInfoPage?.waitForSelector(searchBarSelector);
        await this.browserPages.generalInfoPage?.click(searchBarSelector, {
            delay: 500
        });
        await this.browserPages.generalInfoPage?.type(searchBarSelector, 'Broward County, FL', {
            delay: 500
        });
        await this.browserPages.generalInfoPage?.waitFor(1000);
        const elements = await this.browserPages.generalInfoPage?.$x('//form/button') as puppeteer.ElementHandle[];
        if(elements?.length > 0) {
            await elements[0].click({
                delay: 500
            });
        }
        await this.browserPages.generalInfoPage?.waitFor(4000);

        
        return true;
    }
}


