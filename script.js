document.addEventListener('DOMContentLoaded', function() {
    renderProductOptions();
});

const products = [
    { id: 'LAP-001', name: 'Lenovo IdeaPad Slim 3i Chromebook', category: 'Laptops', price: 399 },
    { id: 'LAP-002', name: 'Lenovo IdeaPad Duet 2-in-1 Chromebook', category: 'Laptops', price: 499 },
    { id: 'LAP-003', name: 'Lenovo IdeaPad Flex 5i 14"', category: 'Laptops', price: 799 },
    { id: 'LAP-004', name: 'Acer 14" Swift 1 Notebook', category: 'Laptops', price: 699 },
    { id: 'LAP-005', name: 'ASUS E410 Notebook', category: 'Laptops', price: 649 },
    { id: 'KEY-001', name: 'Logitech K375s Multi-Device Keyboard', category: 'Keyboards', price: 69.95 },
    { id: 'KEY-002', name: 'J.Burrows Bluetooth Keyboard Silver KB200', category: 'Keyboards', price: 49.95 },
    { id: 'KEY-003', name: 'Logitech Wireless Keyboard K270', category: 'Keyboards', price: 59.95 },
    { id: 'MON-001', name: 'HP 24" FHD Monitor', category: 'Monitors', price: 249 },
    { id: 'MON-002', name: 'Dell 27" UltraSharp Monitor', category: 'Monitors', price: 599 },
    { id: 'MON-003', name: 'Samsung 32" Curved Monitor', category: 'Monitors', price: 399 },
    { id: 'MON-004', name: 'LG 29" UltraWide Monitor', category: 'Monitors', price: 349 },
    { id: 'MON-005', name: 'Acer 23.8" FHD Monitor', category: 'Monitors', price: 199 },
    { id: 'HSET-001', name: 'Logitech H390 USB Headset', category: 'Headsets', price: 79.95 },
    { id: 'HSET-002', name: 'Jabra Evolve 20 SE UC Stereo Headset', category: 'Headsets', price: 99.95 },
    { id: 'HSET-003', name: 'Plantronics Blackwire 3220 USB-A Headset', category: 'Headsets', price: 89.95 },
    { id: 'MOU-001', name: 'Logitech M280 Wireless Mouse', category: 'Mice', price: 39.95 },
    { id: 'MOU-002', name: 'J.Burrows Wireless Mouse Black', category: 'Mice', price: 29.95 },
    { id: 'MOU-003', name: 'Microsoft Bluetooth Mouse', category: 'Mice', price: 49.95 },
    { id: 'PRT-001', name: 'HP LaserJet Pro MFP M428fdw Printer', category: 'Other EUC Devices', price: 699 },
    { id: 'PRT-002', name: 'Canon PIXMA TS5360a All-in-One Home Printer', category: 'Other EUC Devices', price: 149 },
    { id: 'SCN-001', name: 'Brother DS-640 Portable Scanner', category: 'Other EUC Devices', price: 179 },
    { id: 'SCN-002', name: 'Epson Perfection V39 Flatbed Scanner', category: 'Other EUC Devices', price: 149 },
    { id: 'WBC-001', name: 'Logitech C920 HD Pro Webcam', category: 'Other EUC Devices', price: 139 },
    { id: 'SPK-001', name: 'Jabra Speak 510 Portable Bluetooth Speakerphone', category: 'Other EUC Devices', price: 199 },
    { id: 'DOC-001', name: 'Kensington SD4700P Universal USB-C and USB 3.0 Docking Station', category: 'Other EUC Devices', price: 299 },
    { id: 'UPS-001', name: 'APC Back-UPS 700VA 230V with AVR', category: 'Other EUC Devices', price: 229 },
    { id: 'DOC-002', name: 'Microsoft Surface Dock 2', category: 'Other EUC Devices', price: 419 },
    { id: 'NET-001', name: 'TP-Link AC1300 Mini Wireless MU-MIMO USB Adapter', category: 'Other EUC Devices', price: 49.95 }
];

function renderProductOptions() {
    const productSelection = document.getElementById('product-selection');
    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('product-category');

        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const productList = document.createElement('ul');

        products
            .filter(product => product.category === category)
            .forEach(product => {
                const productItem = document.createElement('li');
                const productCheckbox = document.createElement('input');
                productCheckbox.type = 'checkbox';
                productCheckbox.id = product.id;
                productCheckbox.name = 'product';
                productCheckbox.value = product.id;

                const productLabel = document.createElement('label');
                productLabel.htmlFor = product.id;
                productLabel.textContent = product.name;

                productItem.appendChild(productCheckbox);
                productItem.appendChild(productLabel);
                productList.appendChild(productItem);
            });

        categoryDiv.appendChild(productList);
        productSelection.appendChild(categoryDiv);
    });
}

function parseEmailAndFillForm() {
    const emailInput = document.getElementById('email_input').value;
    const productCheckboxes = document.querySelectorAll('input[name="product"]');
    let deviceCount = 0;

    productCheckboxes.forEach(checkbox => {
        const product = products.find(p => p.id === checkbox.value);
        if (product && emailInput.includes(product.name)) {
            checkbox.checked = true;
            deviceCount++;
        } else {
            checkbox.checked = false;
        }
    });

    document.getElementById('device_count').value = deviceCount;
}

function calculateAndDisplay(event) {
    event.preventDefault();
    const baseHours = parseFloat(document.getElementById('base_hours').value) || 0;
    const deviceCount = parseInt(document.getElementById('device_count').value) || 0;
    const additionalProducts = Array.from(document.querySelectorAll('input[name="product"]:checked'))

::contentReference[oaicite:0]{index=0}
 
