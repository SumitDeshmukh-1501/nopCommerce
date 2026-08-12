//@ts-check
export class Products {
    // @ts-ignore
    constructor(page) {
        this.page = page;
        this.prodctGrodTableRows = '#products-grid tbody tr'
        this.searchProductInput = this.page.locator("input[name='SearchProductName']")
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.nextButton = this.page.locator("a[aria-label='Next']");
        this.addNewButton= this.page.locator("a[href='/Admin/Product/Create']")

    }


    async getProductsgridRowsCount() {
        return await this.page.locator(this.prodctGrodTableRows).count()
    }

    // @ts-ignore
    async searchProduct(name) {
        await this.searchProductInput.fill(name);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle')
        const rows = await this.page.locator(this.prodctGrodTableRows)
        const count = await rows.count()

        let nextStatus = true;
        const productNames = [];
        console.log(count)
        while (nextStatus) {
            for (let i = 0; i < count; i++) {
                await this.page.waitForLoadState('networkidle')
                productNames.push(await rows.nth(i).locator('td').nth(2).textContent());
            }

            const state = await this.nextButton.getAttribute('aria-disabled')



            if (state !== null && state === 'true') {
                nextStatus = false;

            }
            else {
                nextStatus = true;
                await this.nextButton.click();
            }
        }
        return productNames

    }
    // @ts-ignore
    async search_nonExistsProduct(name){
        await this.searchProductInput.fill(name);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('load')
       return await this.page.locator(this.prodctGrodTableRows).locator('td').textContent();   
    }

    async goto_addNewPage(){
        await this.addNewButton.click();
    }
} 