// Global Variables
let productList = [];
let allQuotes = []; // To aggregate all quotes
let currentQuote = null; // Stores the current quote details
let specialOrders = [];  // Stores any unknown/special order products
let extraOffer = null;   // Stores extra offer info (if any)

// Load product list from external JSON file
fetch('productList.json')
  .then(response => response.json())
  .then(data => {
    productList = data;
    generateProductCategories();
  })
  .catch(err => console.error("Error loading product list:", err));

// Helper: Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Dynamically generate product categories and items
function generateProductCategories() {
  const container = document.getElementById("product-categories");
  container.innerHTML = "";
  const categories = [...new Set(productList.map(p => p.category))];
  categories.forEach(category => {
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    const header = document.createElement("h3");
    header.textContent = category;
    catDiv.appendChild(header);
    productList.filter(p => p.category === category).forEach(product => {
      const prodDiv = document.createElement("div");
      prodDiv.className = "product-item";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = product.id;
      const label = document.createElement("label");
      label.htmlFor = product.id;
      label.textContent = product.name;
      const qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.min = 0;
      qtyInput.value = 0;
      qtyInput.dataset.productId = product.id;
      prodDiv.appendChild(checkbox);
      prodDiv.appendChild(label);
      prodDiv.appendChild(qtyInput);
      catDiv.appendChild(prodDiv);
    });
    container.appendChild(catDiv);
  });
}

// Parse email input and auto-fill the form
function parseEmailAndFillForm() {
  const emailContent = document.getElementById("email_input").value;
  // Fill customer details
  const nameMatch = emailContent.match(/Customer Name:\s*([^\n]+)/i);
  const companyMatch = emailContent.match(/Company:\s*([^\n]+)/i);
  document.getElementById("customer_name").value = nameMatch ? nameMatch[1].trim() : "";
  document.getElementById("company_name").value = companyMatch ? companyMatch[1].trim() : "";

  // Reset products and special orders
  specialOrders = [];
  productList.forEach(prod => {
    const checkbox = document.getElementById(prod.id);
    const qtyInput = document.querySelector(`input[data-product-id="${prod.id}"]`);
    if (checkbox) checkbox.checked = false;
    if (qtyInput) qtyInput.value = 0;
  });

  // Loop over each product to see if mentioned with a quantity
  productList.forEach(prod => {
    const regex = new RegExp(escapeRegExp(prod.name) + "\\s*(\\d+)", "i");
    const match = emailContent.match(regex);
    if (match) {
      const qty = parseInt(match[1]);
      if (!isNaN(qty) && qty > 0) {
        const checkbox = document.getElementById(prod.id);
        const qtyInput = document.querySelector(`input[data-product-id="${prod.id}"]`);
        if (checkbox) checkbox.checked = true;
        if (qtyInput) qtyInput.value = qty;
      }
    }
  });
  
  // Check for unknown product mentions and add them as special orders
  // (We assume any line starting with "Product:" that isn’t in our list)
  const unknownRegex = /Product:\s*([^\n]+)/gi;
  let match;
  while ((match = unknownRegex.exec(emailContent)) !== null) {
    const prodName = match[1].trim();
    if (!productList.some(p => p.name.toLowerCase() === prodName.toLowerCase())) {
      specialOrders.push(prodName);
    }
  }
  
  if (specialOrders.length > 0) {
    const notes = document.getElementById("additional_notes");
    notes.value += "\n\nSpecial Order - POA:\n" + specialOrders.join("\n");
  }
  showModal("Form auto-filled from email input.", "Auto-Fill Complete");
}

// Calculate quote from selected products (manual or after email fill)
function calculateAndDisplay(event) {
  event.preventDefault();
  let selectedProducts = productList.filter(prod => {
    const checkbox = document.getElementById(prod.id);
    return checkbox && checkbox.checked;
  }).map(prod => {
    const qtyInput = document.querySelector(`input[data-product-id="${prod.id}"]`);
    const quantity = qtyInput ? parseInt(qtyInput.value) : 0;
    return { ...prod, quantity };
  }).filter(prod => prod.quantity > 0);
  
  // Base calculation: assume 1 hour per product and $100 per hour extra charge
  const baseHours = selectedProducts.length;
  const urgency = document.getElementById("urgency_level").value;
  const afterHours = document.getElementById("after_hours").value === "Yes";
  const urgencyMultipliers = { Standard: 1.0, Urgent: 1.2, Emergency: 1.5 };
  const adjustedHours = Math.round(baseHours * urgencyMultipliers[urgency] + (afterHours ? 2 : 0));
  const productsCost = selectedProducts.reduce((sum, prod) => sum + prod.price * prod.quantity, 0);
  
  // Extra offers (if any)
  let offerCost = 0;
  if (extraOffer === "SmartAssist") offerCost = 19.99;
  else if (extraOffer === "SmartAssistPlus") offerCost = 29.99;
  // For Special Request, you might handle it differently (POA pricing)
  
  // Total cost: sum of product cost + installation cost (hours * 100) + offer (one-time addition)
  const totalCost = productsCost + (adjustedHours * 100) + offerCost;
  
  // Save current quote details
  currentQuote = {
    customer: document.getElementById("customer_name").value,
    company: document.getElementById("company_name").value,
    installationDate: document.getElementById("installation_date").value,
    urgency: urgency,
    afterHours: afterHours,
    products: selectedProducts,
    specialOrders: specialOrders,
    extraOffer: extraOffer,
    hours: adjustedHours,
    totalCost: totalCost,
    additionalNotes: document.getElementById("additional_notes").value
  };
  
  // Add to aggregated quotes
  allQuotes.push(currentQuote);
  
  // Update UI results table
  const tbody = document.getElementById("quote-table-body");
  tbody.innerHTML = "";
  selectedProducts.forEach(prod => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${prod.name}</td>
      <td>${prod.category}</td>
      <td>${prod.quantity}</td>
      <td>$${prod.price.toFixed(2)}</td>
      <td>$${(prod.price * prod.quantity).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
  
  // Display special orders (if any)
  const specialDiv = document.getElementById("special-orders");
  if (specialOrders.length > 0) {
    specialDiv.innerHTML = `<strong>Special Order - POA:</strong><br>${specialOrders.join("<br>")}`;
  } else {
    specialDiv.innerHTML = "";
  }
  
  // Update totals in UI
  document.getElementById("total-hours").textContent = adjustedHours;
  document.getElementById("total-cost").textContent = `USD $${totalCost.toFixed(2)}`;
  
  // Generate Barcode and QR Code using unique ID
  const uniqueId = "OW-" + Math.random().toString(36).substr(2, 9);
  generateBarcode(uniqueId);
  generateQRCode(uniqueId);
  
  // Reveal results section
  document.getElementById("results").style.display = "block";
  
  showModal("Quote calculated successfully!", "Calculation Complete");
}

// Generate Barcode (using JsBarcode)
function generateBarcode(uniqueId) {
  if (typeof JsBarcode !== "undefined") {
    JsBarcode("#barcode", uniqueId, { format: "CODE128", width: 2, height: 100 });
  }
}

// Generate QR Code (using QRCode.js)
function generateQRCode(uniqueId) {
  const container = document.getElementById("qrcode");
  container.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(container, { text: uniqueId, width: 128, height: 128 });
  }
}

// Apply extra offer based on button click
function applyOffer(offerType) {
  extraOffer = offerType;
  showModal(`Offer applied: ${offerType}`, "Offer Selected");
}

// Export aggregated quotes to CSV
function exportToCSV() {
  if (allQuotes.length === 0) {
    showModal("No quotes to export yet.", "Export Error");
    return;
  }
  let rows = [
    ["Customer Name", "Company Name", "Installation Date", "Urgency", "After Hours", "Product", "Category", "Quantity", "Unit Price", "Line Total", "Special Orders", "Extra Offer", "Hours", "Total Cost", "Additional Notes"]
  ];
  allQuotes.forEach(quote => {
    quote.products.forEach(prod => {
      rows.push([
        quote.customer,
        quote.company,
        quote.installationDate,
        quote.urgency,
        quote.afterHours,
        prod.name,
        prod.category,
        prod.quantity,
        `$${prod.price.toFixed(2)}`,
        `$${(prod.price * prod.quantity).toFixed(2)}`,
        quote.specialOrders.join(" | "),
        quote.extraOffer || "",
        quote.hours,
        `$${quote.totalCost.toFixed(2)}`,
        quote.additionalNotes
      ]);
    });
  });
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "quotes.csv");
  link.click();
}

// Generate PDF Quote using jsPDF
function printToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFont("helvetica");
  doc.setFontSize(18);
  doc.text("EUC Job Pricing Quote", 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Customer Name: ${currentQuote.customer}`, 10, y += 10);
  doc.text(`Company Name: ${currentQuote.company}`, 10, y += 10);
  doc.text(`Installation Date: ${currentQuote.installationDate}`, 10, y += 10);
  doc.text(`Urgency Level: ${currentQuote.urgency}`, 10, y += 10);
  doc.text(`After Hours: ${currentQuote.afterHours ? "Yes" : "No"}`, 10, y += 10);
  doc.text(`Extra Offer: ${currentQuote.extraOffer || "None"}`, 10, y += 10);
  doc.text("Products:", 10, y += 10);
  currentQuote.products.forEach(prod => {
    doc.text(`${prod.name} (${prod.category}) - Qty: ${prod.quantity} @ $${prod.price.toFixed(2)} = $${(prod.price * prod.quantity).toFixed(2)}`, 10, y += 8);
  });
  if (currentQuote.specialOrders.length > 0) {
    doc.text("Special Orders (POA):", 10, y += 10);
    currentQuote.specialOrders.forEach(item => {
      doc.text(item, 10, y += 8);
    });
  }
  doc.text(`Total Billable Hours: ${currentQuote.hours}`, 10, y += 10);
  doc.setFontSize(16);
  doc.setTextColor(255, 0, 0);
  doc.text(`Total Cost: USD $${currentQuote.totalCost.toFixed(2)}`, 10, y += 15);
  // Add logos
  const logos = [
    { src: "assets/officeworks-logo.png", x: 10, y: y += 15, width: 50, height: 20 },
    { src: "assets/geeks2u-logo.png", x: 70, y: y, width: 50, height: 20 }
  ];
  Promise.all(
    logos.map(logo =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = logo.src;
        img.onload = () => {
          doc.addImage(img, "PNG", logo.x, logo.y, logo.width, logo.height);
          resolve();
        };
        img.onerror = reject;
      })
    )
  ).then(() => {
    doc.save("quote.pdf");
  }).catch(error => {
    console.error("Error loading logos:", error);
    doc.save("quote.pdf");
  });
}

// Send email (simulate by opening mail client)
function sendEmailConfirmation() {
  if (!currentQuote) {
    showModal("Please calculate a quote first.", "Error");
    return;
  }
  const subject = `Quote Confirmation - ${currentQuote.customer}`;
  const body = `Please find the attached quote.\n\nQuote Details:\nCustomer: ${currentQuote.customer}\nCompany: ${currentQuote.company}\nInstallation Date: ${currentQuote.installationDate}\nTotal Cost: USD $${currentQuote.totalCost.toFixed(2)}\n\n(See PDF attachment for full details.)`;
  const mailtoLink = `mailto:troy.latter@unisys.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

// Simulate opening a calendar for scheduling
function openCalendar() {
  // For a demo, simply propose a date/time in the next 5 days at one of three random times
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 5) + 1;
  const proposedDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  const formattedDate = proposedDate.toISOString().split("T")[0];
  const times = ["09:00 AM", "01:00 PM", "03:00 PM"];
  const proposedTime = times[Math.floor(Math.random() * times.length)];
  showModal(`Proposed Installation: ${formattedDate} at ${proposedTime}`, "Scheduling Suggestion");
}

// Modal control
function showModal(message, title) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").textContent = message;
  document.getElementById("confirmation-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("confirmation-modal").style.display = "none";
}
