//@ts-check


export class DashboardPage {


  // @ts-ignore
  constructor( page ){
    this.page=page;

    this.adminName=".navbar-nav ml-auto pl-2 "; //need another locator a[@href='#']
    this.dashboardTitle=".content-header h1";

    this.sideNavigationBar=".sidebar";

    this.hamburgerIcon="#nopSideBarPusher";

    this.searchInput="Search"; //getBYPlaceHolder
    
    this.searchInputList="#search-box span > div > div >div >h5";

    this.selectOptionFromList=""; //need to use nth from data

    this.allNavigation_tabs_from_sideBar =".mt-2 > ul > li > a"
   // this.systemButton="";

    this.systemActionList="";


    this.logoutButton="//a[@href='/logout']";

    this.allActionList="";


    this.newsTitle="//div[@id='nopcommerce-news-box']//div//div[@class='card-title']"
    this.allNewsListed="//div[@id='nopcommerce-news-box']//div[@class='card-body']//div[@class='row']";

    this.commonStatisticsTitle="//div[@id='nopcommerce-common-statistics-card']//div//div[@class='card-title']"
    this.allcommonStatisticsListed="//div[@id='nopcommerce-common-statistics-card']//div[@class='card-body']//div[@class='row']";
    this.moreInfoOnCard="//a[@class='small-box-footer']"

    this.indivisualCommonStatisticsTitle_whenOpened=".float-left";
    this.totalOrderNumber_From_OrderCard="//*[contains(@class, 'inner')]/p[text()= 'Orders']/preceding-sibling::h3"
    this.totalOrderNumberFrom_InsideofOrderCard="#customers-grid_info"  // get number from string

    this.totalNumberofRegisterCustomer_From_CustomerCard="//*[contains(@class, 'inner')]/p[text()= 'Registered customers']/preceding-sibling::h3"
    this.totalOrderNumberFrom_InsideofCustomerCard="#customers-grid_info" // get number from string

    this.yearButton_on_orders="//button[@data-chart-period='year']" //use nth 1
    this.yearButton_on_customer="//button[@data-chart-period='year']" // //use nth 2

    this.orderCounts_from_orderGraph=""
    this.orderCounts_from_CustomerGraph=""


    this.popularSearchKeyWord_table="";
    this. Bestsellerbyamount_table="";


    this.dashboardCAtionMinimiseButton=""


  }


  async getDashBoardTitle(){
    return this.page.locator(this.dashboardTitle).innerText();
  }

  async getUserNAme(){
    return this.page.locator(this.adminName).innerText();
  }


  async getSideBarElement(){
    return await this.page.locator(this.sideNavigationBar)
  }
  

  async getSideBarVisiblity_when_click_on_hamburger_firstTime(){
    await this.page.locator(this.hamburgerIcon).click()
    return await this.page.locator(this.sideNavigationBar)
  }

   async getSideBarVisiblity_when_click_on_hamburger_SecondTime(){
    await this.page.locator(this.hamburgerIcon).click()
    return await this.page.locator(this.sideNavigationBar)
  }

  // @ts-ignore
  async search_in_adminField(name){
    await this.page.locator(this.searchInput).fill(name);
    
  }

  async getSuggestedOptionList(){
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


  async click_on_logout(){
    await this.page.locator(this.logoutButton).click();
  }

  async getVisibiltyof_dashBoardTitle_when_goBack(){
    await this.page.goBack();
    return this.page.locator(this.dashboardTitle).isVisible();

  }
  async getURL_after_goBack(){
    return this.page.url();
  }

  async getNewSectionTitle(){
    return await this.page.locator(this.newsTitle).innerText();
  }

  async getNewCount(){
    const newsListCount=this.page.locator(this.allNewsListed).count();
    return newsListCount;
  }


}
