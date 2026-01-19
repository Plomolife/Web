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
});
