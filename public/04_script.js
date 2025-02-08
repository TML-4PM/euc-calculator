function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value;
    const deviceMatch = emailContent.match(/(\d+)\s+Laptops?/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1]) : 5;
    document.getElementById("device_count").value = deviceCount;
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
