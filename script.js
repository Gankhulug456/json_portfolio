function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Measure total height of your fixed top‐bar + nav
  const topBarHeight = document.getElementById("top-bar")?.offsetHeight || 0;
  const navBarHeight = document.querySelector("nav")?.offsetHeight || 0;
  const headerHeight = topBarHeight + navBarHeight;

  // Compute the section’s absolute Y position in the page
  const elY = el.getBoundingClientRect().top + window.pageYOffset;

  // Subtract headerHeight so the section sits just below your fixed bars
  const scrollToY = elY - headerHeight;

  // Do a single native smooth scroll to that position
  window.scrollTo({
    top: scrollToY,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Decide mobile vs. desktop threshold
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
});

// Make sure this runs after DOM loads:
document.addEventListener("DOMContentLoaded", () => {
  // 1) Grab references to key elements
  const cards = document.querySelectorAll(".project-card");
  const detailOverlay = document.getElementById("detail-overlay");
  const detailOverlayWrapper = document.getElementById(
    "detail-overlay-wrapper"
  );
  const overlayLeft = document.getElementById("overlay-left");
  const overlayRight = document.getElementById("overlay-right");
  const body = document.body;

  // 2) When a project card is clicked:
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectKey = card.getAttribute("data-project");
      if (!projectKey) return;

      // 3) Find the matching project data
      const proj = projects.find((p) => p.key === projectKey);
      if (!proj) return;

      // 4) Build HTML for the left column
      let leftHTML = "";
      leftHTML += `<h1 class="detail-title">${proj.title}</h1>`;
      leftHTML += `<p class="detail-subtitle">${proj.subtitle}</p>`;

      // Metadata grid (iterate over keys in proj.meta)
      leftHTML += `<div class="detail-meta">`;
      for (const [label, value] of Object.entries(proj.meta)) {
        leftHTML += `
          <div class="meta-row">
            <span class="meta-label">${label}</span>
            <span class="meta-value">${value}</span>
          </div>`;
      }
      leftHTML += `</div>`;

      // Sections (Problem, Solution, or custom headings)
      proj.sections.forEach((sec) => {
        leftHTML += `<div class="detail-section">
                       <h2>${sec.heading}</h2>
                       <p>${sec.text.replace(/\n/g, "<br />")}</p>
                     </div>`;
      });

      // 5) Build HTML for the right column (images)
      let rightHTML = "";

      if (Array.isArray(proj.image)) {
        // If proj.image is an array, render each URL
        rightHTML += `<div class="image-gallery">`;
        proj.image.forEach((url) => {
          rightHTML += `<img src="${url}" alt="${proj.title} image" class="detail-image" />`;
        });
        rightHTML += `</div>`;
      } else {
        // Single-string case (fallback)
        rightHTML = `<img src="${proj.image}" alt="${proj.title} Mockup" class="detail-image" />`;
      }
      // 6) Inject into the overlay containers
      overlayLeft.innerHTML = leftHTML;
      overlayRight.innerHTML = rightHTML;

      // 7) Show the overlay & disable background scroll
      detailOverlay.classList.add("active");
      body.classList.add("detail-open");
    });
  });

  // 8) Close button logic
  const closeBtn = detailOverlay.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    detailOverlay.classList.remove("active");
    body.classList.remove("detail-open");
  });

  // 9) Close when clicking outside the detail‐card (on the blurred backdrop)
  detailOverlay.addEventListener("click", (e) => {
    // if the click target is the overlay (not a child element), close it
    if (e.target === detailOverlay || e.target === detailOverlayWrapper) {
      detailOverlay.classList.remove("active");
      body.classList.remove("detail-open");
    }
  });
});
// Helper: waits “delay” ms of no new resize events before running fn
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
    // Initial build (same as before)…
    buildTicker();

    // Replace the direct resize listener with a debounced one:
    window.addEventListener(
      "resize",
      debounce(() => {
        buildTicker();
        // Reset “x” so we don’t jump outside the new range
        if (x <= -singleSetWidth) {
          x += singleSetWidth;
        }
      }, 200)
    ); // wait 200 ms after the last resize event
  });

  let x = 0;
  let singleSetWidth = 0;

  function buildTicker() {
    // 1) Clear out old items
    wrapper.innerHTML = "";
    // 2) Re-measure widths
    const containerWidth = wrapper.parentElement.offsetWidth;

    // Temporarily add one copy in order to measure its width
    const temp = originalItem.cloneNode(true);
    wrapper.appendChild(temp);
    const itemWidth = temp.offsetWidth;
    wrapper.innerHTML = ""; // remove that temp measurement

    // 3) Compute how many we need to fill +1
    const copiesNeeded = Math.ceil(containerWidth / itemWidth) + 1;

    // 4) Rebuild “one set” + clone it
    for (let i = 0; i < copiesNeeded; i++) {
      wrapper.appendChild(originalItem.cloneNode(true));
    }
    const oneBlockHTML = wrapper.innerHTML;
    wrapper.innerHTML += oneBlockHTML;

    // 5) Update singleSetWidth & wrapper width
    singleSetWidth = itemWidth * copiesNeeded;
    wrapper.style.width = singleSetWidth * 2 + "px";
  }

  const speed = 0.5; // px/frame
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
  const lines = document.querySelectorAll(".line"); // each .line contains one .line-wrapper
  const data = []; // will hold { el: wrapperEl, halfWidth, x, dir }

  document.fonts.ready.then(() => {
    lines.forEach((lineEl, index) => {
      const wrapperEl = lineEl.querySelector(".line-wrapper");
      const span = wrapperEl.querySelector(".line-item");
      const rawText = span.textContent.trim();

      // 1) Measure one span's width
      const singleWidth = span.offsetWidth;
      const containerWidth = lineEl.offsetWidth;

      // 2) Compute how many copies are needed so that one block > containerWidth
      const copiesNeeded = Math.ceil(containerWidth / singleWidth) + 1;

      // 3) Rebuild wrapperHTML with copiesNeeded spans (one block),
      //    then duplicate that block so wrapper has exactly 2 blocks back-to-back.
      wrapperEl.textContent = "";
      for (let i = 0; i < copiesNeeded; i++) {
        const s = document.createElement("span");
        s.className = "line-item";
        s.textContent = rawText;
        wrapperEl.appendChild(s);
      }
      const oneBlockHTML = wrapperEl.innerHTML;
      wrapperEl.innerHTML += oneBlockHTML; // now 2 blocks

      // 4) Measure totalWidth and halfWidth
      const totalWidth = wrapperEl.offsetWidth;
      const halfWidth = totalWidth / 2;

      // 5) Force the wrapper to be exactly totalWidth
      wrapperEl.style.width = totalWidth + "px";

      // 6) Decide direction: even-index (0,2,4) → move left; odd (1,3,5) → move right
      const dir = index % 2 === 0 ? -1 : +1;

      // 7) Initialize x: left-moving starts at 0, right-moving starts at -halfWidth
      const initialX = dir === -1 ? 0 : -halfWidth;

      data.push({
        el: wrapperEl,
        halfWidth: halfWidth,
        x: initialX,
        dir: dir,
      });
    });

    const speed = 0.2; // px per frame (adjust slower for “smoother” look)

    function animateAll() {
      data.forEach((info) => {
        // 8) Advance x
        info.x += info.dir * speed;

        // 9) Wrap
        if (info.dir === -1 && info.x <= -info.halfWidth) {
          // left-moving: once x <= -halfWidth, jump back to 0
          info.x = 0;
        }
        if (info.dir === 1 && info.x >= 0) {
          // right-moving: once x >= 0, jump back to -halfWidth
          info.x = -info.halfWidth;
        }

        // 10) Apply transform
        info.el.style.transform = `translateX(${info.x}px)`;
      });

      requestAnimationFrame(animateAll);
    }
    animateAll();
  });
});

// JS: toggle the “flipped” class on the .flip-card when clickeddocument.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
