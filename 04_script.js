function calculateAndDisplay() {
    const quoteDescription = document.getElementById('quote_description').value.trim();
    let baseHours = parseInt(document.getElementById('base_hours').value) || 1;
    let deviceCount = parseInt(document.getElementById('device_count').value) || 1;
    
    // Prevent negative or zero values
    if (baseHours < 1) baseHours = 1;
    if (deviceCount < 1) deviceCount = 1;

    const software = Array.from(document.getElementById('software').selectedOptions).map(option => option.value);
    const hardware = Array.from(document.getElementById('hardware').selectedOptions).map(option => option.value);
    const complexity = document.getElementById('complexity').value;
    const serviceType = document.getElementById('service_type').value;

    const complexityMultipliers = { Basic: 1.0, Standard: 1.2, Advanced: 1.5, Extreme: 2.0 };
    const serviceTypeMultipliers = { "Remote Support": 0.8, "Onsite Standard": 1.0, "Onsite Urgent": 1.5, "Multi-Site Deployment": 1.3 };

    const complexityMultiplier = complexityMultipliers[complexity] || 1.0;
    const serviceTypeMultiplier = serviceTypeMultipliers[serviceType] || 1.0;

    // Calculation
    const adjustedHours = Math.round(baseHours * complexityMultiplier * serviceTypeMultiplier + (deviceCount * 0.2));
    const totalCost = adjustedHours * 100; // $100/hour rate

    // Generate description
    const refinedDescription = generateRefinedDescription(quoteDescription, {
        software,
        hardware,
        complexity,
        serviceType,
        deviceCount
    });

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Custom Quote Description:</strong> ${refinedDescription}</p>
        <p><strong>Final Billable Hours:</strong> ${adjustedHours} Hours</p>
        <p><strong>Total Cost (AUD):</strong> AUD $${totalCost.toFixed(2)}</p>
    `;

    // Generate barcode and QR code
    const uniqueId = `OW-${Math.random().toString(36).substr(2, 9)}`;
    generateBarcodeAndQRCode(uniqueId);
}

function generateRefinedDescription(customText, options) {
    const { software, hardware, complexity, serviceType, deviceCount } = options;
    let refinedDescription = customText || "No description provided.";
    refinedDescription += ` (${deviceCount} devices, ${complexity} complexity, ${serviceType} service)`;

    if (software.length) {
        refinedDescription += `, Software: ${software.join(", ")}`;
    }
    if (hardware.length) {
        refinedDescription += `, Hardware: ${hardware.join(", ")}`;
    }
    return refinedDescription;
}

function generateBarcodeAndQRCode(uniqueId) {
    // Clear previous barcode and QR code
    document.getElementById("qrcode").innerHTML = "";

    // Generate new barcode
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });

    // Generate new QR code
    new QRCode(document.getElementById("qrcode"), uniqueId);
}
