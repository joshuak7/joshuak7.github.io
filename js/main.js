/* =========================================================
   main.js — Portfolio Interactivity (Clean Build)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. FADE-IN ON SCROLL (single observer, used site-wide)
  ------------------------------------------------------- */
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // stop watching once shown
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  }

  /* -------------------------------------------------------
     2. FAQ ACCORDION
  ------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all open items first
      faqItems.forEach((other) => other.classList.remove("active"));

      // If it wasn't active, open it
      if (!isActive) item.classList.add("active");
    });
  });

  /* -------------------------------------------------------
     3. SMOOTH SCROLL FOR ANCHOR LINKS
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  /* -------------------------------------------------------
     4. CONTACT FORM — FORMSPREE SUBMISSION
  ------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (formStatus) {
        formStatus.textContent = "Sending…";
        formStatus.className = "";
      }

      try {
        const res = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          if (formStatus) {
            formStatus.textContent = "✅ Message sent successfully! I'll be in touch soon.";
            formStatus.classList.add("success");
          }
          contactForm.reset();
        } else {
          if (formStatus) {
            formStatus.textContent = "⚠️ Something went wrong. Please try again.";
            formStatus.classList.add("error");
          }
        }
      } catch {
        if (formStatus) {
          formStatus.textContent = "❌ Network error. Please check your connection.";
          formStatus.classList.add("error");
        }
      }
    });
  }

  /* -------------------------------------------------------
     5. PROJECT SLIDERS (translateX approach)
        HTML required:
        <div class="project-slider">
          <div class="slides">
            <img src="..."> <img src="...">
          </div>
          <button class="prev">&#8249;</button>
          <button class="next">&#8250;</button>
        </div>
  ------------------------------------------------------- */
  document.querySelectorAll(".project-slider").forEach((slider) => {
    const slidesWrapper = slider.querySelector(".slides");
    if (!slidesWrapper) return;

    const images = slidesWrapper.querySelectorAll("img");
    if (images.length < 2) return; // no need to slide if only one image

    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    let index = 0;

    const goTo = (n) => {
      index = (n + images.length) % images.length;
      slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
    };

    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));

    // Auto-advance every 4 seconds, pause on hover, restart on leave
    let autoSlide = setInterval(() => goTo(index + 1), 4000);
    slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => goTo(index + 1), 4000);
    });
  });

  /* -------------------------------------------------------
     6. PROFILE IMAGE ROTATION (hero section)
        Requires: <img id="profileSlide" src="images/profile1.jpg">
  ------------------------------------------------------- */
  const profileSlide = document.getElementById("profileSlide");
  if (profileSlide) {
    const images = ["images/profile1.jpg", "images/profile2.jpg"];
    let current = 0;
    setInterval(() => {
      current = (current + 1) % images.length;
      profileSlide.src = images[current];
    }, 5000);
  }

  /* -------------------------------------------------------
     7. FLOATING WHATSAPP BUTTON — show after scrolling 100px
        Requires: <a class="floating-whatsapp ...">
        Add to CSS: .floating-whatsapp { opacity:0; pointer-events:none; transition:opacity .3s; }
                    .floating-whatsapp.show { opacity:1; pointer-events:auto; }
  ------------------------------------------------------- */
  const whatsappBtn = document.querySelector(".floating-whatsapp, .whatsapp-float");
  if (whatsappBtn) {
    const toggleWhatsapp = () => {
      whatsappBtn.classList.toggle("show", window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleWhatsapp, { passive: true });
    toggleWhatsapp(); // run once on load in case page is already scrolled
  }

});
