//@ts-check


export class DashboardPage {


  // @ts-ignore
  constructor(page) {
    this.page = page;

    this.adminName = ".navbar-nav ml-auto pl-2 "; //need another locator a[@href='#']
    this.dashboardTitle = ".content-header h1";

    this.sideNavigationBar = ".sidebar";
    this.body = "body[class^='sidebar-mini ']"

    this.hamburgerIcon = "#nopSideBarPusher";

    this.searchInput = "input[placeholder='Search']"; //getBYPlaceHolder

    this.searchInputList = "#search-box span > div > div >div >h5";

    this.selectOptionFromList = ""; //need to use nth from data

    this.allNavigation_tabs_from_sideBar = ".mt-2 > ul > li > a"
    // this.systemButton="";

    this.systemActionList = "";


    this.logoutButton = "//a[@href='/logout']";

    this.allActionList = "";


    this.newsTitle = "//div[@id='nopcommerce-news-box']//div//div[@class='card-title']"
    this.allNewsListed = "//div[@id='nopcommerce-news-box']//div[@class='card-body']//div[@class='row']//div[@class='col-md-4']";

    this.commonStatisticsTitle = "//div[@id='nopcommerce-common-statistics-card']//div//div[@class='card-title']"
    this.allcommonStatisticsListed = "//div[@id='nopcommerce-common-statistics-card']//div[@class='card-body']//div[@class='row']//div[contains(@class, 'ol-lg-3')]";

    this.moreInfoOnCard = "//a[@class='small-box-footer']"
    this.indivisualCommonStatisticsTitle_beforeOpened = "//preceding-sibling::div[2]//p"
    this.indivisualCommonStatisticsTitle_whenOpened = ".float-left";

    this.totalOrderNumber_From_OrderCard = "//*[contains(@class, 'inner')]//p[text()= 'Orders']//preceding-sibling::h3"
    this.totalOrderNumberFrom_InsideofOrderCard = "div#orders-grid_info"  // get number from string

    this.totalNumberofRegisterCustomer_From_CustomerCard = "//*[contains(@class, 'inner')]/p[text()= 'Registered customers']/preceding-sibling::h3"
    this.totalOrderNumberFrom_InsideofCustomerCard = "#customers-grid_info" // get number from string

    this.yearButton_on_orders = "//button[@data-chart-period='year']" //use nth 1
    this.yearButton_on_customer = "//button[@data-chart-period='year']" // //use nth 2

    this.orderCounts_from_orderGraph = ""
    this.orderCounts_from_CustomerGraph = ""


    this.popularSearchKeyWord_table = "";
    this.Bestsellerbyamount_table_rows = "table#search-term-report-grid tbody tr"; 
    this.nextButton_popularSearchButton = "//div[@id='search-term-report-grid_wrapper']//a[@aria-label='Next']"

    this.dashboardCAtionMinimiseButton = ""


  }

  async goto() {
    await this.page.goto("https://admin-demo.nopcommerce.com/admin/");
  }
  async getDashBoardTitle() {
    return await this.page.locator(this.dashboardTitle).innerText();
  }

  async getUserNAme() {
    return await this.page.locator(this.adminName).innerText();
  }


  async getSideBarElement() {
    return await this.page.locator(this.sideNavigationBar)
  }


  async getSideBarVisiblity_when_click_on_hamburger_firstTime() {

    await this.page.locator(this.hamburgerIcon).click()
    await this.page.waitForLoadState('load')

    await this.page.waitForLoadState('domcontentloaded');
    return await this.page.locator(this.body).getAttribute('class');
  }

  async getSideBarVisiblity_when_click_on_hamburger_SecondTime() {

    await this.page.locator(this.hamburgerIcon).click()
    await this.page.waitForLoadState('load')
    await this.page.waitForLoadState('domcontentloaded');
    return await this.page.locator(this.body).getAttribute('class');


  }

  // @ts-ignore
  async search_in_adminField(name) {
    await this.page.locator(this.searchInput).fill(name);

  }

  async getSuggestedOptionList() {
    const searchResults = [];
    const searchList = this.page.locator(this.searchInputList);
    const count = await searchList.count();
    for (let i = 0; i < count; i++) {
      const ele = searchList.nth(i);
      const text = await ele.innerText();
      searchResults.push(text);
    }
    return searchResults;
  }


  async click_on_logout() {
    await this.page.locator(this.logoutButton).click();
  }

  async getVisibiltyof_dashBoardTitle_when_goBack() {
    await this.page.goBack();
    return this.page.locator(this.dashboardTitle).isVisible();

  }
  async getURL_after_goBack() {
    return this.page.url();
  }

  async getNewSectionTitle() {
    return await this.page.locator(this.newsTitle).innerText();
  }

  async getNewCount() {
    const newsListCount = this.page.locator(this.allNewsListed).count();
    return newsListCount;
  }

  async getCommonStasticsTitle() {
    return await this.page.locator(this.commonStatisticsTitle).innerText();
  }

  async getStatisticsCount() {
    const newsListCount = this.page.locator(this.allcommonStatisticsListed).count();
    return newsListCount;
  }

  async verify_correct_static_page_is_open_when_click() {
    let flag = false;
    const stasticsCards = await this.page.locator(this.moreInfoOnCard);
    const count = await this.page.locator(this.moreInfoOnCard).count();

   
    for (let i = 0; i < count; i++) {
      const ele = stasticsCards.nth(i);
      const beforeTitle = await ele.locator(this.indivisualCommonStatisticsTitle_beforeOpened).innerText();
      await ele.click();
      
      const afterTitle = await this.page.locator(this.indivisualCommonStatisticsTitle_whenOpened).innerText();
      if (beforeTitle === afterTitle) {
        flag = true;
      }
      await this.page.goBack();
    }
    return flag;
  }

  async verify_the_count_from_order_card() {
    
    const countOnCardElement = await this.page.locator(this.totalOrderNumber_From_OrderCard)
    const countOFOrderOnCard = countOnCardElement.innerText();
    //*[contains(@class, 'inner')]/p[text()= 'Orders']/preceding-sibling::h3./parent::div//following-sibling::a
    await countOnCardElement.locator("//parent::div//following-sibling::a").click();
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')
    const countText = await this.page.locator(this.totalOrderNumberFrom_InsideofOrderCard).textContent();
    
    const innerCount = countText.split(" ")
   
  

    return innerCount[2]


  }

  async verify_the_count_from_customer_card() {
   
    const countOnCardElement = await this.page.locator(this.totalNumberofRegisterCustomer_From_CustomerCard)
    const countOFCustomerOnCard = countOnCardElement.innerText();
    //*[contains(@class, 'inner')]/p[text()= 'Orders']/preceding-sibling::h3./parent::div//following-sibling::a
    await countOnCardElement.locator("//parent::div//following-sibling::a").click();
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')
    const countText = await this.page.locator(this.totalOrderNumberFrom_InsideofCustomerCard).innerText();

    const innerCount = countText.split(" ")
   

    return innerCount[2];


  }


  async verify_that_sort_order_of_amounts() {
    const nextBtn = this.page.locator(this.nextButton_popularSearchButton);
    let nextBtn_enabality = true;
    const amount = []
    while (nextBtn_enabality) {

      const rows_fromTable = this.page.locator(this.Bestsellerbyamount_table_rows)
      const count = rows_fromTable.count();
      for (let i = 0; i < count; i++) {
        amount.push(await rows_fromTable.locator('td').nth(1).innerText());
      }

      console.log(amount)
      if (nextBtn.isEnabled()) {
        nextBtn_enabality = true;
        await nextBtn.click();
      }
      else {
        nextBtn_enabality = false;
      }
    }
    return amount
  }

  // @ts-ignore
  async sort_String_list_desc(listName) {
    // @ts-ignore
    const sortedList = listName.toSorted((a, b) => b.localeCompare(a));
    return sortedList;
  }
}
