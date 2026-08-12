//@ts-check
import {test, expect} from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage';
import { Products } from '../pages/catlog/products';


test.describe("Product Management", ()=>{
        test.beforeEach("Click on peoducts", async ({page})=>{
            const dp = new DashboardPage(page);
             await dp.goto()
            await dp.gotoTheProducts();
           
    })



    test("PROD-001 TC-01 Verify authorized admin can access Product List", async ({page})=>{
        // assert we've navigated to the products page (adjust pattern as needed) 
        await expect(page).toHaveURL(/Product/);
    });

    test("PROD-002 TC-02 Verify unauthenticated user cannot directly access Product List", async ({page})=>{
        const dp = new DashboardPage(page);
        const pr= new Products(page);
        await dp.click_on_logout();
        await page.goto('https://admin-demo.nopcommerce.com/Admin/Product/List');
        await expect(page).toHaveURL('/login?returnUrl=%2FAdmin%2FProduct%2FList');

    });

    test("PROD-003 TC-03 Verify products are displayed correctly in the grid",async ({page})=>{
       const pr= new Products(page);
       expect(await pr.getProductsgridRowsCount()).not.toBeGreaterThan(0);

    });

    test("PROD-004 TC-04 Search product using exact product name",async ({page})=>{
       
       const pr= new Products(page);
       const searchResults = await pr.searchProduct('nikon');
       for(let product of searchResults){
          expect(product.toLowerCase()).toContain('nikon');
       }


    });

    test("PROD-005 TC-05 Search using partial product name", async ({page})=>{
        const pr= new Products(page);
       const searchResults = await pr.searchProduct('nik');
       for(let product of searchResults){
          expect(product.toLowerCase()).toContain('nik');
       }


    });

    test("PROD-006 TC-06 Search with non-existing product", async ({page})=>{
       const pr= new Products(page);
       const searchResults = await pr.search_nonExistsProduct('poco');
      
     expect(searchResults).toContain('No data available in table');
    
      

    });
    // test("PROD-007 TC-07 Filter products by Category", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-008 TC-08 Filter products by Published status", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-009 TC-09 Verify multiple search criteria work together", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-010 TC-10 Verify clearing/resetting search criteria restores product list", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    test("PROD-011 TC-11 Verify Add New navigates to product creation page", async ({page})=>{
        const pr= new Products(page);
        await pr.goto_addNewPage();
        expect(page).toHaveURL('https://admin-demo.nopcommerce.com/Admin/Product/Create')


    });
    // test("PROD-012 TC-12 Verify existing product can be opened for editing", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);
    // });
    
    // test("PROD-013 TC-13 Verify edited product retains unchanged information", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });test("PROD-014 TC-14 Verify single product deletion", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-015 TC-15 Verify multiple products can be deleted using Delete Selected", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-016 TC-16 Verify Delete Selected does not delete products when no product is selected", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-017 TC-17 Verify pagination displays correct products across pages", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });
    // test("PROD-018 TC-18 Verify changing page size displays correct number of records", ({page})=>{
    //     const dp = new DashboardPage(page);
    //     const pr= new Products(page);

    // });


});