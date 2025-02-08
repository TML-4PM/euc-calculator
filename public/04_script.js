function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value;

    // Extract details from email
    const deviceMatch = emailContent.match(/(\d+)\s+Laptops?/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1]) : 5;

    const software = [];
    if (emailContent.includes("Microsoft Office")) software.push("Office");
    if (emailContent.includes("Salesforce")) software.push("SFDC");

    const serviceType = emailContent.includes("Onsite Urgent") ? "Onsite Urgent" : "Onsite Standard";

    document.getElementById("device_count").value = deviceCount;
    document.getElementById("service_type").value = serviceType;
}

function suggestDates() {
    const today = new Date();
    const options = [];

    for (let i = 1; i <= 3; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        options.push(futureDate.toISOString().split("T")[0]);
    }

    alert(`Suggested Dates:\n${options.join("\n")}`);
}

function confirmAppointment() {
    const selectedDate = document.getElementById("installation_date").value;
    if (!selectedDate) {
        alert("Please select an installation date before confirming.");
        return;
    }

    alert(`Appointment confirmed for ${selectedDate}`);
}
