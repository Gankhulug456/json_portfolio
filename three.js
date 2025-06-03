import * as THREE from "three";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/postprocessing/RenderPass.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.getElementById("canvas-container");
container.appendChild(renderer.domElement);

const listener = new THREE.AudioListener();
camera.add(listener);

// Load the audio file
const audioLoader = new THREE.AudioLoader();
const chopstickAudio = []; // To store audio for each chopstick

audioLoader.load("glitter.mp3", function (buffer) {
  for (let i = 0; i < 20; i++) {
    // Create an audio object for each chopstick
    const audio = new THREE.Audio(listener);
    audio.setBuffer(buffer);
    audio.setVolume(1); // Set the volume of the audio for each chopstick
    // audio.playbackRate = 0.99;
    chopstickAudio.push(audio); // Store it in the array
  }
});

const chopsticks = [];
const chopstickCount = 20;
const geometry = new THREE.BoxGeometry(0.2, 5, 0.2);

// Bloom effect setup
const bloomStrength = 0.8;
const bloomRadius = 0.3;
const bloomThreshold = 0.1;

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  bloomStrength,
  bloomRadius,
  bloomThreshold
);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(bloomPass);

for (let i = 0; i < chopstickCount; i++) {
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    emissive: new THREE.Color(1, 0, 0),
    emissiveIntensity: 0.1,
    blending: THREE.AdditiveBlending,
  });

  const chopstick = new THREE.Mesh(geometry, material);
  chopstick.position.set(-5 + i * 0.5 + 0.3, 0, 0);
  chopstick.currentRotation = 0;
  chopstick.targetRotation = 0;
  chopstick.baseColor = new THREE.Color(0xffffff);
  scene.add(chopstick);
  chopsticks.push(chopstick);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Replace this:
window.addEventListener("mousemove", onMouseMove);

// With something like:
const canvas = renderer.domElement;
canvas.addEventListener("mousemove", onMouseMove);

function onMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  // Compute normalized device coordinates relative to the canvas rectangle:
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(chopsticks);
  const affectedChopsticks = new Set(
    intersects.map((intersect) => intersect.object)
  );

  const time = Date.now() * 0.001;

  chopsticks.forEach((chopstick, index) => {
    if (affectedChopsticks.has(chopstick)) {
      chopstick.targetRotation = Math.sin(time) * 0.5;
      const hue = (time * 0.5) % 1;
      chopstick.material.color.setHSL(hue, 1, 0.5);

      if (chopstick.material.emissive) {
        chopstick.material.emissive.setHSL(hue, 1, 0.5); // Change neon glow color
      }

      // Stop the audio and play it again for this specific chopstick
      if (chopstickAudio[index].isPlaying) {
        chopstickAudio[index].stop(); // Stop the audio if already playing
      }
      chopstickAudio[index].play(); // Play audio again

      console.log(`Audio is playing for chopstick ${index}`);
    } else {
      chopstick.targetRotation *= 0.95;
      chopstick.material.color.lerp(chopstick.baseColor, 0.01);

      if (chopstick.material.emissive) {
        chopstick.material.emissive.set(0, 0, 0);
      }
    }
  });

  chopsticks.forEach((chopstick) => {
    chopstick.currentRotation +=
      (chopstick.targetRotation - chopstick.currentRotation) * 0.08;
    chopstick.rotation.z = chopstick.currentRotation;
  });

  composer.render();
}

animate();

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const aboutCards = document.querySelectorAll(".flip-card");
  const hoverProj = document.getElementById("hover-cursor");
  const hoverAbout = document.getElementById("hover-cursor2");

  // Helper to attach hover behavior to a set of cards & a particular cursor
  function attachHover(cards, cursorElement) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        cursorElement.classList.add("visible");
      });
      card.addEventListener("mousemove", (e) => {
        cursorElement.style.left = e.clientX + "px";
        cursorElement.style.top = e.clientY + "px";
      });
      card.addEventListener("mouseleave", () => {
        cursorElement.classList.remove("visible");
      });
    });
  }

  // If we’re on a screen narrower than 768px (or touch‐enabled), skip hover.
  const isMobile =
    window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;

  if (!isMobile) {
    // Attach only on desktop/tablet
    attachHover(projectCards, hoverProj);
    attachHover(aboutCards, hoverAbout);
  }
});
