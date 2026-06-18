/**
 * Precision Golf Hub - Offers Renderer
 */

//Render offers to the page
 
function renderOffers(offers, containerId = 'offer_grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (offers.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No offers available at this time.</p>';
        return;
    }

    container.innerHTML = offers.map(offer => {
        const validDate = new Date(offer.validUntil);
        const daysLeft = Math.ceil((validDate - new Date()) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="offer">
                <h3>${offer.title}</h3>
                <span class="category">${offer.category}</span>
                <p>${offer.description}</p>
                <p class="old_price">${offer.oldPrice}</p>
                <p class="new_price">${offer.newPrice}</p>
                <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.5rem;">
                    ${daysLeft > 0 ? `Valid for ${daysLeft} more day${daysLeft !== 1 ? 's' : ''}` : 'Expired'}
                </p>
                <a href="enquiry.html" class="button">Book Now</a>
            </div>
        `;
    }).join('');
}

//Filter offers by category
 
function filterOffersByCategory(category) {
    const filtered = category === 'all' 
        ? getActiveOffers()
        : getOffersByCategory(category);
    
    renderOffers(filtered);
}

//Search offers UI
 
function searchOffersUI(query) {
    if (query.trim() === '') {
        renderOffers(getActiveOffers());
        return;
    }

    const results = searchOffers(query);
    renderOffers(results);
}

// Initialize offers UI
 
function initOffersUI() {
    // Search input
    const searchInput = document.getElementById('offers_search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchOffersUI(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchOffersUI('');
            }
        });
    }

    // Category filter buttons
    const filterButtons = document.querySelectorAll('[data-offer-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('[data-offer-filter]').forEach(b => {
                b.classList.remove('active');
            });
            button.classList.add('active');

            // Filter offers
            const category = button.dataset.offerFilter;
            filterOffersByCategory(category);
        });
    });

    // Initial render
    renderOffers(getActiveOffers());
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOffersUI);
} else {
    // If offers.html
    if (document.getElementById('offer_grid')) {
        initOffersUI();
    }
}
