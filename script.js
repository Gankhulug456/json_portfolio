let pageTitleElement;
let outputGridElement;
let projectDisplayElement;
let textIntroElement;
let textDisplayElement;
let titleDisplayElement;

let projectCollection = [
  {
    itemTitle: "WEB: Polymaker Panchroma Color Picker",
    category: "web",
    id: "color_picker",
    description:
      "For the 3D printing filament showcase, this color picker allows the user to choose a color from the color circle, and the appropriate picture will be displayed.",
    image: "assets/picker.png",
  },
  {
    itemTitle: "WEB: Polymaker Fiberon Material Comparison Graph",
    category: "web",
    id: "fiberon_graph",
    description:
      "This interactive graph highlights different types of 3D filament materials and their properties, helping customers choose the best one to buy. It features an option picker and a range of properties, all with smooth transitions.",
    image: "assets/graph.png",
  },
  {
    itemTitle: "WEB: Polymaker Fiberon Material Comparison Table",
    category: "web",
    id: "fiberon_table",
    description:
      "This interactive table, combined with a graph, presents detailed numerical data for the professional use of 3D printing filaments.",
    image: "assets/table.png",
  },
  {
    itemTitle: "SPARK AR: Reflection",
    category: "ar",
    id: "reflection",
    description:
      "This project features a liquid-like smooth transition, made possible by the render pass feature in Spark AR. It creates a delayed, trail-like shape derived from person segmentation, making it a fun experience to try.",
    image: "assets/reflection.png",
  },
  {
    itemTitle: "SPARK AR: LOOP",
    category: "ar",
    id: "loop",
    description:
      "This face filter features smooth animations on the user's face, while applying custom-made LUT presets to add color effects to the entire camera frame.",
    image: "assets/loop.png",
  },
];
document.addEventListener("DOMContentLoaded", function () {
  pageTitleElement = document.getElementById("pageTitle");
  outputGridElement = document.getElementById("outputGrid");
  projectDisplayElement = document.getElementById("projectDisplay");
  textIntroElement = document.getElementById("text-container");
  textDisplayElement = document.getElementById("text-intro");

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let urlSection = urlParams.get("section");
  let urlID = urlParams.get("id");

  // Hide projectDisplay initially
  projectDisplayElement.style.display = "none";
  pageTitleElement.style.display = "none";

  if (urlSection != "item") {
    // Show project previews
    if (urlSection == "code") {
      pageTitleElement.innerText = "Code Projects:";
    } else if (urlSection == "art") {
      pageTitleElement.innerText = "Art Projects:";
    }

    for (let i = 0; i < projectCollection.length; i++) {
      if (
        projectCollection[i]["category"] == urlSection ||
        urlSection == "" ||
        urlSection == null
      ) {
        createProjectPreview(projectCollection[i]);
      }
    }
  } else {
    // Show the project display when viewing a specific project
    for (let i = 0; i < projectCollection.length; i++) {
      if (projectCollection[i]["id"] == urlID) {
        createProjectPage(projectCollection[i]);
        projectDisplayElement.style.display = "block";
        pageTitleElement.style.display = "block";
      }
    }
  }
  if (projectDisplayElement.style.display == "block") {
    textIntroElement.style.display = "none";
    textDisplayElement.style.display = "none";
  }
});

function createProjectPreview(incomingJSON) {
  let newPreviewElement = document.createElement("LI");
  newPreviewElement.classList.add("glide__slide");

  let newPreviewLink = document.createElement("A");
  newPreviewLink.href = "index.html?section=item&id=" + incomingJSON["id"];

  let newPreviewTitle = document.createElement("P");
  newPreviewTitle.classList.add("previewTitle");
  newPreviewTitle.innerText = incomingJSON["itemTitle"];

  let newPreviewThumbnail = document.createElement("IMG");
  newPreviewThumbnail.classList.add("thumbnail");
  newPreviewThumbnail.src = incomingJSON["image"];

  newPreviewLink.appendChild(newPreviewThumbnail);
  newPreviewLink.appendChild(newPreviewTitle);
  newPreviewElement.appendChild(newPreviewLink);
}

function createProjectPage(incomingJSON) {
  pageTitleElement.innerText = incomingJSON["itemTitle"];

  let newProjectElement = document.createElement("DIV");

  let newProjectImage = document.createElement("IMG");
  newProjectImage.classList.add("projectHeroImage");
  newProjectImage.src = incomingJSON["image"];
  newProjectElement.appendChild(newProjectImage);

  let newProjectDescription = document.createElement("P");
  newProjectDescription.classList.add("description");
  newProjectDescription.innerText = incomingJSON["description"];
  newProjectElement.appendChild(newProjectDescription);

  projectDisplayElement.appendChild(newProjectElement);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", function () {
  const webCarouselContainer = document.getElementById("webCarouselContainer");
  const arCarouselContainer = document.getElementById("arCarouselContainer");

  if (!webCarouselContainer || !arCarouselContainer) {
    console.error("Carousel containers not found. Check your HTML structure.");
    return;
  }

  function createProjectPreview(project, container) {
    if (!container) {
      console.error("Target container is null for project:", project);
      return;
    }

    let newPreviewElement = document.createElement("LI");
    newPreviewElement.classList.add("glide__slide");

    let newPreviewLink = document.createElement("A");
    newPreviewLink.href = `index.html?section=item&id=${project.id}`;

    let newPreviewTitle = document.createElement("P");
    newPreviewTitle.classList.add("previewTitle");
    newPreviewTitle.innerText = project.itemTitle;

    let newPreviewThumbnail = document.createElement("IMG");
    newPreviewThumbnail.classList.add("thumbnail");
    newPreviewThumbnail.src = project.image;

    newPreviewLink.appendChild(newPreviewThumbnail);
    newPreviewLink.appendChild(newPreviewTitle);
    newPreviewElement.appendChild(newPreviewLink);
    container.appendChild(newPreviewElement);
  }

  projectCollection.forEach((project) => {
    if (project.category === "web") {
      createProjectPreview(project, webCarouselContainer);
    } else if (project.category === "ar") {
      createProjectPreview(project, arCarouselContainer);
    }
  });

  if (
    document.querySelector("#webGlide") &&
    webCarouselContainer.children.length > 0
  ) {
    new Glide("#webGlide", {
      type: "carousel",
      startAt: 0,
      perView: 3,
      gap: 20,
      autoplay: 5000,
      hoverpause: true,
      breakpoints: {
        768: { perView: 1 },
        1024: { perView: 2 },
      },
    }).mount();
  } else {
    console.error("Web Glide instance not found or no projects to display");
  }

  if (
    document.querySelector("#arGlide") &&
    arCarouselContainer.children.length > 0
  ) {
    new Glide("#arGlide", {
      type: "carousel",
      startAt: 0,
      perView: 3,
      gap: 20,
      autoplay: 5000,
      hoverpause: true,
      breakpoints: {
        768: { perView: 1 },
        1024: { perView: 2 },
      },
    }).mount();
  } else {
    console.error("AR Glide instance not found or no projects to display");
  }
});
