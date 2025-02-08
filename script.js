// Parse Email and Auto-Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value.trim();
    if (!emailContent) {
        showModal("Please paste an email request first.", "Error");
        return;
    }

    const deviceMatch = emailContent.match(/(\d+)\s*(laptops?|desktops?|tablets?|devices?)/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1], 10) : 0;
    document.getElementById("device_count").value = deviceCount;

    const serviceTypeMap = {
        "Remote Support": /remote support/i,
        "Onsite Standard": /onsite\s+(standard|basic)/i,
        "Onsite Urgent": /onsite\s+(urgent|priority|emergency)/i,
        "Multi-Site Deployment": /multi-site\s+(deployment|installation)/i
    };
    
    let selectedService = "Onsite Standard";
    Object.keys(serviceTypeMap).forEach(type => {
        if (serviceTypeMap[type].test(emailContent)) {
            selectedService = type;
        }
    });
    document.getElementById("service_type").value = selectedService;
    showModal("Form filled successfully!", "Success");
}

// Calculate and Display Quote
function calculateAndDisplay(event) {
    event.preventDefault();

    const baseHours = parseFloat(document.getElementById("base_hours").value || 1);
    const deviceCount = parseInt(document.getElementById("device_count").value || 0, 10);
    const serviceType = document.getElementById("service_type").value;
    
    const serviceTypeMultipliers = {
        "Remote Support": 0.8,
        "Onsite Standard": 1.0,
        "Onsite Urgent": 1.5,
        "Multi-Site Deployment": 1.3
    };

    let multiplier = serviceTypeMultipliers[serviceType] || 1.0;
    let adjustedHours = (baseHours * multiplier + deviceCount * 0.2).toFixed(1);
    
    let totalCost = adjustedHours * 100;
    
    // Add costs for selected products
    let selectedProducts = [];
    document.querySelectorAll(".product:checked").forEach(item => {
        totalCost += parseFloat(item.value);
        selectedProducts.push(item.getAttribute("data-name") + " ($" + item.value + ")");
    });

    document.getElementById("results").innerHTML = `
        <h4>Total Cost: AUD $${totalCost.toFixed(2)}</h4>
        <p><strong>Billable Hours:</strong> ${adjustedHours} hours</p>
        <p><strong>Selected Products:</strong> ${selectedProducts.join(", ") || "None"}</p>
    `;
    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
}

// Confirm Appointment & Send Email
function confirmAppointment(event) {
    event.preventDefault();
    const email = document.getElementById("email_input").value.trim() || "troy.latter@unisys.com";
    const selectedDate = document.getElementById("installation_date").value;
    if (!selectedDate) {
        showModal("Please select an installation date before confirming.", "Error");
        return;
    }

    const emailBody = `Your appointment is confirmed for ${selectedDate}.\n\nQuote details:\n${document.getElementById("results").innerText}`;
    window.location.href = `mailto:${email}?subject=Appointment Confirmation&body=${encodeURIComponent(emailBody)}`;
}

// Generate Barcode and QR Code
function generateBarcodeAndQRCode(uniqueId) {
    document.getElementById("qrcode").innerHTML = ""; // Reset QR code container
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}

// Print Quote to PDF
function printToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("EUC Job Pricing Quote", 10, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Officeworks Membership: ${document.getElementById("membership_number").value}`, 10, 30);
    doc.text(`Service Type: ${document.getElementById("service_type").value}`, 10, 40);
    doc.text(`Devices: ${document.getElementById("device_count").value}`, 10, 50);
    doc.text(`Total Cost: AUD $${document.getElementById("results").textContent.split("AUD $")[1]?.trim() || "N/A"}`, 10, 60);
    
    let selectedProducts = [];
    document.querySelectorAll(".product:checked").forEach(item => {
        selectedProducts.push(item.getAttribute("data-name") + " ($" + item.value + ")");
    });
    doc.text(`Selected Products: ${selectedProducts.join(", ") || "None"}`, 10, 70);
    
    doc.text("ABN: 123-456-789 | Business: Geeks2U Services", 10, 90);
    doc.text("Date: " + new Date().toLocaleDateString(), 10, 100);
    doc.addImage(document.querySelector('.logo').src, 'PNG', 150, 10, 40, 15);
    doc.save("quote.pdf");
}

// Utility Functions
function showModal(message, title = "Confirmation") {
    alert(`${title}: ${message}`);
}
