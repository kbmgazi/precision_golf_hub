/**
 * Precision Golf Hub - Offers Data
 */

const offersData = [
    {
        id: 'offer_1',
        title: 'Summer Driver Sale',
        category: 'Drivers',
        description: 'All drivers 20% off this week.',
        oldPrice: 'R12999',
        newPrice: 'R10399',
        discount: '20%',
        validUntil: '2026-07-31',
        featured: true
    },
    {
        id: 'offer_2',
        title: 'Iron Set Bundle',
        category: 'Irons',
        description: 'Buy any iron set and get 15% off golf balls.',
        oldPrice: 'R21999',
        newPrice: 'R18699',
        discount: '15%',
        validUntil: '2026-08-15',
        featured: false
    },
    {
        id: 'offer_3',
        title: 'Free Putter with Driver Purchase',
        category: 'Putters',
        description: 'Get a free putter when you purchase any driver.',
        oldPrice: 'R8999',
        newPrice: 'FREE',
        discount: '100%',
        validUntil: '2026-07-20',
        featured: true
    },
    {
        id: 'offer_4',
        title: 'Golf Ball Dozen Pack',
        category: 'Balls',
        description: 'Buy 3 dozen golf balls, get 1 free.',
        oldPrice: 'R1996',
        newPrice: 'R1497',
        discount: '25%',
        validUntil: '2026-08-10',
        featured: false
    },
    {
        id: 'offer_5',
        title: 'Summer Apparel Collection',
        category: 'Apparel',
        description: 'Clearance on all summer golf wear.',
        oldPrice: 'R3200',
        newPrice: 'R2240',
        discount: '30%',
        validUntil: '2026-07-25',
        featured: true
    },
    {
        id: 'offer_6',
        title: 'Cart Bag Premium Package',
        category: 'Accessories',
        description: 'Complete golf bag setup at special price.',
        oldPrice: 'R4999',
        newPrice: 'R3999',
        discount: '20%',
        validUntil: '2026-08-05',
        featured: false
    }
];

// Get all offers
 
function getAllOffers() {
    return offersData;
}

//Get featured offers
function getFeaturedOffers() {
    return offersData.filter(offer => offer.featured);
}

// Get offers by category
 
function getOffersByCategory(category) {
    return offersData.filter(offer => offer.category === category);
}

// Get active offers (not expired)
 
function getActiveOffers() {
    const today = new Date();
    return offersData.filter(offer => new Date(offer.validUntil) > today);
}

// Search offers
 
function searchOffers(query) {
    const term = query.toLowerCase();
    return offersData.filter(offer =>
        offer.title.toLowerCase().includes(term) ||
        offer.description.toLowerCase().includes(term) ||
        offer.category.toLowerCase().includes(term)
    );
}
