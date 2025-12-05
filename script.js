function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const topBarHeight = document.getElementById("top-bar")?.offsetHeight || 0;
  const navBarHeight = document.querySelector("nav")?.offsetHeight || 0;
  const headerHeight = topBarHeight + navBarHeight;
  const elY = el.getBoundingClientRect().top + window.pageYOffset;
  const scrollToY = elY - headerHeight;
  window.scrollTo({
    top: scrollToY,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const threshold = isMobile ? 0.2 : 0.5;
  document.querySelectorAll("section").forEach((sec) => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        sec.classList.toggle("show", entry.isIntersecting);
      },
      { threshold: threshold }
    );
    obs.observe(sec);
  });

  // Animate timeline items on scroll
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 150); // Stagger animation
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const detailOverlay = document.getElementById("detail-overlay");
  const detailOverlayWrapper = document.getElementById(
    "detail-overlay-wrapper"
  );
  const overlayLeft = document.getElementById("overlay-left");
  const overlayRight = document.getElementById("overlay-right");
  const body = document.body;

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projectKey = card.getAttribute("data-project");
      if (!projectKey) {
        console.warn("No project key found for card:", card);
        return;
      }
      const proj = projects.find((p) => p.key === projectKey);
      if (!proj) {
        console.warn("Project not found for key:", projectKey);
        return;
      }
      
      const detailContainer = detailOverlayWrapper.querySelector(".detail-container");
      if (!detailContainer) {
        console.error("Detail container not found");
        return;
      }
      
      // Build complete HTML structure
      let fullHTML = "";
      
      // Close button
      fullHTML += `<button class="close-btn">
                     <img src="assets_mac/icons8-macos-minimize-60.png" alt="Close" />
                   </button>`;
      
      // Header section
      fullHTML += `<div class="detail-header">`;
      fullHTML += `<h1 class="detail-title">${proj.title}</h1>`;
      fullHTML += `<p class="detail-subtitle">${proj.subtitle}</p>`;
      fullHTML += `<div class="detail-meta">`;
      for (const [label, value] of Object.entries(proj.meta)) {
        fullHTML += `
          <div class="meta-row">
            <span class="meta-label">${label}</span>
            <span class="meta-value">${value}</span>
          </div>`;
      }
      fullHTML += `</div>`;
      fullHTML += `</div>`;

      // Content wrapper
      fullHTML += `<div class="detail-content-wrapper">`;
      
      // Left column - Content
      fullHTML += `<div class="detail-left">`;
      proj.sections.forEach((sec) => {
        fullHTML += `<div class="detail-section">
                       <h2>${sec.heading}</h2>
                       <p>${sec.text.replace(/\n/g, "<br />")}</p>
                     </div>`;
      });
      fullHTML += `</div>`;

      // Right column - Images
      fullHTML += `<div class="detail-right">`;
      if (Array.isArray(proj.image)) {
        fullHTML += `<div class="image-carousel-container">`;
        fullHTML += `<div class="image-carousel" data-carousel-id="${projectKey}">`;
        proj.image.forEach((url, index) => {
          fullHTML += `<div class="carousel-slide ${index === 0 ? 'active' : ''}" data-slide-index="${index}">`;
          fullHTML += `<img src="${url}" alt="${proj.title} image ${index + 1}" class="detail-image" />`;
          fullHTML += `</div>`;
        });
        fullHTML += `</div>`;
        if (proj.image.length > 1) {
          fullHTML += `<button class="carousel-btn carousel-prev" aria-label="Previous image">‹</button>`;
          fullHTML += `<button class="carousel-btn carousel-next" aria-label="Next image">›</button>`;
          fullHTML += `<div class="carousel-dots-container">`;
          fullHTML += `<div class="carousel-dots">`;
          proj.image.forEach((_, index) => {
            fullHTML += `<button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide-index="${index}" aria-label="Go to image ${index + 1}"></button>`;
          });
          fullHTML += `</div>`;
          fullHTML += `</div>`;
        }
        fullHTML += `</div>`;
      } else {
        fullHTML += `<img src="${proj.image}" alt="${proj.title} Mockup" class="detail-image" />`;
      }
      fullHTML += `</div>`;
      fullHTML += `</div>`;
      
      // Replace entire container content
      detailContainer.innerHTML = fullHTML;
      
      // Re-attach close button event listener
      const newCloseBtn = detailContainer.querySelector(".close-btn");
      if (newCloseBtn) {
        newCloseBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          detailOverlay.classList.remove("active");
          body.classList.remove("detail-open");
        }, { once: false });
      }
      
      // Initialize carousel if it exists
      if (Array.isArray(proj.image) && proj.image.length > 1) {
        initCarousel(projectKey, proj.image.length);
      }
      
      detailOverlay.classList.add("active");
      body.classList.add("detail-open");
    });
  });
  
  // Handle overlay background click to close
  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay || e.target === detailOverlayWrapper) {
      detailOverlay.classList.remove("active");
      body.classList.remove("detail-open");
    }
  });
});

// Carousel functionality
function initCarousel(carouselId, totalSlides) {
  const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
  if (!carousel) return;
  
  let currentSlide = 0;
  const slides = carousel.querySelectorAll('.carousel-slide');
  const container = carousel.closest('.image-carousel-container');
  const dots = container ? container.querySelectorAll('.carousel-dot') : [];
  const prevBtn = container ? container.querySelector('.carousel-prev') : null;
  const nextBtn = container ? container.querySelector('.carousel-next') : null;
  
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Keyboard navigation
  carousel.parentElement.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
}
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".ticker-wrapper");
  const originalItem = wrapper.querySelector(".ticker-item");

  document.fonts.ready.then(() => {
    buildTicker();
    window.addEventListener(
      "resize",
      debounce(() => {
        buildTicker();
        if (x <= -singleSetWidth) {
          x += singleSetWidth;
        }
      }, 200)
    );
  });

  let x = 0;
  let singleSetWidth = 0;

  function buildTicker() {
    wrapper.innerHTML = "";
    const containerWidth = wrapper.parentElement.offsetWidth;
    const temp = originalItem.cloneNode(true);
    wrapper.appendChild(temp);
    const itemWidth = temp.offsetWidth;
    wrapper.innerHTML = "";
    const copiesNeeded = Math.ceil(containerWidth / itemWidth) + 1;
    for (let i = 0; i < copiesNeeded; i++) {
      wrapper.appendChild(originalItem.cloneNode(true));
    }
    const oneBlockHTML = wrapper.innerHTML;
    wrapper.innerHTML += oneBlockHTML;

    singleSetWidth = itemWidth * copiesNeeded;
    wrapper.style.width = singleSetWidth * 2 + "px";
  }

  const speed = 0.5;
  function animateTicker() {
    x -= speed;
    if (x <= -singleSetWidth) {
      x += singleSetWidth;
    }
    wrapper.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animateTicker);
  }
  animateTicker();
});

document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".line");
  const data = [];

  document.fonts.ready.then(() => {
    lines.forEach((lineEl, index) => {
      const wrapperEl = lineEl.querySelector(".line-wrapper");
      const span = wrapperEl.querySelector(".line-item");
      const rawText = span.textContent.trim();
      const singleWidth = span.offsetWidth;
      const containerWidth = lineEl.offsetWidth;
      const copiesNeeded = Math.ceil(containerWidth / singleWidth) + 1;
      wrapperEl.textContent = "";
      for (let i = 0; i < copiesNeeded; i++) {
        const s = document.createElement("span");
        s.className = "line-item";
        s.textContent = rawText;
        wrapperEl.appendChild(s);
      }
      const oneBlockHTML = wrapperEl.innerHTML;
      wrapperEl.innerHTML += oneBlockHTML;
      const totalWidth = wrapperEl.offsetWidth;
      const halfWidth = totalWidth / 2;
      wrapperEl.style.width = totalWidth + "px";
      const dir = index % 2 === 0 ? -1 : +1;
      const initialX = dir === -1 ? 0 : -halfWidth;

      data.push({
        el: wrapperEl,
        halfWidth: halfWidth,
        x: initialX,
        dir: dir,
      });
    });

    const speed = 0.2;

    function animateAll() {
      data.forEach((info) => {
        info.x += info.dir * speed;
        if (info.dir === -1 && info.x <= -info.halfWidth) {
          info.x = 0;
        }
        if (info.dir === 1 && info.x >= 0) {
          info.x = -info.halfWidth;
        }

        info.el.style.transform = `translateX(${info.x}px)`;
      });

      requestAnimationFrame(animateAll);
    }
    animateAll();
  });
});

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
