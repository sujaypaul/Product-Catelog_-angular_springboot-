### First application (REST API – No UI, only backend):
---
#### User authentication API 
Build a Rest API to support successful/unsuccessful user authentication validation.
#### User registration API
Build a Rest API to register new users.
#### Search product API
Build a Rest API to search a product by one or many of the following parameters:
1. Name
2. Product code
3. Brand
#### Product Details API
Build a Rest API to get other details such as description for product
#### Get Price API
Build a Rest API to get prices for a product or list of products.
#### Get Serviceability API
Build a Rest API to check if a product is serviceable/deliverable to a certain pincode and what is the expected delivery time
#
### Second Application (using Angular):
---
Technology stack: Angular 11, Responsive design, SASS/LESS (Bonus), Angular CLI, npm
#### Homepage
Landing page should have links for Registration and Login.
Homepage should show a search box with which a customer can search for a product.
#### Login Page
The application should have a login page. User should be able to login. Proper error messages should be handled in case of invalid authentication.
#### Registration Page
The application should have a registration page. User should be able to register. Validation for email address, password policy, mandatory fields such as name etc. should be performed.
#### Product search page
Search screen should search the input text against all input parameters specified for matching products
#### Results Page
Once Search is triggered after specifying the search parameters, It will display the search results using the API from 1st Application.
The search results should display product image, name and brand
The user should be able to see the products and filter them further by brand.
#####  If a customer is logged in,
* they should be able to view prices of every product in the search results
* they should be able to click on view details link on every product
* they should be able to filter products by price range

If no results are found, error messages should be displayed.
#### Product details page.
<p> Logged in users can view product details by clicking on view product details link from search page.</p>
<p>The product details page should show product image, product name, description, brand, price and a textbox to check serviceability</p>
<p>Logged in user can enter their pincode in the textbox to check serviceability. Once they click on submit, they should get a proper message whether the product can be delivered to their pincode or not and what is the expected delivery time.</p>
 <h4>Logout</h4>
User should be provided with an option to logout.
