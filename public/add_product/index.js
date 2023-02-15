console.log("js file connected");


let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
   
    
    let image = document.getElementById('image-input').value;
    let priceNumber = document.getElementById('price-input').value;
    let inventoryNumber = +document.getElementById('inventory-input').value;
    // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let name = document.getElementById('name-input').value
    let description = document.getElementById('description-input').value
    let inStock = document.getElementById('inStockSelect').value
    // packing all our data in an object
    // same as 
    // nameString: nameString
    const items = {
        image,
        priceNumber,
        inventoryNumber,
        name,
        description,
        inStock
    }


    let response = await fetch('../create_product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(items)
    })
    let uploadStatusTag = document.getElementById('upload-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("upload complete!!!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }
    window.location.href = "../index.html"
})


let homePageButton = document.getElementById('home');

homePageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "../index.html"
})