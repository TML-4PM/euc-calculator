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

    //
