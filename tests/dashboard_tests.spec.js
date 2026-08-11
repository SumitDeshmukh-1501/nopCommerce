//@ts-check
import { test, expect } from '@playwright/test';
import { DashboardPage } from "../pages/DashboardPage.js";

test.describe("Dashboard Module tests", () => {
    test("Verify admin dashboard opens successfully", async ({ page }) => {
        const dp = new DashboardPage(page);
        expect(await dp.getDashBoardTitle()).toBe("");
        expect(await dp.getUserNAme()).toBe("");
    });

    test("Verify left navigation sidebar is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
        expect(await dp.getSideBarElement()).toBeVisible();
    })

    test("Verify sidebar collapse/expand behavior", async ({ page }) => {
        const dp = new DashboardPage(page);
        expect(await dp.getSideBarVisiblity_when_click_on_hamburger_firstTime()).toBeVisible();
        expect(await dp.getSideBarVisiblity_when_click_on_hamburger_SecondTime()).not.toBeVisible();

    })

    test("Verify administration search suggests matching pages", async ({ page }) => {
        const search=""
        const dp = new DashboardPage(page);
        await dp.search_in_adminField(search)
        const searchList = await dp.getSuggestedOptionList();
        for (let i = 0; i < searchList.length; i++) {
            expect(searchList[i]).toContain(search)
            
        }
    })

    test("Verify logged-in administrator information is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
    })

    test("Verify logout from administration area", async ({ page }) => {
        const dp = new DashboardPage(page);
        await dp.click_on_logout();
        expect(await dp.getDashBoardTitle()).not.toBeVisible();
        expect(await dp.getURL_after_goBack()).toContain("login");

    })

    test("Verify Start Accepting Orders/setup section is displayed", async ({ page }) => {
        const dp = new DashboardPage(page);

    })

    test("Verify nopCommerce news section loads", async ({ page }) => {
        const dp = new DashboardPage(page);
        expect(await dp.getNewSectionTitle()).toBe("");
        expect(await dp.getNewCount()).toBe(1);
    })

    test("Verify common statistics cards are displayed", async ({ page }) => {
        const dp = new DashboardPage(page);
    })


    test("Verify statistics links open correct detailed pages", async ({ page }) => {
       
    })

    test("Verify Orders dashboard chart displays data", async ({ page }) => {

    })

    test("Verify new customers information is displayed accurately", async ({ page }) => {

    })


    test("Verify order totals/sales statistics are displayed", async ({ page }) => {

    })


    test("Verify incomplete orders section", async ({ page }) => {

    })


    test("Verify latest orders are displayed in correct order", async ({ page }) => {

    })


    test("Verify popular search keywords section", async ({ page }) => {

    })


    test("Verify bestsellers by quantity and amount", async ({ page }) => {

    })

    test("Verify dashboard sections can be collapsed/expanded", async ({ page }) => {

    })
    test("Verify dashboard handles unavailable data/service", async ({ page }) => {

    })
    test("Verify expired session cannot expose dashboard data", async ({ page }) => {

    })

})