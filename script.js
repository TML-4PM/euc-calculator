// Sample product data
const products = [
    { id: 1, name: 'Product A', price: 100, description: 'Description for Product A' },
    { id: 2, name: 'Product B', price: 150, description: 'Description for Product B' },
    { id: 3, name: 'Product C', price: 200, description: 'Description for Product C' },
    // Add more products as needed
];

// Function to render product options
function renderProductOptions() {
    const productSelection = document.getElementById('product-selection');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-option');
        productDiv.setAttribute('data-id', product.id);
        productDiv.innerHTML = `
            <h5>${product.name}</h5>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
        productDiv.addEventListener('click', () => toggleProductSelection(product.id));
        productSelection.appendChild(productDiv);
    });
}

// Function to toggle product selection
function toggleProductSelection(productId) {
    const productDiv = document.querySelector(`.product-option[data-id='${productId}']`);
    productDiv.classList.toggle('selected');
}

// Function to parse email and auto-fill form (placeholder function)
function parseEmailAndFillForm() {
    const emailInput = document.getElementById('email_input').value;
    // Implement email parsing logic here
    // For example, extract SKU, membership number, etc., from the email content
    // and auto-fill the corresponding form fields.
}

// Function to calculate and display pricing
function calculateAndDisplay(event) {
    event.preventDefault();
    const baseHours = parseFloat(document.getElementById('base_hours').value) || 0;
    const deviceCount = parseInt(document.getElementById('device_count').value) || 0;
    const selectedProducts = document.querySelectorAll('.product-option.selected');
    let productTotal = 0;
    selectedProducts.forEach(productDiv => {
        const productId = parseInt(productDiv.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        if (product) {
            productTotal += product.price;
        }
    });
    const totalPrice = (baseHours * 100) + (deviceCount * 50) + productTotal; // Example calculation
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<strong>Total Price:</strong> $${totalPrice.toFixed(2)}`;
}

// Function to confirm appointment (placeholder function)
function confirmAppointment(event) {
    event.preventDefault();
    // Implement appointment confirmation logic here
    // For example, send an email to the customer with appointment details.
}

// Function to export data to CSV
function exportToCSV() {
    const data = [
        ['Membership Number', document.getElementById('membership_number').value],
        ['SKU', document.getElementById('sku').value],
        ['Base Estimated Hours', document.getElementById('base_hours').value],
        ['Number of Devices', document.getElementById('device_count').value],
        ['Service Type', document.getElementById('service_type').value],
        ['Preferred Installation Date', document.getElementById('installation_date').value],
        // Add more fields as needed
    ];
    const csvContent = data.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'appointment_details.csv';
    link.click();
}

// Function to print to PDF
function printToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('EUC Job Pricing Calculator Details', 10, 10);
    doc.text(`Membership Number: ${document.getElementById('membership_number').value}`, 10, 20);
    doc.text(`SKU: ${document.getElementById('sku').value}`, 10, 30);
    doc.text(`Base Estimated Hours: ${document.getElementById('base_hours').value}`, 10, 40);
    doc.text(`Number of Devices: ${document.getElementById('device_count').value}`, 10, 50);
    doc.text(`Service Type: ${document.getElementById('service_type').value}`, 10, 60);
    doc.text(`Preferred Installation Date: ${document.getElementById('installation_date').value}`, 10, 70);
    // Add more fields as needed
    doc.save('appointment_details.pdf');
}

// Function to schedule in Google Calendar (placeholder function)
function scheduleInGoogleCalendar() {
    // Implement Google Calendar integration here
    // For example, use Google Calendar API to create an event.
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProductOptions();
});
