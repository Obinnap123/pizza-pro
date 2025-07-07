// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
});



// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header Background on Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }
});

// Form Submission with Email Functionality
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const formMessage = document.getElementById("formMessage");

  // Get form values
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const eventDate = formData.get("eventDate");
  const eventType = formData.get("eventType");
  const guestCount = formData.get("guestCount");
  const message = formData.get("message");

  // Validate required fields
  if (!name || !email || !phone || !eventDate || !eventType || !guestCount) {
    showMessage("Please fill in all required fields.", "error");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Validate event date (must be in the future)
  const selectedDate = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    showMessage("Event date must be in the future.", "error");
    return;
  }

  // Create email content
  const emailSubject = `Pizza Catering Quote Request - ${eventType} for ${guestCount} guests`;
  const emailBody = `
New catering quote request from The Pizza Pro website:

Customer Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Event Details:
- Date: ${eventDate}
- Type: ${eventType}
- Guest Count: ${guestCount}

Additional Details:
${message || "No additional details provided."}

Please respond to this inquiry within 24 hours.

Best regards,
The Pizza Pro Website
    `.trim();

  // Create mailto link
  const mailtoLink = `mailto:catering@pizzapro.com?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  // Show success message
  showMessage(
    "Thank you for your quote request! Your email client will open to send the request. We'll respond within 24 hours.",
    "success"
  );

  // Open email client
  setTimeout(() => {
    window.location.href = mailtoLink;
  }, 1000);

  // Reset form
  this.reset();

  // Log form submission for testing
  console.log("Form submitted successfully:", {
    name,
    email,
    phone,
    eventDate,
    eventType,
    guestCount,
    message,
  });
});

function showMessage(text, type) {
  const formMessage = document.getElementById("formMessage");
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  // Hide message after 5 seconds for success, 8 seconds for error
  const timeout = type === "success" ? 5000 : 8000;
  setTimeout(() => {
    formMessage.style.display = "none";
  }, timeout);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".service-card, .menu-item, .gallery-item, .stat"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Form field enhancements
document.addEventListener("DOMContentLoaded", function () {
  // Set minimum date to tomorrow
  const eventDateInput = document.getElementById("eventDate");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  eventDateInput.min = tomorrow.toISOString().split("T")[0];

  // Phone number formatting
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
    }
    e.target.value = value;
  });
});

// Test email functionality button (for demonstration)
function testEmailForm() {
  const form = document.getElementById("quoteForm");

  // Fill form with test data
  document.getElementById("name").value = "John Doe";
  document.getElementById("email").value = "john.doe@example.com";
  document.getElementById("phone").value = "(555) 123-4567";

  // Set event date to next week
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  document.getElementById("eventDate").value = nextWeek
    .toISOString()
    .split("T")[0];

  document.getElementById("eventType").value = "corporate";
  document.getElementById("guestCount").value = "25-50";
  document.getElementById("message").value =
    "This is a test submission to demonstrate the email functionality.";

  // Submit the form
  form.dispatchEvent(new Event("submit"));
}

// Add test button to page (for demonstration purposes)
document.addEventListener("DOMContentLoaded", function () {
  const testButton = document.createElement("button");
  testButton.textContent = "Test Email Form";
  testButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #059669;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
  testButton.onclick = testEmailForm;
  document.body.appendChild(testButton);
});
