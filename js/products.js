/**
 * Precision Golf Hub - Product Data
 */

const productsData = [
    // Drivers
    {
        id: 'driver_1',
        category: 'drivers',
        brand: 'TaylorMade',
        name: 'Stealth 2 Plus',
        description: 'Available in 9, 10.5 and 12 degrees.',
        price: 'R12999',
        image: 'images/Stealth 2 Plus.png'
    },
    {
        id: 'driver_2',
        category: 'drivers',
        brand: 'PING',
        name: 'G430 Max',
        description: 'Available in 9, 10.5 and 12 degrees.',
        price: 'R7899',
        image: 'images/G430 Max.png'
    },
    {
        id: 'driver_3',
        category: 'drivers',
        brand: 'Titleist',
        name: 'TSR3 Driver',
        description: 'Available in 9, 10.5 and 12 degrees.',
        price: 'R9799',
        image: 'images/TSR3 Driver.png'
    },

    // Irons
    {
        id: 'iron_1',
        category: 'irons',
        brand: 'Callaway',
        name: 'Apex Iron set (5-PW)',
        description: 'Editor\'s pick for 2024',
        price: 'R18999',
        image: 'images/Apex Iron Set.png'
    },
    {
        id: 'iron_2',
        category: 'irons',
        brand: 'Mizuno',
        name: 'JPX 925 Forged (4-PW)',
        description: 'Premium forged irons',
        price: 'R22500',
        image: 'images/JPX 925 Forged.png'
    },
    {
        id: 'iron_3',
        category: 'irons',
        brand: 'TaylorMade',
        name: 'P790 Irons (4-PW)',
        description: 'On sale this month.',
        price: 'R21999',
        image: 'images/P790 Irons.png'
    },

    // Putters
    {
        id: 'putter_1',
        category: 'putters',
        brand: 'Scotty Cameron',
        name: 'Phantom X12',
        description: 'Premium milled putter',
        price: 'R8999',
        image: 'images/Phantom X12.png'
    },
    {
        id: 'putter_2',
        category: 'putters',
        brand: 'TaylorMade',
        name: 'Spider Tour',
        description: 'High MOI design',
        price: 'R6499',
        image: 'images/Spider Tour.png'
    },
    {
        id: 'putter_3',
        category: 'putters',
        brand: 'Odyssey',
        name: 'Exo Stroke Lab',
        description: 'Lightweight and stable',
        price: 'R5999',
        image: 'images/Exo Stroke Lab.png'
    },

    // Golf Balls
    {
        id: 'ball_1',
        category: 'balls',
        brand: 'Titleist',
        name: 'Pro V1',
        description: 'Dozen (12 balls)',
        price: 'R499',
        image: 'images/Pro V1.png'
    },
    {
        id: 'ball_2',
        category: 'balls',
        brand: 'TaylorMade',
        name: 'TP5',
        description: 'Dozen (12 balls)',
        price: 'R449',
        image: 'images/TP5.png'
    },
    {
        id: 'ball_3',
        category: 'balls',
        brand: 'Callaway',
        name: 'Chrome Soft',
        description: 'Dozen (12 balls)',
        price: 'R399',
        image: 'images/Chrome Soft.png'
    },

    // Apparel
    {
        id: 'apparel_1',
        category: 'apparel',
        brand: 'Nike',
        name: 'Golf Polo Shirt',
        description: 'Dri-FIT technology',
        price: 'R599',
        image: 'images/Golf Polo Shirt.png'
    },
    {
        id: 'apparel_2',
        category: 'apparel',
        brand: 'Adidas',
        name: 'Golf Hat',
        description: 'Adjustable cap',
        price: 'R299',
        image: 'images/Golf Hat.png'
    },
    {
        id: 'apparel_3',
        category: 'apparel',
        brand: 'Puma',
        name: 'Golf Shorts',
        description: 'Water-resistant',
        price: 'R799',
        image: 'images/Golf Shorts.png'
    },

    // Accessories
    {
        id: 'accessory_1',
        category: 'accessories',
        brand: 'Ping',
        name: 'Tour Lite Cart Bag',
        description: '14-way divider',
        price: 'R2999',
        image: 'images/Tour Lite Cart Bag.png'
    },
    {
        id: 'accessory_2',
        category: 'accessories',
        brand: 'TaylorMade',
        name: 'Golf Rangefinder',
        description: '1000m range',
        price: 'R3499',
        image: 'images/Golf Rangefinder.png'
    },
    {
        id: 'accessory_3',
        category: 'accessories',
        brand: 'Titleist',
        name: 'Golf Glove',
        description: 'Premium leather',
        price: 'R199',
        image: 'images/Golf Glove.png'
    }
];

//Get all products
 
function getAllProducts() {
    return productsData;
}

// Get products by category
function getProductsByCategory(category) {
    return productsData.filter(p => p.category === category);
}

// Search products by name or brand
 
function searchProducts(query) {
    const term = query.toLowerCase();
    return productsData.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
}

// Get product by ID
 
function getProductById(id) {
    return productsData.find(p => p.id === id);
}
