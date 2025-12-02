

// async function to fetch product data from an API

async function fetchProductData() {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);

        const productData = await response.json();
        return productData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// function to display product data on the webpage

async function displayProductData() {
    const data = await fetchProductData();
    const products = data.data;
    let productContainer = document.querySelector('#productsRow');
    let productHTML = '';
    products.forEach(product => {
        // Get subcategory name 
        const subCategoryName =
            product.subcategory && product.subcategory.length
                ? product.subcategory[0].name
                : '';

        // productHTML += `
        // <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 ">
        //     <div class="product-card p-3 h-100 d-flex flex-column ">
        //         <img src="${product.imageCover}" class="img-fluid mb-3" alt="${product.title}">

        //         <p class="product-subcategory mb-1 card-title-color">${subCategoryName}</p>
        //         <p class="product-title mb-2 ">${product.title}</p>

        //         <div class="d-flex justify-content-between align-items-start mb-2">
        //             <span class="product-price">${product.price} EGP</span>
        //             <span class="product-rating">
        //                 <i class="fa-solid fa-star star-color"></i> ${product.ratingsAverage}
        //             </span>
        //         </div>

        //         <div class="mt-auto d-flex gap-2 justify-content-between ">
        //             <button class="product-btn btn-sm ">view</button>
        //             <button class="product-btn btn-sm ">Wish list</button>
        //         </div>
        //     </div>
        // </div>
        // `;

        productHTML += `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div class="product-card p-3 d-flex flex-column">

                    <!-- fixed-height image area -->
                    <div class="product-image-wrapper mb-3">
                        <img src="${product.imageCover}" class="product-img" alt="${product.title}">
                    </div>

                    <p class="product-subcategory">${subCategoryName}</p>

                    <!-- fixed-height title -->
                    <h5 class="product-title mb-2">${product.title}</h5>

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="product-price">${product.price} EGP</span>
                        <span class="product-rating">
                            <i class="fa-solid fa-star star-color"></i> ${product.ratingsAverage}
                        </span>
                    </div>

                    <div class="mt-auto d-flex gap-2 justify-content-between">
                    
                        <button class="product-btn btn-sm" onclick="window.location.href='productDetails.html?id=${product._id}'">View</button>
                        <button class="product-btn btn-sm">Wish List</button>
                    </div>

                </div>
            </div>
            `;

    });




    productContainer.innerHTML = productHTML;
}
displayProductData();