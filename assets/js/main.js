(() => {
  "use strict";

  const header = document.querySelector("#mainHeader");
  const menuButton = document.querySelector("#menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const setMenu = (isOpen) => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
    document.body.classList.toggle("menu-open", isOpen);
  };

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenu?.classList.contains("open") &&
      !mobileMenu.contains(event.target) &&
      !menuButton?.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenu(false);
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Keep every page on the same release when navigating this static site.
  document.querySelectorAll("a[href]").forEach((link) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref || !rawHref.match(/\.html(?:\?|$)/)) return;
    const target = new URL(rawHref, window.location.href);
    if (target.origin !== window.location.origin) return;
    target.searchParams.set("build", "20260921-6");
    link.href = target.href;
  });

  // Purposeful scroll reveals inspired by Apple's progressive storytelling.
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealSelectors = [
      ".hero-copy",
      ".stat-grid",
      ".page-hero .container",
      ".section-heading",
      ".card",
      ".value-card",
      ".industry-card",
      ".insight-panel",
      ".split-grid > :not(.insight-panel)",
      ".wide-callout",
      ".case-layout > *",
      ".contact-grid > *",
    ];
    const revealElements = [
      ...new Set(document.querySelectorAll(revealSelectors.join(","))),
    ];

    revealElements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
      if (
        element.matches(
          ".case-layout > :first-child, .contact-grid > :first-child",
        )
      )
        element.classList.add("reveal-left");
      if (
        element.matches(
          ".case-layout > :last-child, .contact-grid > :last-child",
        )
      )
        element.classList.add("reveal-right");
    });

    document.documentElement.classList.add("motion-enabled");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    revealElements.forEach((element) => observer.observe(element));
  }

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const scrollTopButton = document.createElement("button");
  scrollTopButton.className = "scroll-top";
  scrollTopButton.type = "button";
  scrollTopButton.setAttribute("aria-label", "Back to top");
  scrollTopButton.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 15 6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  scrollTopButton.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }),
  );
  document.body.append(scrollTopButton);

  const heroVisual = document.querySelector(".hero-visual");
  let scrollFrame = 0;
  const updateScrollEffects = () => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    progress.style.setProperty(
      "--scroll-progress",
      String(Math.min(window.scrollY / maxScroll, 1)),
    );
    scrollTopButton.classList.toggle(
      "visible",
      window.scrollY > Math.max(window.innerHeight * 0.7, 520),
    );
    header?.classList.toggle("scrolled", window.scrollY > 16);
    if (heroVisual && !reducedMotion) {
      heroVisual.style.setProperty(
        "--hero-shift",
        `${Math.min(window.scrollY * 0.065, 52)}px`,
      );
    }
    scrollFrame = 0;
  };

  const requestScrollUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  updateScrollEffects();

  const contactForm = document.querySelector("#messageForm");
  if (contactForm) {
    const service = new URLSearchParams(window.location.search).get("service");
    const subject = contactForm.querySelector("#subject");
    if (service && subject) subject.value = `Service enquiry: ${service}`;

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const emailSubject = String(
        formData.get("subject") || "Website enquiry",
      ).trim();
      const message = String(formData.get("message") || "").trim();
      const endpoint = contactForm.dataset.emailEndpoint;
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonContent = submitButton?.innerHTML;

      let status = contactForm.querySelector(".form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("role", "status");
        contactForm.append(status);
      }

      status.classList.remove("error");
      status.textContent = "Sending your message…";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending…";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _replyto: email,
            subject: emailSubject,
            _subject: "New website enquiry — Dataviz Global",
            message,
            _template: "basic",
            _honey: String(formData.get("_honey") || ""),
            source: window.location.href,
          }),
        });
        const result = await response.json();
        if (
          !response.ok ||
          result.success === false ||
          result.success === "false"
        ) {
          throw new Error(result.message || "Unable to send the message.");
        }

        status.textContent = "Message submitted.";
        contactForm.reset();
      } catch {
        status.classList.add("error");
        status.textContent =
          "We could not send your message. Please email info@datavizglobal.in directly and try again later.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonContent;
        }
      }
    });
  }
})();
