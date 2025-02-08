// Product List (can be moved to an external JSON file for easier updates)
const productList = [
    { id: "LAP-001", name: "Lenovo IdeaPad Slim 3i Chromebook", category: "Laptops" },
    { id: "LAP-002", name: "Lenovo IdeaPad Duet 2-in-1 Chromebook", category: "Laptops" },
    { id: "LAP-003", name: "Lenovo IdeaPad Flex 5i 14\"", category: "Laptops" },
    { id: "LAP-004", name: "Acer 14\" Swift 1 Notebook", category: "Laptops" },
    { id: "LAP-005", name: "ASUS E410 Notebook", category: "Laptops" },
    { id: "KEY-001", name: "Logitech K375s Multi-Device Keyboard", category: "Keyboards" },
    { id: "KEY-002", name: "J.Burrows Bluetooth Keyboard Silver KB200", category: "Keyboards" },
    { id: "KEY-003", name: "Logitech Wireless Keyboard K270", category: "Keyboards" },
    { id: "MON-001", name: "HP 24\" FHD Monitor", category: "Monitors" },
    { id: "MON-002", name: "Dell 27\" UltraSharp Monitor", category: "Monitors" },
    { id: "MON-003", name: "Samsung 32\" Curved Monitor", category: "Monitors" },
    { id: "MON-004", name: "LG 29\" UltraWide Monitor", category: "Monitors" },
    { id: "MON-005", name: "Acer 23.8\" FHD Monitor", category: "Monitors" },
    { id: "HSET-001", name: "Logitech H390 USB Headset", category: "Headsets" },
    { id: "HSET-002", name: "Jabra Evolve 20 SE UC Stereo Headset", category: "Headsets" },
    { id: "HSET-003", name: "Plantronics Blackwire 3220 USB-A Headset", category: "Headsets" },
    { id: "MOU-001", name: "Logitech M280 Wireless Mouse", category: "Mice" },
    { id: "MOU-002", name: "J.Burrows Wireless Mouse Black", category: "Mice" },
    { id: "MOU-003", name: "Microsoft Bluetooth Mouse", category: "Mice" },
    { id: "PRT-001", name: "HP LaserJet Pro MFP M428fdw Printer", category: "Other EUC Devices" },
    { id: "PRT-002", name: "Canon PIXMA TS5360a All-in-One Home Printer", category: "Other EUC Devices" },
    { id: "SCN-001", name: "Brother DS-640 Portable Scanner", category: "Other EUC Devices" },
    { id: "SCN-002", name: "Epson Perfection V39 Flatbed Scanner", category: "Other EUC Devices" },
    { id: "WBC-001", name: "Logitech C920 HD Pro Webcam", category: "Other EUC Devices" },
    { id: "SPK-001", name: "Jabra Speak 510 Portable Bluetooth Speakerphone", category: "Other EUC Devices" },
    { id: "DOC-001", name: "Kensington SD4700P Universal USB-C and USB 3.0 Docking Station", category: "Other EUC Devices" },
    { id: "UPS-001", name: "APC Back-UPS 700VA 230V with AVR", category: "Other EUC Devices" },
    { id: "DOC-002", name: "Microsoft Surface Dock 2", category: "Other EUC Devices" },
    { id: "NET-001", name: "TP-Link AC1300 Mini Wireless MU-MIMO USB Adapter", category: "Other EUC Devices" }
];

// Generate Product List Dynamically
function generateProductList() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = ""; // Clear previous products

    productList.forEach(product => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = product.id;
        checkbox.value = product.name;

        const label = document.createElement("label");
        label.htmlFor = product.id;
        label.textContent = `${product.name} (${product.category})`;

        const div = document.createElement("div");
        div.appendChild(checkbox);
        div.appendChild(label);

        productContainer.appendChild(div);
    });
}

// Parse Email and Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value;
    let deviceCount = 0;

    productList.forEach(product => {
        const match = emailContent.match(new RegExp(`(\\d+)\\s+${product.name.replace(/["'\\s]/g, "\\s*")}`, "i"));
        if (match) {
            const count = parseInt(match[1]);
            document.getElementById(product.id).checked = true;
            deviceCount += count;
        }
    });

    document.getElementById("device_count").value = deviceCount || 1; // Default to 1 if no devices found
    showModal("Form filled successfully!", "Confirmation");
}

// Calculate and Display Quote
function calculateAndDisplay(event) {
    event.preventDefault();

    const selectedProducts = productList.filter(product => document.getElementById(product.id).checked);
    const baseHours = parseInt(document.getElementById("device_count").value || 1);
    const serviceType = document.getElementById("service_type").value;
    const urgencyLevel = document.getElementById("urgency_level").value;
    const afterHours = document.getElementById("after_hours").value === "Yes";

    const serviceTypeMultipliers = {
        "Remote Support": 0.8,
        "Onsite Standard": 1.0,
        "Onsite Urgent": 1.5,
        "Multi-Site Deployment": 1.3
    };

    const urgencyMultipliers = {
        "Standard": 1.0,
        "Urgent": 1.2,
        "Emergency": 1.5
    };

    const multiplier = (serviceTypeMultipliers[serviceType] || 1.0) * (urgencyMultipliers[urgencyLevel] || 1.0);
    const adjustedHours = Math.round(baseHours * multiplier + (selectedProducts.length * 0.5));
    const totalCost = adjustedHours * 100 + (afterHours ? 200 : 0); // Add after-hours surcharge

    document.getElementById("total-hours").textContent = adjustedHours;
    document.getElementById("total-cost").textContent = totalCost.toFixed(2);

    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById("results").style.display = "block";

    showModal(`Total Cost: AUD $${totalCost.toFixed(2)}`, "Quote Generated");
}

// Generate Barcode and QR Code
function generateBarcodeAndQRCode(uniqueId) {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}

// Suggest Installation Dates
function suggestDates(event) {
    event.preventDefault();

    const today = new Date();
    const options = [];
    for (let i = 1; i <= 3; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        options.push(futureDate.toISOString().split("T")[0]);
    }

    showModal(`Suggested Dates:\n${options.join("\n")}`, "Suggested Dates");
}

// Confirm Appointment
function confirmAppointment(event) {
    event.preventDefault();

    const selectedDate = document.getElementById("installation_date").value;
    if (!selectedDate) {
        showModal("Please select an installation date before confirming.", "Error");
        return;
    }

    showModal(`Appointment confirmed for ${selectedDate}`, "Confirmation");
}

// Export to CSV
function exportToCSV() {
    const selectedProducts = productList
        .filter(product => document.getElementById(product.id).checked)
        .map(product => product.name);

    const csvContent = "data:text/csv;charset=utf-8," + [
        ["Membership Number", "Installation Date", "Devices", "Service Type", "Urgency Level", "After-Hours", "Total Cost"],
        [
            document.getElementById("membership_number").value,
            document.getElementById("installation_date").value,
            selectedProducts.join(", "),
            document.getElementById("service_type").value,
            document.getElementById("urgency_level").value,
            document.getElementById("after_hours").value,
            `AUD $${document.getElementById("total-cost").textContent}`
        ]
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

    const selectedProducts = productList
        .filter(product => document.getElementById(product.id).checked)
        .map(product => product.name);

    let y = 20;
    doc.setFontSize(12);
    doc.text(`Membership Number: ${document.getElementById("membership_number").value}`, 10, y += 10);
    doc.text(`Installation Date: ${document.getElementById("installation_date").value}`, 10, y += 10);
    doc.text(`Devices: ${selectedProducts.join(", ")}`, 10, y += 10);
    doc.text(`Service Type: ${document.getElementById("service_type").value}`, 10, y += 10);
    doc.text(`Urgency Level: ${document.getElementById("urgency_level").value}`, 10, y += 10);
    doc.text(`After-Hours: ${document.getElementById("after_hours").value}`, 10, y += 10);
    doc.text(`Total Cost: AUD $${document.getElementById("total-cost").textContent}`, 10, y += 10);

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
function sendEmailConfirmation() {
    const recipient = "troy.latter@unisys.com";
    const subject = "New EUC Job Appointment Confirmation";
    const body = `
        Membership Number: ${document.getElementById("membership_number").value}\n
        Installation Date: ${document.getElementById("installation_date").value}\n
        Service Type: ${document.getElementById("service_type").value}\n
        Total Cost: AUD $${document.getElementById("total-cost").textContent}
    `;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Modal Functionality
function showModal(message, title = "Confirmation") {
    const modalTitle = document.createElement("h3");
    modalTitle.id = "modal-title";
    modalTitle.textContent = title;

    const modalMessage = document.createElement("p");
    modalMessage.id = "confirmation-message";
    modalMessage.textContent = message;

    const modalCloseButton = document.createElement("button");
    modalCloseButton.onclick = closeModal;
    modalCloseButton.textContent = "Close";

    const modalDiv = document.getElementById("confirmation-modal");
    modalDiv.innerHTML = "";
    modalDiv.appendChild(modalTitle);
    modalDiv.appendChild(modalMessage);
    modalDiv.appendChild(modalCloseButton);
    modalDiv.style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmation-modal").style.display = "none";
}

// Initialize Product List
window.onload = generateProductList;
