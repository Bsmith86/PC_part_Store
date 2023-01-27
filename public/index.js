// const bodyParser = require("body-parser");

console.log("Display Page");

let containerElement = document.getElementById('container')
let addLink = document.getElementById('add_product')

addLink.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "./add_product/index.html"
})


const getData = async () => {
    let data = await fetch("/get_data");
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
        parsedData.forEach((object, index) => {
            // if not ready to eat- red text
            let pTag = document.createElement("div"); // <p></p>
            pTag.innerHTML = `<h3 class="product_name" >${object.name}</h3>
            <a  href="http://localhost:5000/products?idInQuery=${object._id}">
            <img  class = "product_image" id="${object._id}" src="${object.image}" alt="">
            </a>
            <p class="product_price" >Price: ${object.price}</p>`
            containerElement.appendChild(pTag);
        })
    })
}


getData()

// functionality to search 
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  let userQuery = document.getElementById("psearch").value;

     console.log(userQuery);
    
       window.location.href = `./products/?searchedName=${userQuery}`
    // });

});