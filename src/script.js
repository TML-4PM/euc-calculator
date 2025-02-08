// Parse Email and Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value;

    // Extract device count
    const deviceMatch = emailContent.match(/(\d+)\s+(Laptops?|Desktops?|Tablets?)/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1]) : 5;
    document.getElementById("device_count").value = deviceCount;

    // Extract service type
    const serviceTypePatterns = [
        /Remote Support/i,
        /Onsite\s+Standard/i,
        /Onsite\s+Urgent/i,
        /Multi-Site\s+Deployment/i
    ];
    let serviceType = "Onsite Standard"; // Default fallback
    for (const pattern of serviceTypePatterns) {
        if (pattern.test(emailContent)) {
            serviceType = emailContent.match(pattern)[0].trim();
            break;
        }
    }
    document.getElementById("service_type").value = serviceType;

    showModal("Form filled successfully!", "Confirmation");
}

// Suggest Installation Dates
function suggestDates(event) {
    event.preventDefault(); // Prevent form submission

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
    event.preventDefault(); // Prevent form submission

    const selectedDate = document.getElementById("installation_date").value;
    if (!selectedDate) {
        showModal("Please select an installation date before confirming.", "Error");
        return;
    }
    showModal(`Appointment confirmed for ${selectedDate}`, "Confirmation");
}

// Calculate and Display Quote
function calculateAndDisplay(event) {
    event.preventDefault(); // Prevent form submission

    showLoading();

    const baseHours = parseInt(document.getElementById("base_hours").value || 1);
    const deviceCount = parseInt(document.getElementById("device_count").value || 1);
    const serviceType = document.getElementById("service_type").value;

    const serviceTypeMultipliers = {
        "Remote Support": 0.8,
        "Onsite Standard": 1.0,
        "Onsite Urgent": 1.5,
        "Multi-Site Deployment": 1.3
    };

    const multiplier = serviceTypeMultipliers[serviceType] || 1.0;
    const adjustedHours = Math.round(baseHours * multiplier + (deviceCount * 0.2));
    const totalCost = adjustedHours * 100; // Example rate of $100/hour

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p><strong>Billable Hours:</strong> ${adjustedHours} hours</p>
        <p><strong>Total Cost:</strong> AUD $${totalCost.toFixed(2)}</p>
    `;

    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById("barcode-container").style.display = "block";
    document.getElementById("qrcode-container").style.display = "block";

    hideLoading();
}

// Generate Barcode and QR Code
function generateBarcodeAndQRCode(uniqueId) {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}

// Export Results to CSV
function exportToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + [
        ["Membership Number", "SKU", "Service Type", "Devices", "Total Cost"],
        [
            document.getElementById("membership_number").value,
            document.getElementById("sku").value,
            document.getElementById("service_type").value,
            document.getElementById("device_count").value,
            `AUD $${document.getElementById("results").textContent.split("AUD $")[1]?.trim() || "N/A"}`
        ]
    ].map(row => row.join(",")).join("\n");

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodeURI(csvContent));
    downloadLink.setAttribute("download", "quote.csv");
    downloadLink.click();
}

// Print Quote to PDF
function printToPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.text("EUC Job Pricing Quote", 10, 10);
    doc.text(`Service Type: ${document.getElementById("service_type").value}`, 10, 20);
    doc.text(`Devices: ${document.getElementById("device_count").value}`, 10, 30);
    doc.text(`Total Cost: ${document.getElementById("results").textContent.split("AUD $")[1]?.trim() || "N/A"}`, 10, 40);
    doc.save("quote.pdf");
}

// Show Loading Indicator
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
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
