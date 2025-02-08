// Parse Email and Auto-Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value.trim();
    if (!emailContent) {
        showModal("Please paste an email request first.", "Error");
        return;
    }

    // Extract device count dynamically
    const deviceMatch = emailContent.match(/(\d+)\s*(laptops?|desktops?|tablets?|devices?)/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1], 10) : 5; // Default to 5
    document.getElementById("device_count").value = deviceCount;

    // Extract service type using a mapping object
    const serviceTypeMap = {
        "Remote Support": /remote support/i,
        "Onsite Standard": /onsite\s+(standard|basic)/i,
        "Onsite Urgent": /onsite\s+(urgent|priority|emergency)/i,
        "Multi-Site Deployment": /multi-site\s+(deployment|installation)/i
    };
    
    let selectedService = "Onsite Standard"; // Default fallback
    Object.keys(serviceTypeMap).forEach(type => {
        if (serviceTypeMap[type].test(emailContent)) {
            selectedService = type;
        }
    });

    document.getElementById("service_type").value = selectedService;
    showModal("Form filled successfully!", "Success");
}

// Suggest Available Installation Dates
function suggestDates(event) {
    event.preventDefault();
    showLoading();

    const today = new Date();
    let suggestedDates = [];
    
    for (let i = 1; i <= 3; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        suggestedDates.push(futureDate.toISOString().split("T")[0]);
    }

    hideLoading();
    showModal(`Suggested Dates:\n${suggestedDates.join("\n")}`, "Suggested Dates");
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

// Calculate and Display Quote
function calculateAndDisplay(event) {
    event.preventDefault();
    showLoading();

    const baseHours = parseFloat(document.getElementById("base_hours").value || 1);
    const deviceCount = parseInt(document.getElementById("device_count").value || 1, 10);
    const serviceType = document.getElementById("service_type").value;

    const serviceMultipliers = {
        "Remote Support": 0.8,
        "Onsite Standard": 1.0,
        "Onsite Urgent": 1.5,
        "Multi-Site Deployment": 1.3
    };

    const multiplier = serviceMultipliers[serviceType] || 1.0;
    const adjustedHours = (baseHours * multiplier + deviceCount * 0.2).toFixed(1);
    const totalCost = (adjustedHours * 100).toFixed(2);

    document.getElementById("results").innerHTML = `
        <p><strong>Billable Hours:</strong> ${adjustedHours} hours</p>
        <p><strong>Total Cost:</strong> AUD $${totalCost}</p>
    `;

    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById("barcode-container").style.display = "block";
    document.getElementById("qrcode-container").style.display = "block";

    hideLoading();
}

// Generate Barcode and QR Code
function generateBarcodeAndQRCode(uniqueId) {
    document.getElementById("qrcode").innerHTML = ""; // Reset QR code container
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}

// Export Results to CSV
function exportToCSV() {
    showLoading();

    const csvRows = [
        ["Membership Number", "SKU", "Service Type", "Devices", "Total Cost"],
        [
            document.getElementById("membership_number").value || "N/A",
            document.getElementById("sku").value || "N/A",
            document.getElementById("service_type").value,
            document.getElementById("device_count").value,
            `AUD $${document.getElementById("results").textContent.split("AUD $")[1]?.trim() || "N/A"}`
        ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(row => 
        row.map(value => `"${value.replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodeURI(csvContent));
    downloadLink.setAttribute("download", "quote.csv");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    hideLoading();
}

// Print Quote to PDF
function printToPDF() {
    showLoading();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("EUC Job Pricing Quote", 10, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Service Type: ${document.getElementById("service_type").value}`, 10, 30);
    doc.text(`Devices: ${document.getElementById("device_count").value}`, 10, 40);
    doc.text(`Total Cost: AUD $${document.getElementById("results").textContent.split("AUD $")[1]?.trim() || "N/A"}`, 10, 50);

    doc.save("quote.pdf");
    hideLoading();
}

// Show Loading Indicator
function showLoading() {
    document.getElementById("loading").style.display = "block";
    disableButtons(true);
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
    disableButtons(false);
}

// Disable/Enable Buttons during processing
function disableButtons(disable) {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = disable;
    });
}

// Modal Functionality
function showModal(message, title = "Confirmation") {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("confirmation-message").textContent = message;
    document.getElementById("confirmation-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmation-modal").style.display = "none";
}
