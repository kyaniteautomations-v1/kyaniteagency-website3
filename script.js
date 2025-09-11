// Highlight nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Service box expansion functionality
document.addEventListener('DOMContentLoaded', function () {
  let outsideClickHandler = null;

  // Function to close all service boxes
  function closeAllBoxes() {
    const currentServiceBoxes = document.querySelectorAll('.service-box');
    currentServiceBoxes.forEach(box => {
      box.classList.remove('expanded');
    });
  }

  // Function to check if device is mobile/touch
  function isMobileDevice() {
    return window.innerWidth <= 768 ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);
  }

  // Add click handlers for mobile devices
  function setupMobileInteraction() {
    const serviceBoxes = document.querySelectorAll('.service-box');

    // Remove existing outside click handler
    if (outsideClickHandler) {
      document.removeEventListener('click', outsideClickHandler);
      outsideClickHandler = null;
    }

    if (isMobileDevice()) {
      // Remove any existing event listeners by cloning nodes
      serviceBoxes.forEach(box => {
        const newBox = box.cloneNode(true);
        box.parentNode.replaceChild(newBox, box);
      });

      // Re-query the service boxes after cloning
      const newServiceBoxes = document.querySelectorAll('.service-box');

      newServiceBoxes.forEach(box => {
        box.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          const isCurrentlyExpanded = this.classList.contains('expanded');

          // Close all boxes first
          closeAllBoxes();

          // If this box wasn't expanded, expand it
          if (!isCurrentlyExpanded) {
            this.classList.add('expanded');
          }
        });
      });

      // Create and store the outside click handler
      outsideClickHandler = function (e) {
        if (!e.target.closest('.service-box')) {
          closeAllBoxes();
        }
      };

      // Add the outside click handler
      document.addEventListener('click', outsideClickHandler);

      // Add mobile-specific class to body for CSS targeting
      document.body.classList.add('mobile-device');
    } else {
      // Remove mobile class for desktop
      document.body.classList.remove('mobile-device');

      // Remove expanded classes on desktop
      closeAllBoxes();
    }
  }

  // Initial setup
  setupMobileInteraction();

  // Handle window resize - re-evaluate mobile state
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setupMobileInteraction();
    }, 250);
  });
});