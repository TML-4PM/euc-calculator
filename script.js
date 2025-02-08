// Product Data
const products = [
    { name: "Lenovo IdeaPad Slim 3i Chromebook", sku: "LAP-001", price: 399 },
    { name: "Lenovo IdeaPad Duet 2-in-1 Chromebook", sku: "LAP-002", price: 499 },
    { name: "Lenovo IdeaPad Flex 5i 14\"", sku: "LAP-003", price: 799 },
    { name: "Acer 14\" Swift 1 Notebook", sku: "LAP-004", price: 699 },
    { name: "ASUS E410 Notebook", sku: "LAP-005", price: 649 },
    { name: "Logitech K375s Multi-Device Keyboard", sku: "KEY-001", price: 69.95 },
    { name: "J.Burrows Bluetooth Keyboard Silver KB200", sku: "KEY-002", price: 49.95 },
    { name: "Logitech Wireless Keyboard K270", sku: "KEY-003", price: 59.95 },
    { name: "HP 24\" FHD Monitor", sku: "MON-001", price: 249 },
    { name: "Dell 27\" UltraSharp Monitor", sku: "MON-002", price: 599 },
    { name: "Samsung 32\" Curved Monitor", sku: "MON-003", price: 399 },
    { name: "LG 29\" UltraWide Monitor", sku: "MON-004", price: 349 },
    { name: "Acer 23.8\" FHD Monitor", sku: "MON-005", price: 199 },
    { name: "Logitech H390 USB Headset", sku: "HSET-001", price: 79.95 },
    { name: "Jabra Evolve 20 SE UC Stereo Headset", sku: "HSET-002", price: 99.95 },
    { name: "Plantronics Blackwire 3220 USB-A Headset", sku: "HSET-003", price: 89.95 },
    { name: "Logitech M280 Wireless Mouse", sku: "MOU-001", price: 39.95 },
    { name: "J.Burrows Wireless Mouse Black", sku: "MOU-002", price: 29.95 },
    { name: "Microsoft Bluetooth Mouse", sku: "MOU-003", price: 49.95 },
    { name: "HP LaserJet Pro MFP M428fdw Printer", sku: "PRT-001", price: 699 },
    { name: "Canon PIXMA Home TS6360 Printer", sku: "PRT-002", price: 149 },
    { name: "Brother DS-640 Portable Scanner", sku: "SCN-001", price: 179 },
    { name: "Epson Perfection V39 Flatbed Scanner", sku: "SCN-002", price: 149 },
    { name: "Logitech C920 HD Pro Webcam", sku: "WBC-001", price: 139 },
    { name: "Jabra Speak 510 Portable Bluetooth Speakerphone", sku: "SPK-001", price: 199 },
    { name: "Kensington SD4700P Universal USB-C and USB 3.0 Docking Station", sku: "DOC-001", price: 299 },
    { name: "APC Back-UPS 700VA 230V with AVR", sku: "UPS-001", price: 229 },
    { name: "Microsoft Surface Dock 2", sku: "DOC-002", price: 419 },
    { name: "TP-Link AC1300 Mini Wireless MU-MIMO USB Adapter", sku: "NET-001", price: 49.95 },
    { name: "Home Office Starter Pack", sku: "BND-001", price: 1000 },
    { name: "Professional Workstation Bundle", sku: "BND-002", price: 1800 },
    { name: "Creative Designer Suite", sku: "BND-003", price: 1600 },
    { name: "SmartAssist", sku: "SVC-001", price: 19.99 },
    { name: "SmartAssist+", sku: "SVC-002", price: 29.99 }
];

// Load Products into Form
function loadProducts() {
    const container = document.getElementById("product-selection");
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML += `
            <div class="form-check">
                <input class="form-check-input
::contentReference[oaicite:0]{index=0}
 
