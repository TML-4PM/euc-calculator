# EUC Job Pricing Calculator

## Overview
The **EUC Job Pricing Calculator** is a web-based tool that allows users to quickly estimate job pricing for IT services. The tool supports manual input and email-based auto-filling to streamline data entry and enhance efficiency.

## Features
- **Email Parsing:** Extracts key details (device count, service type) from email requests.
- **Service Type Selection:** Supports different service tiers (Remote Support, Onsite, Multi-Site Deployment, etc.).
- **Dynamic Pricing Calculation:** Automatically calculates billable hours and estimated cost.
- **Barcode & QR Code Generation:** Generates unique identifiers for jobs.
- **CSV Export:** Allows users to download the pricing breakdown.
- **PDF Quote Generation:** Creates a PDF summary of the estimated job cost.
- **Appointment Suggestion & Confirmation:** Suggests available installation dates and allows appointment confirmation.
- **Responsive & User-Friendly Interface:** Optimized for both desktop and mobile use.

## Technologies Used
- **HTML, CSS, JavaScript** (Frontend UI)
- **Bootstrap (Optional)** for UI styling
- **JsBarcode & QRCode.js** for barcode and QR code generation
- **jsPDF** for PDF export
- **Netlify** for hosting & deployment

## Installation & Deployment
### **Local Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/euc-pricing-calculator.git
   cd euc-pricing-calculator
   ```
2. Open `index.html` in a browser.

### **Deploying to Netlify**
1. Ensure you have a `netlify.toml` file with the following content:
   ```toml
   [build]
   command = "echo 'No build process needed'"
   publish = "/"
   ```
2. Commit your code and push it to GitHub.
3. Connect the repository to Netlify and deploy.

## Usage
1. **Manual Input:** Enter job details directly into the form.
2. **Auto-Fill from Email:** Paste an email request, and the tool will extract relevant details.
3. **Calculate Pricing:** Click "Calculate" to view billable hours and estimated costs.
4. **Export Options:**
   - Click "Export to CSV" to download a CSV file.
   - Click "Print Quote to PDF" to generate a PDF.
5. **Barcode & QR Code:** Automatically generated for each estimate.
6. **Appointment Scheduling:**
   - Click "Suggest Dates" to see recommended installation dates.
   - Click "Confirm Appointment" to finalize the schedule.

## File Structure
```
/ (Root)
├── index.html          # Main UI
├── styles.css          # Styling
├── script.js          # JavaScript logic
├── netlify.toml       # Netlify deployment config
├── assets/            # Images & icons
└── README.md          # Documentation
```

## Future Enhancements
- **Dark Mode Support**
- **Integration with Google Calendar for scheduling**
- **Admin dashboard for managing requests**
- **AI-powered email parsing for better accuracy**

## License
This project is licensed under the MIT License.

## Contributors
- **Your Name** (@your-github)
- **Other contributors**

## Support
For any issues, open an issue in the GitHub repository or contact [your-email@example.com].

