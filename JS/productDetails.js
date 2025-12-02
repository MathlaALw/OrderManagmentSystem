
// Get id from URL 
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

async function fetchProductDetails(id) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    const data = await res.json();
    return data.data;   // product object
}

async function displayProductDetails() {
    if (!productId) return;

    try {
        // Show loader, hide content
        loader.classList.remove('d-none');
        detailsContent.classList.add('d-none');


        const product = await fetchProductDetails(productId);
        //  images array for the carousel 
        // imageCover + extra images 
        let images = [product.imageCover];
        if (product.images && product.images.length > 0) {
            images = [product.imageCover, ...product.images];
        }

        const carouselInner = document.getElementById('carouselInner');
        let slidesHTML = '';

        images.forEach((img, index) => {
            slidesHTML += `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" alt="${product.title}">
        </div>
        `;
        });

        carouselInner.innerHTML = slidesHTML;

        //Fill in other product details 

        document.getElementById('detailsTitle').textContent = product.title;
        document.getElementById('detailsBrand').textContent = product.brand?.name || '';

        const categoryName = product.category?.name || '';
        document.getElementById('detailsCategory').textContent = categoryName;

        document.getElementById('detailsDescription').textContent =
            product.description || '';

        document.getElementById('detailsPrice').textContent = `${product.price} EGP`;
        document.getElementById('detailsRating').textContent = product.ratingsAverage;

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Hide loader, show content
        loader.classList.add('d-none');
        detailsContent.classList.remove('d-none');

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        loader.innerHTML = `
            <p class="text-danger text-center">Failed to load product details.</p>
        `;
    }

}

displayProductDetails();
