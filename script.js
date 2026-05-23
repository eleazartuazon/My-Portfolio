// Loading animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const typingElement = document.querySelector(".typing-text");

  // Typing animation
  const text = "<Hello World/>";
  let index = 0;
  const interval = setInterval(() => {
    typingElement.textContent = text.substring(0, index) + "";
    index++;
    if (index > text.length) {
      clearInterval(interval);
      setTimeout(() => {

        // Add transition to opacity for smooth fade-out
        loadingScreen.style.transition = "opacity 1s ease, transform 1s ease";
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transform = "translateY(-50px)"; // Optional: Adding a slight upward slide effect

        // Fade in the main content
        mainContent.style.transition = "opacity 1s ease";
        mainContent.style.opacity = "1";

        // After transition ends, hide the loading screen
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 1000); // Matches the duration of the fade-out animation
      }, 1000);
    }
  }, 100);
});
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  
  // Intersection Observer for section animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
  
  // Active nav link update on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });
  
  // Sparkle Animation
  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
  
    const size = Math.random() * 10 + 5;
    const duration = Math.random() * 1000 + 1000;
  
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animation = `sparkle ${duration}ms linear`;
  
    document.getElementById("particles-js").appendChild(sparkle);
  
    setTimeout(() => {
      sparkle.remove();
    }, duration);
  }
  
  function initSparkles() {
    setInterval(createSparkle, 500);
  }
  
  // Initialize Sparkles after loading
  setTimeout(() => initSparkles(), 2000);
  
  // Mobile Navigation Toggle: safe guard old menu elements if present
  document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const openIcon = document.querySelector(".open-icon");
    const closeIcon = document.querySelector(".close-icon");

    if (navToggle && mobileMenu) {
      navToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("show");
        if (openIcon && closeIcon) {
          openIcon.classList.toggle("hidden");
          closeIcon.classList.toggle("hidden");
        }
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll("#mobile-menu .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("show");
          if (openIcon && closeIcon) {
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
          }
        });
      });

      // Close mobile menu when resizing to desktop view
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("show");
          if (openIcon && closeIcon) {
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
          }
        }
      });
    }
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const phrases = ["Web Developer", "Programmer", "Software Developer", "Tech Enthusiast", "Lifelong Learner"];
  const el = document.getElementById("typewriter");

  let typeTime = 150;
  let backTime = 50;

  let curPhraseIndex = 0;

  const writeLoop = async () => {
    while (true) {
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        el.innerText = curWord.substring(0, i + 1);
        await sleep(typeTime);
      }

      await sleep(typeTime * 15);

      for (let i = curWord.length; i > 0; i--) {
        el.innerText = curWord.substring(0, i - 1);
        await sleep(backTime);
      }

      await sleep(typeTime * 5);

      if (curPhraseIndex === phrases.length - 1) {
        curPhraseIndex = 0;
      } else {
        curPhraseIndex++;
      }
    }
  };

  writeLoop();

  document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;

  let currentIndex = 0;
  let itemsPerScroll = window.innerWidth >= 1024 ? 3 : 1; // Moves by 3 on desktop, 1 on mobile
  let maxIndex = Math.ceil(totalItems / itemsPerScroll) - 1; // Max scroll index

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const moveDistance = itemWidth * itemsPerScroll;
    track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
  }

  nextBtn.addEventListener("click", function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // Jump to last
    }
    updateCarousel();
  });

  // Adjust when screen size changes
  window.addEventListener("resize", function () {
    itemsPerScroll = window.innerWidth >= 1024 ? 3 : 1;
    maxIndex = Math.ceil(totalItems / itemsPerScroll) - 1;
    updateCarousel();
  });

  updateCarousel(); // Initial setup
});


  // Particles.js Configuration
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#3b82f6",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

// Contact Form Configuration
  document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("hNDs4uvKytGGzAZo8"); // Replace with your EmailJS Public Key

    const contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Collect form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate fields
      if (!name || !email || !message) {
        showSiteModal("Please fill in all fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showSiteModal("Please enter a valid email address with an @ and domain, e.g. user@example.com.", "error");
        return;
      }

      // EmailJS parameters
      const params = {
        name: name,
        email: email,
        message: message,
      };

      // Show loading modal immediately while the message sends
      showSiteModal("Sending your message...", "info", "Sending");
      setFormEnabled(contactForm, false);

      emailjs.send("service_22et9wc", "template_4pwjh4f", params)
        .then(function (response) {
          showSiteModal("Awesome! Your message has been sent. I'll reply as soon as I can. 🚀", "success");
          contactForm.reset();
        })
        .catch(function (error) {
          showSiteModal("Uh-oh! Looks like there was an issue sending your message. Give it another shot!", "error");
          console.error("EmailJS Error:", error);
        })
        .finally(function () {
          setFormEnabled(contactForm, true);
        });
    });
  });

  // Modal helper: shows an in-page modal with message and type ('success'|'error'|'info')
  function showSiteModal(message, type = 'info', title) {
    const modal = document.getElementById('site-modal');
    if (!modal) return;
    const overlay = document.getElementById('site-modal-overlay');
    const closeBtn = document.getElementById('site-modal-close');
    const okBtn = document.getElementById('site-modal-ok');
    const titleEl = document.getElementById('site-modal-title');
    const msgEl = document.getElementById('site-modal-message');
    const iconEl = document.getElementById('site-modal-icon');

    titleEl.textContent = title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notice');
    msgEl.textContent = message;

    // Set icon (Font Awesome) based on type
    if (iconEl) {
      if (type === 'success') {
        iconEl.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      } else if (type === 'error') {
        iconEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
      } else {
        iconEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      }
    }

    modal.classList.remove('hidden', 'success', 'error', 'info');
    modal.classList.add(type);

    // show
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');

    function hide() {
      // clear pending auto-close timer if any
      if (modal._autoCloseTimer) {
        clearTimeout(modal._autoCloseTimer);
        modal._autoCloseTimer = null;
      }
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }

    // close handlers
    closeBtn.onclick = hide;
    okBtn.onclick = hide;
    overlay.onclick = hide;
  }

  function setFormEnabled(form, enabled) {
    form.querySelectorAll('input, textarea, button').forEach((element) => {
      element.disabled = !enabled;
    });
  }

  function isValidEmail(email) {
    // Basic email validation to ensure @ and domain exist
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const local = parts[0].trim();
    const domain = parts[1].trim();
    if (!local || !domain) return false;
    if (domain.indexOf('.') === -1) return false;
    // Prevent invalid characters and spaces
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

// Mobile Menu Functionality
const hamburger = document.getElementById("hamburger");
const menuOverlay = document.querySelector(".menu-overlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Menu open/close helpers with smooth close animation
const MENU_CLOSE_DURATION = 450; // ms (should match CSS transition)

function openMenu() {
  if (!menuOverlay) return;
  hamburger.classList.add('active');
  menuOverlay.classList.remove('closing');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!menuOverlay) return;
  // add closing class while keeping 'active' so CSS transition can run
  menuOverlay.classList.add('closing');
  hamburger.classList.remove('active');
  // after the transition duration, remove active and closing to fully hide
  setTimeout(() => {
    menuOverlay.classList.remove('active');
    menuOverlay.classList.remove('closing');
    document.body.style.overflow = '';
  }, MENU_CLOSE_DURATION + 20);
}

hamburger.addEventListener('click', () => {
  if (!menuOverlay) return;
  if (menuOverlay.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu with ESC key for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (menuOverlay && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  }
});

// Close menu when clicking nav links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Experience See More Toggle
const experienceToggle = document.getElementById("experience-toggle");
const experienceMore = document.querySelector(".experience-more");

if (experienceToggle && experienceMore) {
  experienceToggle.addEventListener("click", () => {
    experienceMore.classList.toggle("expanded");
    const expanded = experienceMore.classList.contains("expanded");
    experienceToggle.textContent = expanded ? "Show Less Experience" : "See More Experience";
  });
}

// Image Loading Optimization - Fade in images when loaded
function setupImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Check if image is already cached/loaded
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      // Wait for image to load
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
      // Fallback: add loaded class after timeout even if failed
      setTimeout(() => {
        img.classList.add('loaded');
      }, 3000);
    }
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', setupImageLoading);

// Also run after a short delay to catch dynamically added images
setTimeout(setupImageLoading, 500);

  