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
            pTag.innerHTML = `<h3 class="product_name">${object.name}</h3>
            <img class = "product_image" src="${object.image}" alt="">
            <p class="product_price" >Price: ${object.price}</p>`
            containerElement.appendChild(pTag);
        })
    })
}

getData()
