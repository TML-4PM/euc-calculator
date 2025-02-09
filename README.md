# EUC Job Pricing Calculator

This web application calculates job pricing for End-User Computing (EUC) services. It supports both manual and email-based inputs. The calculator groups products by category, allows quantity entry, and includes extra offers. The final quote is generated as a PDF with professional branding and can be exported as CSV.

## Features

- **Modern, responsive UI** with grouped product categories.
- **Manual & email input:** Paste an email request to auto-fill the form.
- **Special Orders:** Unknown products are flagged as “Special Order – POA.”
- **Extra Offers:** Choose from add-on options (SmartAssist, SmartAssist+, Special Request).
- **Calendar Integration:** A sample scheduling suggestion is provided.
- **Quote Aggregation:** All quotes are stored and can be exported to CSV.
- **PDF Generation & Email:** Generates a PDF quote (with logos) and opens the mail client for sending.
  
## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run build` to build the project (all necessary files will be copied to the `public` folder).
4. Run locally with `npm start` or deploy to Netlify.

## File Structure

