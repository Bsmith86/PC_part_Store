# Product Store

## Project Details

__Pages:__


__HOME__ page (index):  Shows list of products (can visit each product from here)

 * all the products are displayed

 * the images link to the PRODUCT page
 
 * there should be a link to add a new product

__PRODUCT__ page: Shows specific product and it's details

* a link back to the HOME page

* a link to edit the product (goes to the edit page)

* a delete button that deletes

* user can also search for a specific product from this page

* Clicking buy button should lower remaining by 1

* If the quantity of your item is zero, the show page should say 'OUT OF STOCK' instead of saying how many are remaining. (Hint: conditionals).

* On the edit page, make sure you can set the quantity to zero if you want so that you can test if this is working.

* The BUY button should also not be rendered if the quantity of the item is zero

__EDIT__ page: Should allow you to edit the data of a specific product (using it’s product ID)

__CREATE__ page - allows for creation of new products (users will include a URL for the image)

__Redirects:__

1. The create route should redirect to HOME after creation

1. The delete route should redirect to HOME after deletion

1. The edit route will redirect to the edited product's PRODUCT page after the object is changed in your collection.
