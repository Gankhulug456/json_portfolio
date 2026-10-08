// Shared smooth-scroll target (set by initSmoothScroll)
window.__smoothScrollTo = null;

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const topBarHeight = document.getElementById("top-bar")?.offsetHeight || 0;
  const navBarHeight = document.querySelector("nav")?.offsetHeight || 0;
  const headerHeight = topBarHeight + navBarHeight;
  const elY = el.getBoundingClientRect().top + window.pageYOffset;
  const scrollToY = Math.max(0, elY - headerHeight);
  if (typeof window.__smoothScrollTo === "function") {
    window.__smoothScrollTo(scrollToY);
  } else {
    window.scrollTo({ top: scrollToY, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches;
  if (reduceMotion || isTouch) return;

  document.documentElement.classList.add("has-smooth-scroll");

  let current = window.scrollY;
  let target = window.scrollY;
  let running = false;
  const ease = 0.075; // lower = slower / creamier
  const wheelScale = 0.42; // damp wheel speed

  const maxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  const clamp = (y) => Math.max(0, Math.min(y, maxScroll()));

  function tick() {
    const diff = target - current;
    if (Math.abs(diff) < 0.2) {
      current = target;
      window.scrollTo(0, current);
      running = false;
      return;
    }
    current += diff * ease;
    window.scrollTo(0, current);
    requestAnimationFrame(tick);
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  window.__smoothScrollTo = (y) => {
    target = clamp(y);
    start();
  };

  window.addEventListener(
    "wheel",
    (e) => {
      // Don't steal scroll inside project detail or active game
      if (document.body.classList.contains("detail-open")) return;
      if (e.target.closest?.(".game-embed.is-active")) return;

      e.preventDefault();
      target = clamp(target + e.deltaY * wheelScale);
      start();
    },
    { passive: false }
  );

  // Keep in sync if user drags scrollbar / uses keyboard
  let syncing = false;
  window.addEventListener("scroll", () => {
    if (running) return;
    if (syncing) return;
    current = window.scrollY;
    target = current;
  });

  window.addEventListener("keydown", (e) => {
    const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if (!keys.includes(e.key)) return;
    if (document.body.classList.contains("detail-open")) return;

    e.preventDefault();
    const page = window.innerHeight * 0.75;
    if (e.key === "ArrowDown" || e.key === " ") target = clamp(target + page * 0.35);
    if (e.key === "ArrowUp") target = clamp(target - page * 0.35);
    if (e.key === "PageDown") target = clamp(target + page * 0.55);
    if (e.key === "PageUp") target = clamp(target - page * 0.55);
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = maxScroll();
    start();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (hero) {
    const updateHeroScroll = () => {
      const fadeStart = window.innerHeight * 0.08;
      const scrolled = window.scrollY > fadeStart;
      hero.classList.toggle("is-scrolled", scrolled);
    };
    updateHeroScroll();
    window.addEventListener("scroll", updateHeroScroll, { passive: true });
  }

  const gameEmbed = document.getElementById("game-embed");
  const gameActivate = document.getElementById("game-activate");
  if (!gameEmbed || !gameActivate) return;

  gameActivate.addEventListener("click", () => {
    gameEmbed.classList.add("is-active");
  });

  // Deactivate when game leaves view so scroll isn't trapped again later
  const gameObs = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        gameEmbed.classList.remove("is-active");
      }
    },
    { threshold: 0.15 }
  );
  gameObs.observe(gameEmbed);
});

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal sections with a real entrance — wait until they're clearly in view
  document.querySelectorAll("section").forEach((sec) => {
    if (reduceMotion) {
      sec.classList.add("show");
      return;
    }
    // Hero + footer: always visible (hero is the first viewport)
    if (sec.id === "hero" || sec.id === "footer") {
      sec.classList.add("show");
      return;
    }
    const isChat = sec.classList.contains("chat-beat");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // slight beat so it feels timed, not "just scrolled into"
          requestAnimationFrame(() => {
            sec.classList.add("show");
          });
          obs.unobserve(sec);
        }
      },
      isChat
        ? { threshold: 0.4, rootMargin: "0px 0px -12% 0px" }
        : { threshold: 0.22, rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(sec);
  });

  // Animate timeline items once on scroll
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, i) => {
    if (reduceMotion) {
      item.classList.add("show");
      return;
    }
    const timelineObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => item.classList.add("show"), Math.min(i, 4) * 80);
          timelineObserver.unobserve(item);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
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
      detailOverlay.scrollTop = 0;

      const closeDetail = () => {
        detailOverlay.classList.remove("active");
        body.classList.remove("detail-open");
      };

      const newCloseBtn = detailContainer.querySelector(".close-btn");
      if (newCloseBtn) {
        newCloseBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeDetail();
        });
      }

      if (Array.isArray(proj.image) && proj.image.length > 1) {
        initCarousel(projectKey, proj.image.length);
      }

      detailOverlay.classList.add("active");
      body.classList.add("detail-open");
    });
  });

  const closeDetailOverlay = () => {
    detailOverlay.classList.remove("active");
    body.classList.remove("detail-open");
  };

  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay || e.target === detailOverlayWrapper) {
      closeDetailOverlay();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailOverlay.classList.contains("active")) {
      closeDetailOverlay();
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
