document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica para el Menú Móvil (Hamburguesa) ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-center");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("nav-menu_visible");
    });
  }

  // --- Lógica para la Galería Modal ---
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-current-image");
  const gridThumbnails = document.querySelectorAll(".grid-thumbnail");
  const modalThumbnails = document.querySelectorAll(".modal-thumbnail");
  const closeModalButton = document.querySelector(".modal-close-button");

  gridThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      modalImage.src = this.src;
      modal.classList.add("active");
      updateActiveModalThumbnail(this.src);
    });
  });

  modalThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      modalImage.src = this.src;
      updateActiveModalThumbnail(this.src);
    });
  });

  function closeModal() {
    modal.classList.remove("active");
  }

  closeModalButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function updateActiveModalThumbnail(src) {
    modalThumbnails.forEach((thumb) => {
      if (thumb.src === src) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  }
  const textoAnimadoElement = document.getElementById("texto-animado");
  if (textoAnimadoElement) {
    const textoOriginal = textoAnimadoElement.innerHTML;
    textoAnimadoElement.innerHTML = ""; // Limpia el párrafo
    let i = 0;
    const typingSpeed = 20;

    function typeWriter() {
      if (i < textoOriginal.length) {
        textoAnimadoElement.innerHTML += textoOriginal.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }
    setTimeout(typeWriter, 500); // Inicia después de medio segundo
  }

  const snowContainer = document.querySelector(".snow-container");

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 1.25;
  const pauseWhenNotActive = true;
  const maxSnowflakes = 200;
  const snowflakes = [];

  let snowflakeInterval;
  let isTabActive = true;

  function resetSnowflake(snowflake) {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
    const viewportHeight = window.innerHeight;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
    snowflake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationTimingFunction = "linear";
    snowflake.style.animationName =
      Math.random() < 0.5 ? "fall" : "diagonal-fall";

    setTimeout(() => {
      if (parseInt(snowflake.style.top, 10) < viewportHeight) {
        resetSnowflake(snowflake);
      } else {
        snowflake.remove(); // Remove when it goes off the bottom edge
      }
    }, animationDuration * 1000);
  }

  function createSnowflake() {
    if (snowflakes.length < maxSnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflakes.push(snowflake);
      snowContainer.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  }

  function generateSnowflakes() {
    const numberOfParticles =
      Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
      particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    clearInterval(snowflakeInterval);
    snowflakeInterval = setInterval(() => {
      if (isTabActive && snowflakes.length < maxSnowflakes) {
        requestAnimationFrame(createSnowflake);
      }
    }, interval);
  }

  function handleVisibilityChange() {
    if (!pauseWhenNotActive) return;

    isTabActive = !document.hidden;
    if (isTabActive) {
      generateSnowflakes();
    } else {
      clearInterval(snowflakeInterval);
    }
  }

  generateSnowflakes();

  window.addEventListener("resize", () => {
    clearInterval(snowflakeInterval);
    setTimeout(generateSnowflakes, 1000);
  });

  document.addEventListener("visibilitychange", handleVisibilityChange);
});
