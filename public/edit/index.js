// populate page with product data
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.idInQuery;
  console.log(value);
  let productContainer = document.getElementById("container");
  
  const fillCurrentProductData = async () => {
    let data = await fetch(`http://localhost:5000/get_specific_product/${value}`);
  
    data.json().then((parsedData) => {
      
        // prefill input fields with current product data
        let nameInput = document.getElementById("name-input");
        nameInput.value = `${parsedData.name}`;
  
        let urlInput = document.getElementById("imageUrl-input");
        urlInput.value = `${parsedData.image}`;
  
        let priceInput = document.getElementById("price-input");
        priceInput.value = `${parsedData.price}`;
  
        let inventoryInput = document.getElementById("inventory-input");
        inventoryInput.value = `${parsedData.inventory}`;
  
        let descriptionInput = document.getElementById("description-input");
        descriptionInput.value = `${parsedData.description}`;
  
        let inStock = document.getElementById("inStock");
        inStock.value = `${parsedData.inStock}`;
      
    });
  };
  fillCurrentProductData();
  
  
  
  // functionality to update a product in the database
  let updateButton = document.getElementById("update-button");
  
  updateButton.addEventListener("click", async () => {
    let name = document.getElementById("name-input").value;
    let description = document.getElementById("description-input").value;
    let image = document.getElementById("imageUrl-input").value;
    let priceNumber = +document.getElementById("price-input").value;
    let inventoryNumber = +document.getElementById("inventory-input").value;
    let inStock = document.getElementById("inStock-input").value === "true" ? true : false;
      
  
    const updatedProduct = {
            image,
            priceNumber,
            inventoryNumber,
            name,
            description,
            inStock
        };
    
  
    let response = await fetch(
      `http://localhost:5000/update_product/${value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
  
    let uploadStatusTag = document.getElementById("upload-status");
    if (response.status === 200) {
      console.log(`${response.status} - Great Success!`);
      uploadStatusTag.classList.remove("hidden");
      uploadStatusTag.textContent = "Update Completed!";
      uploadStatusTag.style.color = "green";
    } else {
      console.log(response);
      uploadStatusTag.classList.remove("hidden");
      uploadStatusTag.textContent = "Update Failed :(";
      uploadStatusTag.style.color = "red";
    }
  
    let finalData = await response.json();
    console.log(finalData);
  });
  
  
  