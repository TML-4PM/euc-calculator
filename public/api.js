// Mock database to store scheduled appointments
const appointments = [];

// 📅 Function to fetch available time slots
function getAvailableTimeSlots() {
    const today = new Date();
    const timeSlots = [];

    for (let i = 1; i <= 5; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        timeSlots.push(futureDate.toISOString().split("T")[0]);
    }

    return timeSlots;
}

// 📅 Function to suggest available dates (used in the UI)
function suggestDates() {
    const availableDates = getAvailableTimeSlots();
    alert(`Available Installation Dates:\n${availableDates.join("\n")}`);
}

// 📌 Function to schedule an appointment
function scheduleAppointment(customerName, installationDate, serviceType) {
    if (!installationDate) {
        alert("Please select an installation date before confirming.");
        return;
    }

    const appointmentId = `APT-${Math.random().toString(36).substr(2, 9)}`;
    const newAppointment = {
        id: appointmentId,
        customerName,
        installationDate,
        serviceType,
        status: "Scheduled",
    };

    appointments.push(newAppointment);
    alert(`✅ Appointment confirmed for ${installationDate}.\nReference ID: ${appointmentId}`);
    return newAppointment;
}

// 📌 Function to check appointment status
function getAppointmentStatus(appointmentId) {
    const appointment = appointments.find((appt) => appt.id === appointmentId);
    return appointment ? appointment.status : "Not Found";
}

// 📌 Function to cancel an appointment
function cancelAppointment(appointmentId) {
    const index = appointments.findIndex((appt) => appt.id === appointmentId);
    if (index !== -1) {
        appointments[index].status = "Cancelled";
        alert(`🚫 Appointment ${appointmentId} has been cancelled.`);
        return true;
    } else {
        alert(`⚠ Appointment ${appointmentId} not found.`);
        return false;
    }
}

// 📡 Placeholder: ServiceNow Integration
function scheduleInServiceNow(customerName, installationDate, serviceType) {
    // In a real-world scenario, this would send a request to the ServiceNow API
    console.log(`📡 Sending request to ServiceNow for ${customerName} on ${installationDate} (${serviceType})`);
}

// 📡 Placeholder: Microsoft Outlook API Integration
function scheduleInOutlook(customerName, installationDate, serviceType) {
    // This function would integrate with the Microsoft Graph API
    console.log(`📧 Sending Outlook calendar invite to ${customerName} for ${installationDate} (${serviceType})`);
}

// 📌 Function to handle API-driven appointment confirmation
function confirmAppointment() {
    const customerName = "Officeworks Customer"; // Placeholder - this could be dynamically set
    const installationDate = document.getElementById("installation_date").value;
    const serviceType = document.getElementById("service_type").value;

    if (!installationDate) {
        alert("⚠ Please select an installation date before confirming.");
        return;
    }

    const appointment = scheduleAppointment(customerName, installationDate, serviceType);
    scheduleInServiceNow(customerName, installationDate, serviceType);
    scheduleInOutlook(customerName, installationDate, serviceType);

    return appointment;
}
