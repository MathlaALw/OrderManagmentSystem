

// Fetch categories from API
async function fetchCategories() {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    const data = await res.json();
    return data.data;
}

async function displayCategoriesSlider() {
    const categories = await fetchCategories();
    const slider = document.getElementById('categoriesSlider');
    if (!slider) return;

    // Create the track
    const track = document.createElement('div');
    track.classList.add('slider-track');

    // Helper to create a single card item
    function createCard(cat) {
        const item = document.createElement('div');
        item.classList.add('slider-item');
        item.innerHTML = `
            <div class="category-card">
                <img src="${cat.image}" alt="${cat.name}" class="category-card-img">
                <div class="category-card-footer">
                    <p class="category-card-name">${cat.name}</p>
                </div>
            </div>
        `;
        return item;
    }

    // Add all categories once
    categories.forEach(cat => {
        track.appendChild(createCard(cat));
    });

    
    slider.innerHTML = '';
    slider.appendChild(track);

    // one by one + infinite loop 
    let itemWidth = 0;

    function calculateItemWidth() {
        const firstItem = track.querySelector('.slider-item');
        if (!firstItem) return;
        const rect = firstItem.getBoundingClientRect();
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.gap) || 0;
        itemWidth = rect.width + gap;
    }

    calculateItemWidth();
    window.addEventListener('resize', calculateItemWidth);

    let isSliding = false;

    function slideNext() {
        if (isSliding || !itemWidth) return;
        isSliding = true;

        // Move left by one card
        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${itemWidth}px)`;

        const onTransitionEnd = () => {
            track.removeEventListener('transitionend', onTransitionEnd);

            // Move first card to the end => infinite loop
            const firstChild = track.firstElementChild;
            if (firstChild) {
                track.appendChild(firstChild);
            }

            // Reset transform without animation
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';

            // Force reflow, then re-enable transition
            void track.offsetWidth;
            track.style.transition = 'transform 0.4s ease';

            isSliding = false;
        };

        track.addEventListener('transitionend', onTransitionEnd);
    }

    // Auto slide every 2.5 seconds
    let autoSlide = setInterval(slideNext, 2500);

    // Pause on hover (optional)
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(slideNext, 2500);
    });
}

displayCategoriesSlider();
