# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catlog_tests.spec.js >> Product Management >> PROD-001 TC-01 Verify authorized admin can access Product List
- Location: tests\catlog_tests.spec.js:17:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href=\'/Admin/Product/List\']')
    - locator resolved to <a class="nav-link" href="/Admin/Product/List">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    48 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - list [ref=e4]:
      - listitem [ref=e5]:
        - link [ref=e6] [cursor=pointer]:
          - /url: "#"
    - link [ref=e8] [cursor=pointer]:
      - /url: /Admin
    - list [ref=e10]:
      - listitem
      - listitem [ref=e11]:
        - link "John Smith":
          - /url: "#"
      - listitem [ref=e12]:
        - link "Logout" [ref=e13] [cursor=pointer]:
          - /url: /logout
      - listitem
      - listitem [ref=e14]:
        - link [ref=e15] [cursor=pointer]:
          - /url: "#"
  - complementary [ref=e17]:
    - link [ref=e18] [cursor=pointer]:
      - /url: /Admin
      - img "logo.png" [ref=e19]
    - generic [ref=e20]:
      - textbox "Search" [ref=e24]
      - navigation [ref=e25]:
        - menu [ref=e26]:
          - listitem [ref=e27]:
            - link [ref=e28] [cursor=pointer]:
              - /url: /Admin
              - paragraph [ref=e30]: Dashboard
          - listitem [ref=e31]:
            - link [active] [ref=e32] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e34]: Catalog
          - listitem [ref=e36]:
            - link [ref=e37] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e39]: Sales
          - listitem [ref=e41]:
            - link [ref=e42] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e44]: Customers
          - listitem [ref=e46]:
            - link [ref=e47] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e49]: Promotions
          - listitem [ref=e51]:
            - link [ref=e52] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e54]: Content management
          - listitem [ref=e56]:
            - link [ref=e57] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e59]: Configuration
          - listitem [ref=e61]:
            - link [ref=e62] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e64]: System
          - listitem [ref=e66]:
            - link [ref=e67] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e69]: Reports
          - listitem [ref=e71]:
            - link [ref=e72] [cursor=pointer]:
              - /url: "#"
              - paragraph [ref=e74]: Help
  - generic [ref=e76]:
    - heading "Dashboard" [level=1] [ref=e78]
    - generic [ref=e83]:
      - generic [ref=e86]:
        - generic [ref=e87]:
          - heading "Start accepting orders" [level=3] [ref=e88]
          - generic [ref=e90]:
            - button [ref=e91] [cursor=pointer]
            - button [ref=e93] [cursor=pointer]
        - generic [ref=e96]:
          - generic [ref=e97]:
            - heading "Welcome to your store!" [level=4] [ref=e99]
            - paragraph [ref=e100]: Can’t wait to start accepting orders? Let us show you how to set up your store fast and easy. The steps below describe the most important settings for the online shop. With our tips on each page you will see how clear this process is. You will be ready to start selling immediately after you go through these steps. So good luck!
          - generic [ref=e102]:
            - generic [ref=e103]:
              - link [ref=e105] [cursor=pointer]:
                - /url: /Admin/Setting/GeneralCommon?showtour=True
                - heading "1. Personalize your store Choose a beautiful theme for your store and add your logo" [level=5] [ref=e111]:
                  - text: 1. Personalize your store
                  - generic [ref=e112]: Choose a beautiful theme for your store and add your logo
              - link [ref=e114] [cursor=pointer]:
                - /url: /Admin/Store/Edit/1?showtour=True
                - heading "2. Add your store info Enter your store details and protect your customers using SSL" [level=5] [ref=e120]:
                  - text: 2. Add your store info
                  - generic [ref=e121]: Enter your store details and protect your customers using SSL
              - link [ref=e123] [cursor=pointer]:
                - /url: /Admin/Shipping/Providers?showtour=True
                - heading "3. Set up shipping Set up shipping methods to deliver orders to customers" [level=5] [ref=e129]:
                  - text: 3. Set up shipping
                  - generic [ref=e130]: Set up shipping methods to deliver orders to customers
            - generic [ref=e131]:
              - link [ref=e133] [cursor=pointer]:
                - /url: /Admin/Payment/Methods?showtour=True
                - heading "4. Set up payments Choose how your customers will pay for their orders" [level=5] [ref=e139]:
                  - text: 4. Set up payments
                  - generic [ref=e140]: Choose how your customers will pay for their orders
              - link [ref=e142] [cursor=pointer]:
                - /url: /Admin/Tax/Providers?showtour=True
                - heading "5. Set up taxes Configure rates manually or choose a tax service to automate all tax things" [level=5] [ref=e148]:
                  - text: 5. Set up taxes
                  - generic [ref=e149]: Configure rates manually or choose a tax service to automate all tax things
              - link [ref=e151] [cursor=pointer]:
                - /url: /Admin/Product/Create?showtour=True
                - heading "6. Create products Build a catalog with attractive product descriptions and pictures" [level=5] [ref=e157]:
                  - text: 6. Create products
                  - generic [ref=e158]: Build a catalog with attractive product descriptions and pictures
            - generic [ref=e159]:
              - link [ref=e161] [cursor=pointer]:
                - /url: /Admin/EmailAccount/List?showtour=True
                - heading "7. Set up email accounts It allows you to send notifications to your customers" [level=5] [ref=e167]:
                  - text: 7. Set up email accounts
                  - generic [ref=e168]: It allows you to send notifications to your customers
              - link [ref=e170] [cursor=pointer]:
                - /url: /Admin/Topic/List?showtour=True
                - heading "8. Edit services info Add info pages describing shipping, return policy and more" [level=5] [ref=e176]:
                  - text: 8. Edit services info
                  - generic [ref=e177]: Add info pages describing shipping, return policy and more
              - link [ref=e179] [cursor=pointer]:
                - /url: https://www.nopcommerce.com/nopcommerce-copyright-removal-key?utm_source=demo-admin-panel&utm_medium=tour&utm_campaign=powered_by_nopcommerce&utm_content=dashboard
                - heading "9. “Powered by” link Remove the “Powered by nopCommerce” link from the footer" [level=5] [ref=e185]:
                  - text: 9. “Powered by” link
                  - generic [ref=e186]: Remove the “Powered by nopCommerce” link from the footer
      - generic [ref=e189]:
        - generic [ref=e190]:
          - generic [ref=e191]: NopCommerce News
          - button [ref=e194] [cursor=pointer]
        - generic [ref=e197]:
          - generic [ref=e199]:
            - link "PayPal Commerce" [ref=e201] [cursor=pointer]:
              - /url: https://www.nopcommerce.com/paypal-commerce-the-official-integration?utm_source=demo-admin-panel&utm_medium=dashboard&utm_campaign=paypal
            - generic [ref=e202]:
              - text: PayPal Commerce delivers a complete payments platform with the global scale and flexibility your business needs to stay competitive.
              - link "Download" [ref=e203] [cursor=pointer]:
                - /url: https://www.nopcommerce.com/paypal-commerce-the-official-integration?utm_source=demo-admin-panel&utm_medium=dashboard&utm_campaign=paypal
              - text: the plugin.
          - generic [ref=e205]:
            - link "\"Powered by nopCommerce\" link" [ref=e207] [cursor=pointer]:
              - /url: https://www.nopcommerce.com/nopcommerce-copyright-removal-key?utm_source=demo-admin-panel&utm_medium=dashboard&utm_campaign=powered_by_nopcommerce
            - generic [ref=e208]:
              - text: Would you like to remove the "Powered by nopCommerce" link in the bottom of the footer? Click
              - link "here" [ref=e209] [cursor=pointer]:
                - /url: https://www.nopcommerce.com/nopcommerce-copyright-removal-key?utm_source=demo-admin-panel&utm_medium=dashboard&utm_campaign=powered_by_nopcommerce
              - text: for more info.
          - generic [ref=e211]:
            - link "Recommended hosting for your store" [ref=e213] [cursor=pointer]:
              - /url: https://www.everleap.com/cloud-hosting/web-app/nopcommerce/hosting/?utm_source=NOPC&utm_medium=TXT&utm_content=PREMCP&utm_campaign=MIG30DYS
            - generic [ref=e214]:
              - text: Everleap cloud hosting seamlessly scales sites with ease and they move stores for free.
              - link "Learn more" [ref=e215] [cursor=pointer]:
                - /url: https://www.everleap.com/cloud-hosting/web-app/nopcommerce/hosting/?utm_source=NOPC&utm_medium=TXT&utm_content=PREMCP&utm_campaign=MIG30DYS
              - text: and get a 30 day free trial.
      - generic [ref=e218]:
        - generic [ref=e219]:
          - generic [ref=e220]: Common statistics
          - button [ref=e223] [cursor=pointer]
        - generic [ref=e226]:
          - generic [ref=e228]:
            - generic [ref=e229]:
              - heading "5" [level=3] [ref=e230]
              - paragraph [ref=e231]: Orders
            - generic: 
            - link "More info" [ref=e233] [cursor=pointer]:
              - /url: /Admin/Order/List
          - generic [ref=e236]:
            - generic [ref=e237]:
              - heading "0" [level=3] [ref=e238]
              - paragraph [ref=e239]: Pending return requests
            - generic: 
            - link "More info" [ref=e241] [cursor=pointer]:
              - /url: /Admin/ReturnRequest/List
          - generic [ref=e244]:
            - generic [ref=e245]:
              - heading "6" [level=3] [ref=e246]
              - paragraph [ref=e247]: Registered customers
            - generic: 
            - link "More info" [ref=e249] [cursor=pointer]:
              - /url: /Admin/Customer/List
          - generic [ref=e252]:
            - generic [ref=e253]:
              - heading "1" [level=3] [ref=e254]
              - paragraph [ref=e255]: Low stock products
            - generic: 
            - link "More info" [ref=e257] [cursor=pointer]:
              - /url: /Admin/Report/LowStock
      - generic [ref=e259]:
        - generic [ref=e262]:
          - heading "Orders" [level=3] [ref=e263]
          - generic [ref=e265]:
            - button "Year" [ref=e266] [cursor=pointer]
            - button "Month" [ref=e267] [cursor=pointer]
            - button "Week" [ref=e268] [cursor=pointer]
            - button [ref=e269] [cursor=pointer]
        - generic [ref=e276]:
          - heading "New customers" [level=3] [ref=e277]
          - generic [ref=e279]:
            - button "Year" [ref=e280] [cursor=pointer]
            - button "Month" [ref=e281] [cursor=pointer]
            - button "Week" [ref=e282] [cursor=pointer]
            - button [ref=e283] [cursor=pointer]
      - generic [ref=e288]:
        - generic [ref=e290]:
          - generic [ref=e291]:
            - heading "Order totals" [level=3] [ref=e292]
            - button [ref=e295] [cursor=pointer]
          - generic [ref=e299]:
            - generic [ref=e302]:
              - table [ref=e305]:
                - rowgroup [ref=e306]:
                  - row [ref=e307]:
                    - columnheader "Order Status" [ref=e308]
                    - columnheader "Today" [ref=e311]
                    - columnheader "This Week" [ref=e314]
                    - columnheader "This Month" [ref=e317]
                    - columnheader "This Year" [ref=e320]
                    - columnheader "All time" [ref=e323]
              - table [ref=e334]:
                - rowgroup:
                  - row "Order Status Today This Week This Month This Year All time":
                    - columnheader "Order Status"
                    - columnheader "Today"
                    - columnheader "This Week"
                    - columnheader "This Month"
                    - columnheader "This Year"
                    - columnheader "All time"
                - rowgroup [ref=e347]:
                  - row [ref=e348]:
                    - cell "Pending" [ref=e349]
                    - cell "$0.00" [ref=e350]
                    - cell "$0.00" [ref=e351]
                    - cell "$0.00" [ref=e352]
                    - cell "$0.00" [ref=e353]
                    - cell "$2,468.80" [ref=e354]
                  - row [ref=e355]:
                    - cell "Processing" [ref=e356]
                    - cell "$0.00" [ref=e357]
                    - cell "$0.00" [ref=e358]
                    - cell "$0.00" [ref=e359]
                    - cell "$0.00" [ref=e360]
                    - cell "$1,957.00" [ref=e361]
                  - row [ref=e362]:
                    - cell "Complete" [ref=e363]
                    - cell "$0.00" [ref=e364]
                    - cell "$0.00" [ref=e365]
                    - cell "$0.00" [ref=e366]
                    - cell "$0.00" [ref=e367]
                    - cell "$43.50" [ref=e368]
                  - row [ref=e369]:
                    - cell "Cancelled" [ref=e370]
                    - cell "$0.00" [ref=e371]
                    - cell "$0.00" [ref=e372]
                    - cell "$0.00" [ref=e373]
                    - cell "$0.00" [ref=e374]
                    - cell "$0.00" [ref=e375]
              - generic:
                - generic:
                  - table
            - button [ref=e379] [cursor=pointer]
        - generic [ref=e383]:
          - generic [ref=e384]:
            - heading "Incomplete orders" [level=3] [ref=e385]
            - button [ref=e388] [cursor=pointer]
          - generic [ref=e392]:
            - generic [ref=e395]:
              - table [ref=e398]:
                - rowgroup [ref=e399]:
                  - row [ref=e400]:
                    - columnheader "Item" [ref=e401]
                    - columnheader "Total" [ref=e404]
                    - columnheader "Count" [ref=e407]
              - table [ref=e415]:
                - rowgroup:
                  - row "Item Total Count":
                    - columnheader "Item"
                    - columnheader "Total"
                    - columnheader "Count"
                - rowgroup [ref=e422]:
                  - row [ref=e423]:
                    - cell "Total unpaid orders (pending payment status)" [ref=e424]
                    - cell "$2,468.80" [ref=e425]
                    - cell [ref=e426]:
                      - link "2 - view all" [ref=e427] [cursor=pointer]:
                        - /url: /Admin/Order/List?orderStatuses=10,20,30&paymentStatuses=10
                  - row [ref=e429]:
                    - cell "Total not yet shipped orders" [ref=e430]
                    - cell "$4,315.00" [ref=e431]
                    - cell [ref=e432]:
                      - link "2 - view all" [ref=e433] [cursor=pointer]:
                        - /url: /Admin/Order/List?orderStatuses=10,20,30&shippingStatuses=20
                  - row [ref=e435]:
                    - cell "Total incomplete orders (pending order status)" [ref=e436]
                    - cell "$2,468.80" [ref=e437]
                    - cell [ref=e438]:
                      - link "2 - view all" [ref=e439] [cursor=pointer]:
                        - /url: /Admin/Order/List?orderStatuses=10
              - generic:
                - generic:
                  - table
            - button [ref=e444] [cursor=pointer]
      - generic [ref=e447]:
        - generic [ref=e449]:
          - generic [ref=e450]:
            - heading [level=3] [ref=e451]:
              - text: Latest Orders
              - link "View All Orders" [ref=e453] [cursor=pointer]:
                - /url: /Admin/Order/List
            - button [ref=e455] [cursor=pointer]
          - generic [ref=e459]:
            - generic [ref=e462]:
              - table [ref=e465]:
                - rowgroup [ref=e466]:
                  - row [ref=e467]:
                    - 'columnheader "Order #" [ref=e468]'
                    - columnheader "Order status" [ref=e471]
                    - columnheader "Customer" [ref=e474]
                    - columnheader "Created on" [ref=e477]
                    - columnheader "View" [ref=e480]
              - table [ref=e490]:
                - rowgroup:
                  - 'row "Order # Order status Customer Created on View"':
                    - 'columnheader "Order #"'
                    - columnheader "Order status"
                    - columnheader "Customer"
                    - columnheader "Created on"
                    - columnheader "View"
                - rowgroup [ref=e501]:
                  - row [ref=e502]:
                    - cell "5" [ref=e503]
                    - cell "Complete" [ref=e504]
                    - cell "Victoria Terces (victoria_victoria@nopCommerce.com)" [ref=e505]
                    - cell "11/04/2025 2:32:26 AM" [ref=e506]
                    - cell [ref=e507]:
                      - link "View" [ref=e508] [cursor=pointer]:
                        - /url: /Admin/Order/Edit/5
                  - row [ref=e510]:
                    - cell "4" [ref=e511]
                    - cell "Processing" [ref=e512]
                    - cell "Brenda Lindgren (brenda_lindgren@nopCommerce.com)" [ref=e513]
                    - cell "11/04/2025 2:32:26 AM" [ref=e514]
                    - cell [ref=e515]:
                      - link "View" [ref=e516] [cursor=pointer]:
                        - /url: /Admin/Order/Edit/4
                  - row [ref=e518]:
                    - cell "3" [ref=e519]
                    - cell "Pending" [ref=e520]
                    - cell "James Pan (james_pan@nopCommerce.com)" [ref=e521]
                    - cell "11/04/2025 2:32:26 AM" [ref=e522]
                    - cell [ref=e523]:
                      - link "View" [ref=e524] [cursor=pointer]:
                        - /url: /Admin/Order/Edit/3
                  - row [ref=e526]:
                    - cell "2" [ref=e527]
                    - cell "Pending" [ref=e528]
                    - cell "Arthur Holmes (arthur_holmes@nopCommerce.com)" [ref=e529]
                    - cell "11/04/2025 2:32:26 AM" [ref=e530]
                    - cell [ref=e531]:
                      - link "View" [ref=e532] [cursor=pointer]:
                        - /url: /Admin/Order/Edit/2
                  - row [ref=e534]:
                    - cell "1" [ref=e535]
                    - cell "Processing" [ref=e536]
                    - cell "Steve Gates (steve_gates@nopCommerce.com)" [ref=e537]
                    - cell "11/04/2025 2:32:26 AM" [ref=e538]
                    - cell [ref=e539]:
                      - link "View" [ref=e540] [cursor=pointer]:
                        - /url: /Admin/Order/Edit/1
              - generic:
                - generic:
                  - table
            - generic [ref=e543]:
              - navigation "pagination" [ref=e545]:
                - list [ref=e546]:
                  - listitem [ref=e547]:
                    - generic "Previous"
                  - listitem [ref=e548]:
                    - link "1" [ref=e549] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e550]:
                    - generic "Next"
              - status [ref=e551]: 1-5 of 5 items
        - generic [ref=e553]:
          - generic [ref=e554]:
            - heading "Popular search keywords" [level=3] [ref=e555]
            - button [ref=e558] [cursor=pointer]
          - generic [ref=e562]:
            - generic [ref=e565]:
              - table [ref=e568]:
                - rowgroup [ref=e569]:
                  - row [ref=e570]:
                    - columnheader "Keyword" [ref=e571]
                    - columnheader "Count" [ref=e574]
              - table [ref=e581]:
                - rowgroup:
                  - row "Keyword Count":
                    - columnheader "Keyword"
                    - columnheader "Count"
                - rowgroup [ref=e586]:
                  - row [ref=e587]:
                    - cell "computer" [ref=e588]
                    - cell "34" [ref=e589]
                  - row [ref=e590]:
                    - cell "camera" [ref=e591]
                    - cell "30" [ref=e592]
                  - row [ref=e593]:
                    - cell "jewelry" [ref=e594]
                    - cell "27" [ref=e595]
                  - row [ref=e596]:
                    - cell "shoes" [ref=e597]
                    - cell "26" [ref=e598]
                  - row [ref=e599]:
                    - cell "jeans" [ref=e600]
                    - cell "19" [ref=e601]
              - generic:
                - generic:
                  - table
            - generic [ref=e603]:
              - navigation "pagination" [ref=e605]:
                - list [ref=e606]:
                  - listitem [ref=e607]:
                    - generic "Previous"
                  - listitem [ref=e608]:
                    - link "1" [ref=e609] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e610]:
                    - link "Next" [ref=e611] [cursor=pointer]:
                      - /url: "#"
              - status [ref=e612]: 1-5 of 6 items
      - generic [ref=e613]:
        - generic [ref=e615]:
          - generic [ref=e616]:
            - heading "Bestsellers by quantity" [level=3] [ref=e617]
            - button [ref=e620] [cursor=pointer]
          - generic [ref=e624]:
            - generic [ref=e627]:
              - table [ref=e630]:
                - rowgroup [ref=e631]:
                  - row [ref=e632]:
                    - columnheader "Name" [ref=e633]
                    - columnheader "Total quantity" [ref=e636]
                    - columnheader "Total amount (excl tax)" [ref=e639]
                    - columnheader "View" [ref=e642]
              - table [ref=e651]:
                - rowgroup:
                  - row "Name Total quantity Total amount (excl tax) View":
                    - columnheader "Name"
                    - columnheader "Total quantity"
                    - columnheader "Total amount (excl tax)"
                    - columnheader "View"
                - rowgroup [ref=e660]:
                  - row [ref=e661]:
                    - cell "Leica T Mirrorless Digital Camera" [ref=e662]
                    - cell "1" [ref=e663]
                    - cell "$530.00" [ref=e664]
                    - cell [ref=e665]:
                      - link "View" [ref=e666] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/16
                  - row [ref=e668]:
                    - cell "Apple iCam" [ref=e669]
                    - cell "1" [ref=e670]
                    - cell "$1,300.00" [ref=e671]
                    - cell [ref=e672]:
                      - link "View" [ref=e673] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/17
                  - row [ref=e675]:
                    - cell "Levi's 511 Jeans" [ref=e676]
                    - cell "1" [ref=e677]
                    - cell "$43.50" [ref=e678]
                    - cell [ref=e679]:
                      - link "View" [ref=e680] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/32
                  - row [ref=e682]:
                    - cell "Fahrenheit 451 by Ray Bradbury" [ref=e683]
                    - cell "1" [ref=e684]
                    - cell "$27.00" [ref=e685]
                    - cell [ref=e686]:
                      - link "View" [ref=e687] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/36
                  - row [ref=e689]:
                    - cell "First Prize Pies" [ref=e690]
                    - cell "1" [ref=e691]
                    - cell "$51.00" [ref=e692]
                    - cell [ref=e693]:
                      - link "View" [ref=e694] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/37
              - generic:
                - generic:
                  - table
            - generic [ref=e697]:
              - navigation "pagination" [ref=e699]:
                - list [ref=e700]:
                  - listitem [ref=e701]:
                    - generic "Previous"
                  - listitem [ref=e702]:
                    - link "1" [ref=e703] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e704]:
                    - link "2" [ref=e705] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e706]:
                    - link "3" [ref=e707] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e708]:
                    - link "Next" [ref=e709] [cursor=pointer]:
                      - /url: "#"
              - status [ref=e710]: 1-5 of 12 items
        - generic [ref=e712]:
          - generic [ref=e713]:
            - heading "Bestsellers by amount" [level=3] [ref=e714]
            - button [ref=e717] [cursor=pointer]
          - generic [ref=e721]:
            - generic [ref=e724]:
              - table [ref=e727]:
                - rowgroup [ref=e728]:
                  - row [ref=e729]:
                    - columnheader "Name" [ref=e730]
                    - columnheader "Total quantity" [ref=e733]
                    - columnheader "Total amount (excl tax)" [ref=e736]
                    - columnheader "View" [ref=e739]
              - table [ref=e748]:
                - rowgroup:
                  - row "Name Total quantity Total amount (excl tax) View":
                    - columnheader "Name"
                    - columnheader "Total quantity"
                    - columnheader "Total amount (excl tax)"
                    - columnheader "View"
                - rowgroup [ref=e757]:
                  - row [ref=e758]:
                    - cell "Vintage Style Engagement Ring" [ref=e759]
                    - cell "1" [ref=e760]
                    - cell "$2,100.00" [ref=e761]
                    - cell [ref=e762]:
                      - link "View" [ref=e763] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/41
                  - row [ref=e765]:
                    - cell "Apple iCam" [ref=e766]
                    - cell "1" [ref=e767]
                    - cell "$1,300.00" [ref=e768]
                    - cell [ref=e769]:
                      - link "View" [ref=e770] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/17
                  - row [ref=e772]:
                    - cell "Leica T Mirrorless Digital Camera" [ref=e773]
                    - cell "1" [ref=e774]
                    - cell "$530.00" [ref=e775]
                    - cell [ref=e776]:
                      - link "View" [ref=e777] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/16
                  - row [ref=e779]:
                    - cell "Flower Girl Bracelet" [ref=e780]
                    - cell "1" [ref=e781]
                    - cell "$360.00" [ref=e782]
                    - cell [ref=e783]:
                      - link "View" [ref=e784] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/40
                  - row [ref=e786]:
                    - cell "First Prize Pies" [ref=e787]
                    - cell "1" [ref=e788]
                    - cell "$51.00" [ref=e789]
                    - cell [ref=e790]:
                      - link "View" [ref=e791] [cursor=pointer]:
                        - /url: /Admin/Product/Edit/37
              - generic:
                - generic:
                  - table
            - generic [ref=e794]:
              - navigation "pagination" [ref=e796]:
                - list [ref=e797]:
                  - listitem [ref=e798]:
                    - generic "Previous"
                  - listitem [ref=e799]:
                    - link "1" [ref=e800] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e801]:
                    - link "2" [ref=e802] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e803]:
                    - link "3" [ref=e804] [cursor=pointer]:
                      - /url: "#"
                  - listitem [ref=e805]:
                    - link "Next" [ref=e806] [cursor=pointer]:
                      - /url: "#"
              - status [ref=e807]: 1-5 of 12 items
  - generic [ref=e811]:
    - generic [ref=e812]:
      - text: Powered by
      - link "nopCommerce" [ref=e813] [cursor=pointer]:
        - /url: https://www.nopcommerce.com/?utm_source=demo-admin-panel&utm_medium=footer&utm_campaign=admin-panel
    - generic [ref=e814]: Wednesday, August 12, 2026 7:29 AM
    - generic [ref=e815]: nopCommerce version 4.90.4
```

# Test source

```ts
  149 |   async getCommonStasticsTitle() {
  150 |     return await this.page.locator(this.commonStatisticsTitle).innerText();
  151 |   }
  152 | 
  153 |   async getStatisticsCount() {
  154 |     const newsListCount = this.page.locator(this.allcommonStatisticsListed).count();
  155 |     return newsListCount;
  156 |   }
  157 | 
  158 |   async verify_correct_static_page_is_open_when_click() {
  159 |     let flag = false;
  160 |     const stasticsCards = await this.page.locator(this.moreInfoOnCard);
  161 |     const count = await this.page.locator(this.moreInfoOnCard).count();
  162 | 
  163 |    
  164 |     for (let i = 0; i < count; i++) {
  165 |       const ele = stasticsCards.nth(i);
  166 |       const beforeTitle = await ele.locator(this.indivisualCommonStatisticsTitle_beforeOpened).innerText();
  167 |       await ele.click();
  168 |       
  169 |       const afterTitle = await this.page.locator(this.indivisualCommonStatisticsTitle_whenOpened).innerText();
  170 |       if (beforeTitle === afterTitle) {
  171 |         flag = true;
  172 |       }
  173 |       await this.page.goBack();
  174 |     }
  175 |     return flag;
  176 |   }
  177 | 
  178 |   async verify_the_count_from_order_card() {
  179 |     
  180 |     const countOnCardElement = await this.page.locator(this.totalOrderNumber_From_OrderCard)
  181 |     const countOFOrderOnCard = countOnCardElement.innerText();
  182 |     //*[contains(@class, 'inner')]/p[text()= 'Orders']/preceding-sibling::h3./parent::div//following-sibling::a
  183 |     await countOnCardElement.locator("//parent::div//following-sibling::a").click();
  184 |     await this.page.waitForLoadState('domcontentloaded')
  185 |     await this.page.waitForLoadState('networkidle')
  186 |     const countText = await this.page.locator(this.totalOrderNumberFrom_InsideofOrderCard).textContent();
  187 |     
  188 |     const innerCount = countText.split(" ")
  189 |    
  190 |   
  191 | 
  192 |     return innerCount[2]
  193 | 
  194 | 
  195 |   }
  196 | 
  197 |   async verify_the_count_from_customer_card() {
  198 |    
  199 |     const countOnCardElement = await this.page.locator(this.totalNumberofRegisterCustomer_From_CustomerCard)
  200 |     const countOFCustomerOnCard = countOnCardElement.innerText();
  201 |     //*[contains(@class, 'inner')]/p[text()= 'Orders']/preceding-sibling::h3./parent::div//following-sibling::a
  202 |     await countOnCardElement.locator("//parent::div//following-sibling::a").click();
  203 |     await this.page.waitForLoadState('domcontentloaded')
  204 |     await this.page.waitForLoadState('networkidle')
  205 |     const countText = await this.page.locator(this.totalOrderNumberFrom_InsideofCustomerCard).innerText();
  206 | 
  207 |     const innerCount = countText.split(" ")
  208 |    
  209 | 
  210 |     return innerCount[2];
  211 | 
  212 | 
  213 |   }
  214 | 
  215 | 
  216 |   async verify_that_sort_order_of_amounts() {
  217 |     const nextBtn = this.page.locator(this.nextButton_popularSearchButton);
  218 |     let nextBtn_enabality = true;
  219 |     const amount = []
  220 |     while (nextBtn_enabality) {
  221 | 
  222 |       const rows_fromTable = this.page.locator(this.Bestsellerbyamount_table_rows)
  223 |       const count = rows_fromTable.count();
  224 |       for (let i = 0; i < count; i++) {
  225 |         amount.push(await rows_fromTable.locator('td').nth(1).innerText());
  226 |       }
  227 | 
  228 |       console.log(amount)
  229 |       if (nextBtn.isEnabled()) {
  230 |         nextBtn_enabality = true;
  231 |         await nextBtn.click();
  232 |       }
  233 |       else {
  234 |         nextBtn_enabality = false;
  235 |       }
  236 |     }
  237 |     return amount
  238 |   }
  239 | 
  240 |   // @ts-ignore
  241 |   async sort_String_list_desc(listName) {
  242 |     // @ts-ignore
  243 |     const sortedList = listName.toSorted((a, b) => b.localeCompare(a));
  244 |     return sortedList;
  245 |   }
  246 | 
  247 |   async gotoTheProducts(){
  248 |     await this.page.locator(this.catlogMenu).click();
> 249 |     await this.page.locator(this.catlog_products).click();
      |                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  250 |   }
  251 | }
  252 | 
```