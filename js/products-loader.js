/**
 * Precision Golf Hub - Products Renderer
 * Renders products dynamically with search and filter capabilities
 */


function renderProducts(products, containerId = 'product_grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}" 
                 class="lightbox-trigger" 
                 data-lightbox="${product.image}" 
                 data-caption="${product.brand} ${product.name}"
                 loading="lazy">
            <p class="brand">${product.brand}</p>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <a href="enquiry.html" class="button">Enquire</a>
        </div>
    `).join('');

    // Re-initialize lightbox for newly rendered images
    if (window.initLightbox) {
        initLightbox();
    }
}

// Filter products by category
 
function filterByCategory(category) {
    const filtered = category === 'all' 
        ? getAllProducts()
        : getProductsByCategory(category);
    
    renderProducts(filtered);
}

//Search products
 
function searchProductsUI(query) {
    if (query.trim() === '') {
        renderProducts(getAllProducts());
        return;
    }

    const results = searchProducts(query);
    renderProducts(results);
    
    // Display search results count
    const resultCount = document.getElementById('search_result_count');
    if (resultCount) {
        resultCount.textContent = results.length === 1 
            ? '1 product found' 
            : `${results.length} products found`;
    }
}

// Initialize product search and filter UI
 
function initProductsUI() {
    // Search input
    const searchInput = document.getElementById('product_search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProductsUI(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchProductsUI('');
            }
        });
    }

    // Category filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('[data-filter]').forEach(b => {
                b.classList.remove('active');
            });
            button.classList.add('active');

            // Filter products
            const category = button.dataset.filter;
            filterByCategory(category);
        });
    });

    // Initial render
    renderProducts(getAllProducts());
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsUI);
} else {
    // If products.html
    if (document.getElementById('product_grid')) {
        initProductsUI();
    }
}
