// Parse Email and Auto-Fill Form
function parseEmailAndFillForm() {
    const emailContent = document.getElementById("email_input").value.trim();
    if (!emailContent) {
        showModal("Please paste an email request first.", "Error");
        return;
    }

    const deviceMatch = emailContent.match(/(\d+)\s*(laptops?|desktops?|tablets?|devices?)/i);
    const deviceCount = deviceMatch ? parseInt(deviceMatch[1], 10) : 5;
    document.getElementById("device_count").value = deviceCount;

    const serviceTypeMap = {
        "Remote Support": /remote support/i,
        "Onsite Standard": /onsite\s+(standard|basic)/i,
        "Onsite Urgent": /onsite\s+(urgent|priority|emergency)/i,
        "Multi-Site Deployment": /multi-site\s+(deployment|installation)/i
    };
    
    let selectedService = "Onsite Standard";
    Object.keys(serviceTypeMap).forEach(type => {
        if (serviceTypeMap[type].test(emailContent)) {
            selectedService = type;
        }
    });

    document.getElementById("service_type").value = selectedService;
    showModal("Form filled successfully!", "Success");
}

// Schedule Appointment in Google Calendar
function scheduleInGoogleCalendar() {
    const serviceType = document.getElementById("service_type").value;
    const deviceCount = document.getElementById("device_count").value;
    const selectedDate = document.getElementById("installation_date").value;
    
    if (!selectedDate) {
        showModal("Please select an installation date before scheduling.", "Error");
        return;
    }

    const eventTitle = `Installation - ${serviceType}`;
    const eventDetails = `Service Type: ${serviceType}%0ANumber of Devices: ${deviceCount}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&dates=${selectedDate.replace(/-/g, '')}T090000Z/${selectedDate.replace(/-/g, '')}T100000Z`;

    window.open(googleCalendarUrl, '_blank');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Utility Functions
function showModal(message, title = "Confirmation") {
    alert(`${title}: ${message}`);
}
