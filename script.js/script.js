function calculateAndDisplay() {
    const quoteDescription = document.getElementById('quote_description').value.trim();
    const baseHours = parseInt(document.getElementById('base_hours').value || 1);
    const deviceCount = parseInt(document.getElementById('device_count').value || 1);
    const software = Array.from(document.getElementById('software').selectedOptions).map(option => option.value);
    const hardware = Array.from(document.getElementById('hardware').selectedOptions).map(option => option.value);
    const complexity = document.getElementById('complexity').value;
    const serviceType = document.getElementById('service_type').value;

    const complexityMultipliers = { Basic: 1.0, Standard: 1.2, Advanced: 1.5, Extreme: 2.0 };
    const serviceTypeMultipliers = { "Remote Support": 0.8, "Onsite Standard": 1.0, "Onsite Urgent": 1.5, "Multi-Site Deployment": 1.3 };

    const complexityMultiplier = complexityMultipliers[complexity];
    const serviceTypeMultiplier = serviceTypeMultipliers[serviceType];

    const adjustedHours = Math.round(baseHours * complexityMultiplier * serviceTypeMultiplier + (deviceCount * 0.2));
    const totalCost = adjustedHours * 100; // Example rate of $100/hour

    // Generate a refined quote description
    const refinedDescription = generateRefinedDescription(quoteDescription, {
        software,
        hardware,
        complexity,
        serviceType,
        deviceCount
    });

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Custom Quote Description:</strong> ${refinedDescription}</p>
        <p><strong>Final Billable Hours:</strong> ${adjustedHours} Hours</p>
        <p><strong>Total Cost (AUD):</strong> AUD $${totalCost.toFixed(2)}</p>
    `;

    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById('barcode-container').style.display = 'block';
    document.getElementById('qrcode-container').style.display = 'block';
}

function generateRefinedDescription(customText, options) {
    const { software, hardware, complexity, serviceType, deviceCount } = options;

    // Combine user-provided text with selected options
    let refinedDescription = customText || "No description provided.";
    refinedDescription += ` (${deviceCount} devices, ${complexity} complexity, ${serviceType} service)`;

    if (software.length > 0) {
        refinedDescription += `, Software: ${software.join(", ")}`;
    }

    if (hardware.length > 0) {
        refinedDescription += `, Hardware: ${hardware.join(", ")}`;
    }

    return refinedDescription;
}

function generateBarcodeAndQRCode(uniqueId) {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}