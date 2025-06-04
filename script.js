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
    card.addEventListener("click", () => {
      const projectKey = card.getAttribute("data-project");
      if (!projectKey) return;
      const proj = projects.find((p) => p.key === projectKey);
      if (!proj) return;
      let leftHTML = "";
      leftHTML += `<h1 class="detail-title">${proj.title}</h1>`;
      leftHTML += `<p class="detail-subtitle">${proj.subtitle}</p>`;
      leftHTML += `<div class="detail-meta">`;
      for (const [label, value] of Object.entries(proj.meta)) {
        leftHTML += `
          <div class="meta-row">
            <span class="meta-label">${label}</span>
            <span class="meta-value">${value}</span>
          </div>`;
      }
      leftHTML += `</div>`;

      proj.sections.forEach((sec) => {
        leftHTML += `<div class="detail-section">
                       <h2>${sec.heading}</h2>
                       <p>${sec.text.replace(/\n/g, "<br />")}</p>
                     </div>`;
      });

      let rightHTML = "";

      if (Array.isArray(proj.image)) {
        rightHTML += `<div class="image-gallery">`;
        proj.image.forEach((url) => {
          rightHTML += `<img src="${url}" alt="${proj.title} image" class="detail-image" />`;
        });
        rightHTML += `</div>`;
      } else {
        rightHTML = `<img src="${proj.image}" alt="${proj.title} Mockup" class="detail-image" />`;
      }
      overlayLeft.innerHTML = leftHTML;
      overlayRight.innerHTML = rightHTML;
      detailOverlay.classList.add("active");
      body.classList.add("detail-open");
    });
  });
  const closeBtn = detailOverlay.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    detailOverlay.classList.remove("active");
    body.classList.remove("detail-open");
  });

  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay || e.target === detailOverlayWrapper) {
      detailOverlay.classList.remove("active");
      body.classList.remove("detail-open");
    }
  });
});
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
