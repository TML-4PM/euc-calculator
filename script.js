document.addEventListener('DOMContentLoaded', function() {
    renderProductOptions();
});

const products = [
    { id: 'LAP-001', name: 'Lenovo IdeaPad Slim 3i Chromebook', category: 'Laptops', price: 399 },
    { id: 'LAP-002', name: 'Lenovo IdeaPad Duet 2-in-1 Chromebook', category: 'Laptops', price: 499 },
    { id: 'LAP-003', name: 'Lenovo IdeaPad Flex 5i 14"', category: 'Laptops', price: 799 },
    { id: 'LAP-004', name: 'Acer 14" Swift 1 Notebook', category: 'Laptops', price: 699 },
    { id: 'LAP-005', name: 'ASUS E410 Notebook', category: 'Laptops', price: 649 },
    { id: 'LAP-006', name: 'HP ZBook Fury 15 G8 Mobile Workstation', category: 'Laptops', price: 4299 },
    { id: 'MON-001', name: 'HP 24" FHD Monitor', category: 'Monitors', price: 249 },
    { id: 'MON-002', name: 'Dell 27" UltraSharp Monitor', category: 'Monitors', price: 599 },
    { id: 'MON-003', name: 'Samsung 32" Curved Monitor', category: 'Monitors', price: 399 },
    { id: 'MON-004', name: 'LG 29" UltraWide Monitor', category: 'Monitors', price: 349 },
    { id: 'MON-005', name: 'Acer 23.8" FHD Monitor', category: 'Monitors', price: 199 },
    { id: 'MON-006', name: 'BenQ PD3220U 32" 4K Monitor', category: 'Monitors', price: 1199 },
    { id: 'KEY-001', name: 'Logitech K375s Multi-Device Keyboard', category: 'Keyboards', price: 69.95 },
    { id: 'KEY-002', name: 'J.Burrows Bluetooth Keyboard Silver KB200', category: 'Keyboards', price: 49.95 },
    { id: 'KEY-003', name: 'Logitech Wireless Keyboard K270', category: 'Keyboards', price: 59.95 },
    { id: 'KEY-004', name: 'Logitech Craft Advanced Wireless Keyboard', category: 'Keyboards', price: 299 },
    { id: 'MOU-001', name: 'Logitech M280 Wireless Mouse', category: 'Mice', price: 39.95 },
    { id: 'MOU-002', name: 'J.Burrows Wireless Mouse Black', category: 'Mice', price: 29.95 },
    { id: 'MOU-003', name: 'Microsoft Bluetooth Mouse', category: 'Mice', price: 49.95 },
    { id: 'MOU-004', name: 'Logitech MX Master 3 Wireless Mouse', category: 'Mice', price: 149 },
    { id: 'HDD-001', name: 'G-Technology 4TB G-DRIVE USB-C External Hard Drive', category: 'Storage', price: 249 },
    { id: 'HSET-001', name: 'Logitech H390 USB Headset', category: 'Headsets', price: 79.95 },
    { id: 'HSET-002', name: 'Jabra Evolve 20 SE UC Stereo Headset', category: 'Headsets', price: 99.95 },
    { id: 'HSET-003', name: 'Plantronics Blackwire 3220 USB-A Headset', category: 'Headsets', price: 89.95 },
    { id: 'PRT-001', name: 'HP LaserJet Pro MFP M428fdw Printer', category: 'Printers', price: 699 },
    { id: 'PRT-002', name: 'Canon PIXMA TS5360a All-in-One Home Printer', category: 'Printers', price: 149 },
    { id: 'WBC-001', name: 'Logitech C920 HD Pro Webcam', category: 'Webcams', price: 139 }
];

function renderProductOptions() {
    const productSelection = document.getElementById('product-selection');
    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        products
            .filter(product => product.category === category)
            .forEach(product => {
                const label = document.createElement('label');
                label.classList.add('product-label');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = product.id;
                checkbox.classList.add('product-checkbox');

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${product.name}`));
                categoryDiv.appendChild(label);
            });

        productSelection.appendChild(categoryDiv);
    });
}

function parseEmailAndFillForm() {
    const emailInput = document.getElementById('email_input').value;
    const productLines = emailInput.split('\n').filter(line => line.includes('– $'));
    const selectedProductIds = [];

    productLines.forEach(line => {
        const productName = line.split('– $')[0].trim();
        const product = products.find(p => p.name === productName);
        if (product) {
            selectedProductIds.push(product.id);
        }
    });

    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(checkbox => {
        if (selectedProductIds.includes(checkbox.value)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });

    calculateTotalDevices();
}

function calculateTotalDevices() {
    const checkboxes = document.querySelectorAll('.product-checkbox:checked');
    const totalDevices = checkboxes.length;
    document.getElementById('device_count').value = totalDevices;
}

function calculateAndDisplay(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('.product-checkbox:checked');
    let totalPrice = 0;

    checkboxes.forEach(checkbox => {
        const product = products.find(p => p.id === checkbox.value);
        if (product) {
            totalPrice += product.price;
        }
    });

    const results = document.getElementById('results');
    results.innerHTML = `<strong>Total Price:</strong> $${totalPrice.toFixed(2)}`;
}

function
::contentReference[oaicite:0]{index=0}
 
