# EUC Job Pricing Calculator

## Description
The **EUC Job Pricing Calculator** is a powerful web-based tool designed to streamline the quoting process for IT services. It allows users to input their requirements, generate quotes dynamically, and export or share them effortlessly. The calculator also integrates with various systems like ServiceNow, CRM platforms, and checkout systems to enhance operational efficiency.

---

## Key Features

1. **Custom Quote Description**:
   - Users can provide a brief description of their requirements, which is refined automatically based on selected options.

2. **Activity Timeline**:
   - Displays all calculated quotes in chronological order for easy tracking.

3. **Bulk Quote Generation**:
   - Generates multiple quotes at once by uploading a CSV file with predefined inputs.

4. **Real-Time Collaboration via Firebase**:
   - Syncs quotes in real-time using Firebase, enabling team collaboration.

5. **Performance Analytics Dashboard**:
   - Provides insights into total activities, billable hours, and revenue through interactive charts.

6. **CRM Integration (Salesforce Example)**:
   - Logs quotes directly into CRM systems like Salesforce for better lead management.

7. **Historical Data Storage**:
   - Stores all quotes locally for future reference and analysis.

8. **Multi-Currency Support**:
   - Converts costs to different currencies (e.g., AUD, USD, EUR) based on user preference.

9. **Email Quotation**:
   - Allows users to email the latest quote directly to customers or stakeholders.

10. **Print to PDF**:
    - Generates a downloadable PDF of the latest quote for sharing or archiving.

11. **Feedback Collection**:
    - Collects user feedback to continuously improve the tool.

12. **Dark Mode Toggle**:
    - Enhances usability with a dark mode option for better readability.

---

## How to Use

1. **Visit the Live Site**:
   - Access the calculator at: [https://TML-4PM.github.io/euc-calculator/](https://TML-4PM.github.io/euc-calculator/)

2. **Input Details**:
   - Enter your Officeworks Membership Number and SKU.
   - Specify base estimated hours, number of devices, software/hardware requirements, complexity level, and service type.
   - Optionally, add a custom description for the quote.

3. **Calculate Quote**:
   - Click the **"Calculate"** button to generate the quote.
   - The results will include billable hours, cost, and unique identifiers (barcode, QR code).

4. **Export Options**:
   - Export all quotes as a CSV file using the **"Export Quotes to CSV"** button.
   - Print the latest quote as a PDF using the **"Print Quote to PDF"** button.
   - Email the latest quote directly using the **"Send Quotation by Email"** button.

5. **View Performance Dashboard**:
   - Click the **"View Performance Dashboard"** button to see aggregated metrics such as total activities, billable hours, and revenue.

6. **Generate Bulk Quotes**:
   - Upload a CSV file with predefined inputs using the **"Generate Bulk Quotes"** button.

7. **Send to CRM**:
   - Log the latest quote into your CRM system (e.g., Salesforce) using the **"Send to CRM"** button.

8. **Toggle Dark Mode**:
   - Switch between light and dark modes for better readability.

9. **Provide Feedback**:
   - Use the feedback form to submit suggestions or report issues.

---

## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling for a professional and responsive design.
- **JavaScript**: Core functionality for calculations, dynamic updates, and integrations.
- **JsBarcode**: Generates unique barcodes for each activity.
- **QRCode.js**: Creates QR codes for quick access.
- **jsPDF**: Enables printing quotes to PDF.
- **Chart.js**: Visualizes performance metrics in the dashboard.
- **Firebase**: Facilitates real-time collaboration and data storage.
- **Local Storage**: Saves historical quote data for offline use.

---

## Deployment

This project is deployed using **GitHub Pages**. To update or deploy changes:

1. Clone the repository:
   ```bash
   git clone https://github.com/TML-4PM/euc-calculator.git
   cd euc-calculator
