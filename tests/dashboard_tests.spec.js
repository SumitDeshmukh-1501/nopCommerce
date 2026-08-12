//@ts-check
import { test, expect } from '@playwright/test';
import { DashboardPage } from "../pages/DashboardPage.js";
import { getTestData } from '../utils/readJSONFileData';

const dashBoarddata = getTestData('./test-data/dashboard_page_detail.json')
test.describe("Dashboard Module tests", () => {
    test("Verify admin dashboard opens successfully", async ({ page }) => {
        const dp = new DashboardPage(page);
       await  dp.goto();
       await  expect(await dp.getDashBoardTitle()).toBe(dashBoarddata.dashboardTitle);
  
    });

    test("Verify left navigation sidebar is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
       await expect(await dp.getSideBarElement()).toBeVisible();
    })

    test("Verify sidebar collapse/expand behavior", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
        await  expect(await dp.getSideBarVisiblity_when_click_on_hamburger_firstTime()).toContain("sidebar-collapse");
        await expect(await dp.getSideBarVisiblity_when_click_on_hamburger_SecondTime()).not.toContain("sidebar-collapse");

    })

    test("Verify administration search suggests matching pages", async ({ page }) => {
       
        const dp = new DashboardPage(page);
        await  dp.goto();
        await dp.search_in_adminField(dashBoarddata.searchItem)
        const searchList = await dp.getSuggestedOptionList();
        for (let i = 0; i < searchList.length; i++) {
           await expect(searchList[i].toLowerCase()).toContain(dashBoarddata.searchItem)
            
        }
    })

    test("Verify logged-in administrator information is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
    })

    test("Verify logout from administration area", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
        await dp.click_on_logout();
        await  expect(await dp.getURL_after_goBack()).toContain(dashBoarddata.loginURLcontain);

    })

    test("Verify Start Accepting Orders/setup section is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();

    })

    test("Verify nopCommerce news section loads", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
        await expect(await dp.getNewSectionTitle()).toBe(dashBoarddata.nopCommerceNewTitle);
        await expect(await dp.getNewCount()).toBe(dashBoarddata.newsCount);
    })

    test("Verify common statistics cards are displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
        expect(await dp.getCommonStasticsTitle()).toBe(dashBoarddata.commonStatisticsTitle);
        expect(await dp.getStatisticsCount()).toBe(dashBoarddata.ststisticsCount);
    })


    test("Verify statistics links open correct detailed pages", async ({ page }) => {
        const dp = new DashboardPage(page);
        await  dp.goto();
        await expect(await dp.verify_correct_static_page_is_open_when_click()).toBeTruthy();
       
    })

    test("Verify Orders dashboard chart displays data", async ({ page }) => {
        const dp=new DashboardPage(page);
        await  dp.goto();
        expect(await dp.verify_the_count_from_order_card()).toBe(dashBoarddata.ordersCount);

    })

    test("Verify new customers information is displayed accurately", async ({ page }) => {
         const dp=new DashboardPage(page);
         await  dp.goto();
        expect(await dp.verify_the_count_from_customer_card()).toBe(dashBoarddata.customerCount);
    })


    test("Verify order totals/sales statistics are displayed", async ({ page }) => {

    })


    test("Verify incomplete orders section", async ({ page }) => {

    })


    test("Verify latest orders are displayed in correct order", async ({ page }) => {

    })


    test("Verify popular search keywords section", async ({ page }) => {

    })

    //need to fix
    test.fixme("Verify bestsellers by amount are order by Total amount", async ({ page }) => {

        const dp=new DashboardPage(page);
        await  dp.goto();
        const orignal= await dp.verify_that_sort_order_of_amounts()
        expect(orignal).toEqual(await dp.sort_String_list_desc(orignal));

    })

    test("Verify dashboard sections can be collapsed/expanded", async ({ page }) => {

    })
    test("Verify dashboard handles unavailable data/service", async ({ page }) => {

    })
    test("Verify expired session cannot expose dashboard data", async ({ page }) => {

    })

})