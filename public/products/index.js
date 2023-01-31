console.log("js Connected");

let containerElement = document.getElementById('container')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let productId = params.idInQuery;
  let nameSearched = params.searchedName; //
console.log(productId);
console.log(nameSearched);
let productDataGlobal;
const showProduct = async () => {
    let res = await fetch(`http://localhost:5000/get_specific_product/${productId}`);
    res.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        productDataGlobal = parsedData
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
            // if not ready to eat- red text
            let pTag = document.createElement("div"); // <p></p>
            pTag.innerHTML = `<h3 class="product_name" >${parsedData.name}</h3>
            <img class = "product_image" id="${parsedData._id}" src="${parsedData.image}" alt="">
            <p class="product_description" >${parsedData.description}</p>
            <p class="product_price" >Price: $${parsedData.price}</p> 
            <p class="product_inventory" id="inventory" >${parsedData.inventory} Left</p>
            <p id="inStock">In Stock: ${parsedData.inStock}</p>
            <a href="http://localhost:5000/edit?idInQuery=${parsedData._id}">Update </a>
             `
            containerElement.appendChild(pTag);
    })    
}

const searchedName = async () => {
        let res = await fetch(`http://localhost:5000/product_by_name/${nameSearched}`);
    res.json().then((parsedData) => {
        console.log(parsedData.name); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
            // if not ready to eat- red text
            let pTag = document.createElement("div"); // <p></p>
            pTag.innerHTML = `<h3 class="product_name" >${parsedData.name}</h3>
            <img class = "product_image" id="${parsedData._id}" src="${parsedData.image}" alt="">
            <p class="product_description" ${parsedData.description}</p>
            <p class="product_price" >Price: $${parsedData.price}</p> 
            <p class="product_inventory" id="inventory" >${parsedData.inventory} Left</p>
            <p id="inStock">In Stock: ${parsedData.inStock}</p> 
            <a href="http://localhost:5000/edit?idInQuery=${parsedData._id}">Update </a>
             `
            containerElement.appendChild(pTag);
    })  
    
}

if(productId){
    showProduct()
}
if(nameSearched){
   searchedName()
};

//Delete function

let deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("click", async () => {
  let response = await fetch(
    `http://localhost:5000/delete_product/${productId}`,
    {
      method: "delete",
    }
  );
  window.location.href = "../index.html";
  console.log(response);
});

 // Buy Function
 let buyButton = document.getElementById("buy-btn");
  
 buyButton.addEventListener("click", async () => {
   
 

   let newNumber = productDataGlobal.inventory -1
   let inStock = newNumber == 0 ? false : true
   let inventoryHtml = document.getElementById("inventory")
   inventoryHtml.textContent = newNumber
   buyButton.disabled = !inStock ? true : false 
   let stockHtml = document.getElementById("inStock") 

     console.log(newNumber);
   
    if(inStock == false){
        stockHtml.innerHTML = "Out Of Stock"
    }

   const buyProduct = {
           newNumber,
           inStock
       };
   
    

 
   let response = await fetch(
     `http://localhost:5000/buy_product/${productDataGlobal._id}`,
     {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(buyProduct),
     }
   );
   let finalData = await response.json();
    console.log(finalData);
   
    if(inStock == true){
        window.location.href = `http://localhost:5000/products?idInQuery=${productId}`;
    }
     
  });