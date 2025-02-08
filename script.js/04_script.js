let quotes = [];
let totalActivities = 0;
let totalHours = 0;
let totalCost = 0;

// Firebase Initialization
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load quotes from local storage
window.onload = () => {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    quotes = storedQuotes;
    updateAggregatedMetrics();
    updateTimeline();
};

// Calculate and Display Quote
function calculateAndDisplay() {
    const quoteDescription = document.getElementById('quote_description').value.trim();
    const baseHours = parseInt(document.getElementById('base_hours').value || 1);
    const deviceCount = parseInt(document.getElementById('device_count').value || 1);
    const software = Array.from(document.getElementById('software').selectedOptions).map(option => option.value);
    const hardware = Array.from(document.getElementById('hardware').selectedOptions).map(option => option.value);
    const complexity = document.getElementById('complexity').value;
    const serviceType = document.getElementById('service_type').value;
    const technician = document.getElementById('technician').value;
    const currency = document.getElementById('currency').value;

    const complexityMultipliers = { Basic: 1.0, Standard: 1.2, Advanced: 1.5, Extreme: 2.0 };
    const serviceTypeMultipliers = { "Remote Support": 0.8, "Onsite Standard": 1.0, "Onsite Urgent": 1.5, "Multi-Site Deployment": 1.3 };

    const complexityMultiplier = complexityMultipliers[complexity];
    const serviceTypeMultiplier = serviceTypeMultipliers[serviceType];

    const adjustedHours = Math.round(baseHours * complexityMultiplier * serviceTypeMultiplier + (deviceCount * 0.2));
    const quoteCost = adjustedHours * 100; // Example rate of $100/hour

    // Convert cost to selected currency
    const exchangeRates = { AUD: 1, USD: 0.65, EUR: 0.60 }; // Example rates
    const convertedCost = (quoteCost / exchangeRates.AUD * exchangeRates[currency]).toFixed(2);

    // Generate refined description
    const refinedDescription = generateRefinedDescription(quoteDescription, {
        software,
        hardware,
        complexity,
        serviceType,
        deviceCount,
        technician
    });

    // Add quote to list
    const quote = {
        description: refinedDescription,
        hours: adjustedHours,
        cost: quoteCost,
        converted_cost: convertedCost,
        currency,
        technician,
        timestamp: new Date().toLocaleString()
    };
    quotes.push(quote);

    // Save to Firebase
    saveQuoteToFirebase(quote);

    // Update aggregated metrics
    totalActivities++;
    totalHours += adjustedHours;
    totalCost += quoteCost;
    updateAggregatedMetrics();

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `
        <table>
            <tr>
                <th>Description</th>
                <th>Billable Hours</th>
                <th>Cost (${currency})</th>
                <th>Technician</th>
            </tr>
            <tr>
                <td>${refinedDescription}</td>
                <td>${adjustedHours} Hours</td>
                <td>${currency} $${convertedCost}</td>
                <td>${technician}</td>
            </tr>
        </table>
    `;

    generateBarcodeAndQRCode(`OW-${Math.random().toString(36).substr(2, 9)}`);
    document.getElementById('barcode-container').style.display = 'block';
    document.getElementById('qrcode-container').style.display = 'block';

    // Save to local storage
    saveQuotesToLocalStorage();
    updateTimeline();
}

// Generate Refined Description
function generateRefinedDescription(customText, options) {
    const { software, hardware, complexity, serviceType, deviceCount, technician } = options;

    let refinedDescription = customText || "No description provided.";
    refinedDescription += ` (${deviceCount} devices, ${complexity} complexity, ${serviceType} service, assigned to ${technician})`;

    if (software.length > 0) {
        refinedDescription += `, Software: ${software.join(", ")}`;
    }

    if (hardware.length > 0) {
        refinedDescription += `, Hardware: ${hardware.join(", ")}`;
    }

    return refinedDescription;
}

// Generate Barcode and QR Code
function generateBarcodeAndQRCode(uniqueId) {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
    new QRCode(document.getElementById("qrcode"), uniqueId);
}

// Update Aggregated Metrics
function updateAggregatedMetrics() {
    document.getElementById('total-activities').textContent = totalActivities;
    document.getElementById('total-hours').textContent = totalHours;
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

// Export Quotes to CSV
function exportQuotesToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + [
        ["Description", "Billable Hours", "Cost (AUD)", "Converted Cost", "Currency", "Technician", "Timestamp"],
        ...quotes.map(quote => [quote.description, quote.hours, quote.cost, quote.converted_cost, quote.currency, quote.technician, quote.timestamp])
    ].map(row => row.join(",")).join("\n");

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodeURI(csvContent));
    downloadLink.setAttribute("download", "quotes.csv");
    downloadLink.click();
}

// Print Quote to PDF
function printQuoteToPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const latestQuote = quotes[quotes.length - 1]; // Get the latest quote

    doc.text("EUC Job Pricing Quote", 10, 10);
    doc.text(`Description: ${latestQuote.description}`, 10, 20);
    doc.text(`Billable Hours: ${latestQuote.hours} Hours`, 10, 30);
    doc.text(`Cost (${latestQuote.currency}): ${latestQuote.currency} $${latestQuote.converted_cost}`, 10, 40);
    doc.text(`Assigned Technician: ${latestQuote.technician}`, 10, 50);

    doc.save("quote.pdf");
}

// Send Quote by Email
function sendQuoteByEmail() {
    const email = prompt("Enter recipient email address:");
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const latestQuote = quotes[quotes.length - 1]; // Get the latest quote
    if (!latestQuote) {
        alert("No quotes available to send.");
        return;
    }

    const subject = "Your EUC Job Quotation";
    const body = `
        Description: ${latestQuote.description}<br>
        Billable Hours: ${latestQuote.hours} Hours<br>
        Cost (${latestQuote.currency}): ${latestQuote.currency} $${latestQuote.converted_cost}<br>
        Assigned Technician: ${latestQuote.technician}
    `;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink; // Opens default email client
}

// Save Quotes to Firebase
function saveQuoteToFirebase(quote) {
    db.collection("quotes").add(quote)
        .then(() => {
            console.log("Quote saved to Firebase!");
        })
        .catch(error => {
            console.error("Error saving quote:", error);
        });
}

// Fetch Quotes from Firebase
function fetchQuotesFromFirebase() {
    db.collection("quotes").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const quote = doc.data();
                quotes.push(quote);
            });
            updateAggregatedMetrics();
            updateTimeline();
        })
        .catch(error => {
            console.error("Error fetching quotes:", error);
        });
}

// Bulk Quote Generation
function generateBulkQuotes() {
    const fileInput = document.getElementById('bulk_quotes');
    if (!fileInput.files.length) {
        alert("Please upload a CSV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const csvData = event.target.result;
        const lines = csvData.split("\n").map(line => line.split(","));

        // Skip header row
        lines.shift();

        lines.forEach(line => {
            const [description, baseHours, deviceCount, complexity, serviceType, technician] = line;
            calculateAndDisplay(description, parseInt(baseHours), parseInt(deviceCount), complexity, serviceType, technician);
        });

        alert("Bulk quotes generated successfully!");
    };

    reader.readAsText(fileInput.files[0]);
}

// Performance Dashboard
function showPerformanceDashboard() {
    const ctx = document.getElementById('performance-chart').getContext('2d');

    const data = quotes.reduce((acc, quote) => {
        const tech = quote.technician;
        acc[tech] = (acc[tech] || 0) + quote.cost;
        return acc;
    }, {});

    const chartData = Object.keys(data).map(tech => ({
        label: tech,
        value: data[tech]
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(item => item.label),
            datasets: [{
                label: 'Total Revenue by Technician',
                data: chartData.map(item => item.value),
                backgroundColor: ['#00529F', '#003A75', '#4CAF50', '#FF9800'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('dashboard-modal').style.display = "flex";
}

function closeDashboardModal() {
    document.getElementById('dashboard-modal').style.display = "none";
}

// CRM Integration (Salesforce Example)
function sendToCRM() {
    const latestQuote = quotes[quotes.length - 1];
    if (!latestQuote) {
        alert("No quotes available to send.");
        return;
    }

    const crmAPIUrl = "https://your-crm-instance.com/api/leads"; // Replace with actual CRM API URL
    const crmAPIToken = "your-crm-api-token"; // Replace with actual API token

    const payload = {
        name: "New Lead",
        description: latestQuote.description,
        amount: latestQuote.cost,
        assigned_to: latestQuote.technician
    };

    fetch(crmAPIUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crmAPIToken}`
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            alert("Quote successfully sent to CRM!");
            console.log(data);
        })
        .catch(error => {
            alert("Error sending quote to CRM. Please try again later.");
            console.error(error);
        });
}

// Historical Data Storage
function saveQuotesToLocalStorage() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotesFromLocalStorage() {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    quotes = storedQuotes;
}

// Show History
function showHistory() {
    const historyDiv = document.getElementById('results');
    historyDiv.innerHTML = `<h3>Quote History</h3>`;
    quotes.forEach(quote => {
        historyDiv.innerHTML += `
            <p><strong>Description:</strong> ${quote.description}</p>
            <p><strong>Cost:</strong> ${quote.currency} $${quote.converted_cost}</p>
            <hr>
        `;
    });
}

// Update Timeline
function updateTimeline() {
    const timelineDiv = document.getElementById('timeline');
    timelineDiv.innerHTML = ""; // Clear previous content

    quotes.forEach((quote, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.style.cssText = "display: flex; align-items: center; margin-bottom: 10px;";
        timelineItem.innerHTML = `
            <div style="width: 10px; height: 10px; background: #00529F; border-radius: 50%; margin-right: 10px;"></div>
            <div><strong>Activity ${index + 1}</strong> - ${quote.timestamp}: ${quote.description} (Cost: ${quote.currency} $${quote.converted_cost})</div>
        `;
        timelineDiv.appendChild(timelineItem);
    });
}

// Feedback Collection
function submitFeedback() {
    const feedback = document.getElementById('feedback').value.trim();
    if (!feedback) {
        alert("Please provide feedback.");
        return;
    }

    alert("Thank you for your feedback!");
    console.log("Feedback submitted:", feedback);
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
