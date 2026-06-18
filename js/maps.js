/**
 * Precision Golf Hub - Interactive Maps
 * Uses Leaflet.js for interactive mapping
 */

const mapLocations = [
    {
        name: 'Johannesburg',
        address: '14 Fairway Drive, Sandton, Johannesburg, 2196',
        phone: '+27 (0)83 862 6545',
        email: 'info@precisiongolfhub.co.za',
        hours: 'Mon-Fri: 08:00-18:00 | Sat: 08:00-16:00 | Sun: 09:00-13:00',
        lat: -26.1152,
        lng: 27.9649,
        mapId: 'map_johannesburg'
    },
    {
        name: 'Cape Town',
        address: '42 Table Bay Boulevard, Waterfront, Cape Town, 8002',
        phone: '+27 (0)21 555 0200',
        email: 'info@precisiongolfhub.co.za',
        hours: 'Mon-Fri: 08:00-18:00 | Sat: 08:00-16:00 | Sun: 09:00-13:00',
        lat: -33.9023,
        lng: 18.4214,
        mapId: 'map_capetown'
    },
    {
        name: 'Durban',
        address: '123 Marine Parade, Beachfront, Durban, 4001',
        phone: '+27 (0)31 555 0300',
        email: 'info@precisiongolfhub.co.za',
        hours: 'Mon-Fri: 08:00-18:00 | Sat: 08:00-16:00 | Sun: 09:00-13:00',
        lat: -29.8587,
        lng: 31.0218,
        mapId: 'map_durban'
    }
];

//Initialize all maps
function initMaps() {
    mapLocations.forEach(location => {
        initMap(location);
    });
}

// Initialize a single map

function initMap(location) {
    const mapElement = document.getElementById(location.mapId);
    if (!mapElement) return;

    // Create map centered on location
    const map = L.map(location.mapId).setView([location.lat, location.lng], 15);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        zoomControl: true
    }).addTo(map);

    // Add marker
    const marker = L.marker([location.lat, location.lng], {
        icon: L.icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMyIDQwIj48cGF0aCBkPSJNMTYgMEM4IDAgMiA2IDIgMTRjMCA0IDIgOCA1IDE0bDkgMjBsOSAtMjBjMyAtNiA1IC0xMCA1IC0xNEM0MyAzMCA1IDE2IDE2IDB6IiBmaWxsPSIjMWE1YzM0Ii8+PHBhdGggZD0iTTE2IDIwYzMgMCA1IC0yIDUgLTVzLTIgLTUgLTUgLTUgLTUgMiAtNSA1IDIgNSA1IDV6IiBmaWxsPSIjd2hpdGUiLz48L3N2Zz4=',
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40]
        })
    }).addTo(map);

    // Add popup with location details
    const popupContent = `
        <div class="map-popup">
            <h4>${location.name}</h4>
            <p><strong>Address:</strong><br>${location.address}</p>
            <p><strong>Phone:</strong><br><a href="tel:${location.phone.replace(/[\s()-]/g, '')}">${location.phone}</a></p>
            <p><strong>Hours:</strong><br>${location.hours}</p>
        </div>
    `;

    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'map-popup-wrapper'
    });

    // Open popup by default
    marker.openPopup();

    return map;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaps);
} else {
    initMaps();
}
