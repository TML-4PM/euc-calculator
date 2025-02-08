// Product List (can be moved to an external JSON file for easier updates)
const productList = [
    { id: "LAP-001", name: "Lenovo IdeaPad Slim 3i Chromebook", category: "Laptops", price: 399 },
    { id: "LAP-002", name: "Lenovo IdeaPad Duet 2-in-1 Chromebook", category: "Laptops", price: 499 },
    { id: "LAP-003", name: "Lenovo IdeaPad Flex 5i 14\"", category: "Laptops", price: 799 },
    { id: "LAP-004", name: "Acer 14\" Swift 1 Notebook", category: "Laptops", price: 699 },
    { id: "LAP-005", name: "ASUS E410 Notebook", category: "Laptops", price: 649 },
    { id: "KEY-001", name: "Logitech K375s Multi-Device Keyboard", category: "Keyboards", price: 69.95 },
    { id: "KEY-002", name: "J.Burrows Bluetooth Keyboard Silver KB200", category: "Keyboards", price: 49.95 },
    { id: "KEY-003", name: "Logitech Wireless Keyboard K270", category: "Keyboards", price: 59.95 },
    { id: "MON-001", name: "HP 24\" FHD Monitor", category: "Monitors", price: 249 },
    { id: "MON-002", name: "Dell 27\" UltraSharp Monitor", category: "Monitors", price: 599 },
    { id: "MON-003", name: "Samsung 32\" Curved Monitor", category: "Monitors", price: 399 },
    { id: "MON-004", name: "LG 29\" UltraWide Monitor", category: "Monitors", price: 349 },
    { id: "MON-005", name: "Acer 23.8\" FHD Monitor", category: "Monitors", price: 199 },
    { id: "HSET-001", name: "Logitech H390 USB Headset", category: "Headsets", price: 79.95 },
    { id: "HSET-002", name: "Jabra Evolve 20 SE UC Stereo Headset", category: "Headsets", price: 99.95 },
    { id: "HSET-003", name: "Plantronics Blackwire 3220 USB-A Headset", category: "Headsets", price: 89.95 },
    { id: "MOU-001", name: "Logitech M280 Wireless Mouse", category: "Mice", price: 39.95 },
    { id: "MOU-002", name: "J.Burrows Wireless Mouse Black", category: "Mice", price: 29.95 },
    { id: "MOU-003", name: "Microsoft Bluetooth Mouse", category: "Mice", price: 49.95 },
    { id: "PRT-001", name: "HP LaserJet Pro MFP M428fdw Printer", category: "Other EUC Devices", price: 699 },
    { id: "PRT-002", name: "Canon PIXMA TS5360a All-in-One Home Printer", category: "Other EUC Devices", price: 149 },
    { id: "SCN-001", name: "Brother DS-640 Portable Scanner", category: "Other EUC Devices", price: 179 },
    { id: "SCN-002", name: "Epson Perfection V39 Flatbed Scanner", category: "Other EUC Devices", price: 149 },
    { id: "WBC-001", name: "Logitech C920 HD Pro Webcam", category: "Other EUC Devices", price: 139 },
    { id: "SPK-001", name: "Jabra Speak 510 Portable Bluetooth Speakerphone", category: "Other EUC Devices", price: 199 },
    { id: "DOC-001", name: "Kensington SD4700P Universal USB-C and USB 3.0 Docking Station", category: "Other EUC Devices", price: 299 },
    { id: "UPS-001", name: "APC Back-UPS 700VA 230V with AVR", category: "Other EUC Devices", price: 229 },
    { id: "DOC-002", name: "Microsoft Surface Dock 2", category: "Other EUC Devices", price: 419 },
    { id: "NET-001", name: "TP-Link AC1300 Mini Wireless MU-MIMO USB Adapter", category: "Other EUC Devices", price: 49.95 }
];

// Generate Product Categories Dynamically
function generateProductCategories() {
    const productCategoriesDiv = document.getElementById("product-categories");
    productCategoriesDiv.innerHTML = "";

    const categories = [...new Set(productList.map(product => product.category))];
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";

        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);

        const categoryList = productList.filter(product => product.category === category);
        categoryList.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = product.id;

            const label = document.createElement("label");
            label.htmlFor = product.id;
            label.textContent = `${product.name}`;

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = 0;
            quantityInput.value = 0;
            quantityInput.dataset.productId = product.id;

            productDiv.appendChild(checkbox);
            productDiv.appendChild(label);
            productDiv.appendChild(quantityInput);
            categoryDiv.appendChild(productDiv);
        });

        productCategoriesDiv.appendChild(categoryDiv);
    });
}

// Parse Email and Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value;

    // Extract customer details
    const customerNameMatch = emailContent.match(/Customer Name:\s*([^\n]+)/i);
    const companyNameMatch = emailContent.match(/Company:\s*([^\n]+)/i);

    document.getElementById("customer_name").value = customerNameMatch ? customerNameMatch[1].trim() : "";
    document.getElementById("company_name").value = companyNameMatch ? companyNameMatch[1].trim() : "";

    // Reset quantities
    productList.forEach(product => {
        document.querySelector(`input[data-product-id="${product.id}"]`)?.value = 0;
    });

    let unknownProducts = [];
    productList.forEach(product => {
        const match = emailContent.match(new RegExp(`${product.name}\\s*(\\d+)`, "i"));
        if (match) {
            const quantity = parseInt(match[1]);
            if (!isNaN(quantity)) {
                document.getElementById(product.id)?.checked = true;
                document.querySelector(`input[data-product-id="${product.id}"]`)?.value = quantity;
            }
        } else {
            const unknownMatch = emailContent.match(new RegExp(`${product.name}`, "i"));
            if (unknownMatch) {
                unknownProducts.push(`${product.name}`);
            }
        }
    });

    // Add unknown products to notes
    if (unknownProducts.length > 0) {
        const additionalNotes = document.getElementById("additional_notes");
        additionalNotes.value += `\n\nUnknown Products Requested:\n${unknownProducts.join("\n")}`;
    }

    showModal("Form filled successfully!", "Confirmation");
}

// Calculate and Display Quote
function calculateAndDisplay(event) {
    event.preventDefault();

    const selectedProducts = productList
        .filter(product => document.getElementById(product.id)?.checked)
        .map(product => {
            const quantity = parseInt(document.querySelector(`input[data-product-id="${product.id}"]`).value || 0);
            return { ...product, quantity };
        })
        .filter(product => product.quantity > 0);

    const baseHours = selectedProducts.length * 1; // Base hours per product
    const urgencyLevel = document.getElementById("urgency_level").value;
    const afterHours = document.getElementById("after_hours").value === "Yes";
    const urgencyMultipliers = { Standard: 1.0, Urgent: 1.2, Emergency: 1.5 };
    const adjustedHours = Math.round(baseHours * urgencyMultipliers[urgencyLevel] + (afterHours ? 2 : 0));
    const totalCost = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0) + adjustedHours * 100;

    document.getElementById("total-hours").textContent = adjustedHours;
    document.getElementById("total-cost").textContent = totalCost.toFixed(2);

    // Update Results Table
    const quoteTableBody = document.getElementById("quote-table-body");
    quoteTableBody.innerHTML = "";
    selectedProducts.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
        `;
        quoteTableBody.appendChild(row);
    });

    // Generate Barcode and QR Code
    generateBarcode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    generateQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById("results").style.display = "block";
}

// Generate Barcode
function generateBarcode(uniqueId) {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
}

// Generate QR Code
function generateQRCode(uniqueId) {
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Clear previous QR code
    new QRCode(qrcodeContainer, {
        text: uniqueId,
        width: 128,
        height: 128
    });
}

// Suggest Installation Dates
function suggestDates(event) {
    event.preventDefault();

    const today = new Date();
    const randomDate = () => {
        const date = new Date(today.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000); // Random date within 10 days
        return date.toISOString().split("T")[0];
    };

    const suggestedDate = randomDate();
    const suggestedTime = ["9:00 AM", "1:00 PM", "3:00 PM"][Math.floor(Math.random() * 3)]; // Random time

    document.getElementById("installation_date").value = suggestedDate;
    showModal(`Suggested Date & Time: ${suggestedDate} at ${suggestedTime}`, "Suggested Dates");
}

// Confirm Appointment and Send Email
function confirmAppointment(event) {
    event.preventDefault();

    const customerName = document.getElementById("customer_name").value.trim();
    const companyName = document.getElementById("company_name").value.trim();
    const installationDate = document.getElementById("installation_date").value.trim();
    const totalCost = parseFloat(document.getElementById("total-cost").textContent.replace("USD $", ""));

    if (!installationDate) {
        showModal("Please select an installation date before confirming.", "Error");
        return;
    }

    const emailSubject = "New EUC Job Appointment Confirmation";
    const emailBody = `
        Customer Name: ${customerName}\n
        Company Name: ${companyName}\n
        Installation Date: ${installationDate}\n
        Total Cost: USD $${totalCost.toFixed(2)}\n
    `;

    sendEmail("troy.latter@unisys.com", emailSubject, emailBody);
    showModal("Appointment confirmed and email sent!", "Confirmation");
}

// Export to CSV
function exportToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + [
        ["Customer Name", "Company Name", "Installation Date", "Product", "Category", "Quantity", "Price", "Total"],
        ...productList
            .filter(product => document.getElementById(product.id)?.checked)
            .map(product => [
                document.getElementById("customer_name").value,
                document.getElementById("company_name").value,
                document.getElementById("installation_date").value,
                product.name,
                product.category,
                document.querySelector(`input[data-product-id="${product.id}"]`).value,
                `$${product.price.toFixed(2)}`,
                `$${(product.price * document.querySelector(`input[data-product-id="${product.id}"]`).value).toFixed(2)}`
            ])
    ].map(row => row.join(",")).join("\n");

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodeURI(csvContent));
    downloadLink.setAttribute("download", "quote.csv");
    downloadLink.click();
}

// Print to PDF
function printToPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("EUC Job Pricing Quote", 10, 10);

    const customerName = document.getElementById("customer_name").value.trim();
    const companyName = document.getElementById("company_name").value.trim();
    const installationDate = document.getElementById("installation_date").value.trim();
    const totalCost = parseFloat(document.getElementById("total-cost").textContent.replace("USD $", ""));

    let y = 20;
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customerName}`, 10, y += 10);
    doc.text(`Company Name: ${companyName}`, 10, y += 10);
    doc.text(`Installation Date: ${installationDate}`, 10, y += 10);

    productList
        .filter(product => document.getElementById(product.id)?.checked)
        .forEach(product => {
            const quantity = document.querySelector(`input[data-product-id="${product.id}"]`).value;
            doc.text(`${product.name} (${product.category}) - Quantity: ${quantity}, Price: $${product.price.toFixed(2)}, Total: $${(product.price * quantity).toFixed(2)}`, 10, y += 10);
        });

    doc.text(`Total Cost: USD $${totalCost.toFixed(2)}`, 10, y += 10);

    // Add Logos
    const logos = [
        { src: "assets/officeworks-logo.png", x: 10, y: 160, width: 50, height: 20 },
        { src: "assets/geeks2u-logo.png", x: 70, y: 160, width: 50, height: 20 }
    ];

    logos.forEach(logo => {
        const imgData = new Image();
        imgData.src = logo.src;
        imgData.onload = () => doc.addImage(imgData, "PNG", logo.x, logo.y, logo.width, logo.height);
    });

    doc.save("quote.pdf");
}

// Send Email Confirmation
function sendEmail(to, subject, body) {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Show Modal
function showModal(message, title) {
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    const modalDiv = document.getElementById("confirmation-modal");

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalDiv.style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("confirmation-modal").style.display = "none";
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    generateProductCategories();
});
