// DOM elements used by page state, galleries, navigation, and forms.
const page = document.querySelector(".page");
const heroTitle = document.querySelector(".hero-title");
const projectPreviews = document.querySelectorAll(".project-preview");
const scrollIndicator = document.querySelector(".scroll-indicator");
const detailView = document.querySelector(".project-detail");
const detailBackButton = document.querySelector(".detail-back");
const detailGallery = document.querySelector(".detail-gallery");
const detailTrack = document.querySelector(".detail-track");
const detailCopy = document.querySelector(".detail-copy");
const detailYear = document.querySelector(".detail-year");
const detailTitle = document.querySelector(".detail-title");
const detailDescription = document.querySelector(".detail-description");
const aboutView = document.querySelector(".about-view");
const contactView = document.querySelector(".contact-view");
const contactForm = document.querySelector(".contact-form");
const navLinks = document.querySelectorAll(".nav-link[data-nav-target]");

// Shared state for the home cover stack, detail carousel, and overlays.
const maxProjectStage = projectPreviews.length;
let projectStage = 0;
let detailIndex = 2;
let isDetailOpen = false;
let isAboutOpen = false;
let wheelLocked = false;
let touchStartY = 0;
let touchStartX = 0;
let detailItems = [];
let detailCards = [];
let detailActiveSlot = 0;
let activeDetailProject = "forget-me-nots";
let aboutAnimationTimer = 0;
let homeAnimationTimer = 0;
let isContactOpen = false;
let contactAnimationTimer = 0;
let detailAnimationTimer = 0;

// Fallback detail card sizes. Individual projects can override this layout.
const defaultDetailLayout = {
  "-2": { width: 214, height: 302 },
  "-1": { width: 214, height: 302 },
  "0": { width: 250, height: 353 },
  "1": { width: 214, height: 302 },
  "2": { width: 214, height: 302 },
};

// Project content and per-project layout controls.
// step matches the cover number on the home page.
// layout controls the gallery card size at each relative position.
const detailProjects = {
  "forget-me-nots": {
    step: 1,
    year: "2020",
    title: "FORGET ME NOTS",
    galleryGap: 98,
    galleryHeight: 440,
    copyTop: 535,
    description:
      "This project explores a system-driven approach to graphic design, where typography and form are treated as a unified visual language. Rather than creating a single composition, the design develops through repetition and variation within a structured framework. Bold shapes and simplified figures are arranged through a consistent grid, creating a rhythm across the composition. The contrast between color blocks and negative space enhances visual clarity while introducing playful interaction between forms. Through this approach, the work balances structure and expression, allowing a cohesive system to generate multiple visual outcomes.",
    images: [
      {
        src: "ikki-kobayashi-graphic-design-it.format-webp.width-2880_gMHzchcSeiztRgxx.webp",
        alt: "Colorful abstract print",
      },
      {
        src: "ikki-kobayashi-graphic-design-it.format-webp.width-2880_C61TojsVHhl3Hazy.webp",
        alt: "Forgotten anything poster",
      },
      {
        src: "ikki-kobayashi-graphic-design-it.format-webp.width-2880_q6osOtjPRMwyKiIt.webp",
        alt: "Forget Me Nots poster",
      },
      {
        src: "ikki-kobayashi-graphic-design-it.format-webp.width-2880_GsBbZJFJPAlfcO3u.webp",
        alt: "Smile smile smile poster",
      },
      {
        src: "ikki-kobayashi-graphic-design-it.format-webp.width-2880_R1S01WhLenziUMJo.webp",
        alt: "Pink typographic poster",
      },
    ],
    layout: {
      "-2": { width: 250, height: 353 },
      "-1": { width: 250, height: 353 },
      "0": { width: 292, height: 412 },
      "1": { width: 250, height: 353 },
      "2": { width: 250, height: 353 },
    },
  },
  "between-black-and-white": {
    step: 2,
    year: "2019",
    title: "BETWEEN BLACK AND WHITE",
    galleryGap: 98,
    galleryHeight: 440,
    copyTop: 515,
    description:
      "This series explores the visual relationship between black and white, using contrast as the primary design language. By reducing colour to its most essential elements, the work emphasizes form, structure, and spatial balance. Through the use of bold shapes and controlled compositions, each piece operates within a defined system while allowing subtle variations to emerge. The interaction between positive and negative space creates tension, guiding the viewer's attention across the layout. Rather than relying on decorative elements, the design focuses on clarity and reduction. This approach highlights how minimal visual components can generate strong, dynamic compositions while maintaining a cohesive identity across the series.",
    images: [
      {
        src: "截屏2026-03-19 下午2.50.35.png",
        alt: "Between Black and White poster variation one",
      },
      {
        src: "截屏2026-03-19 下午2.50.25.png",
        alt: "Between Black and White poster variation two",
      },
      {
        src: "截屏2026-03-19 下午2.48.40.png",
        alt: "Between Black and White main poster",
      },
      {
        src: "截屏2026-03-19 下午2.50.44.png",
        alt: "Between Black and White poster variation three",
      },
      {
        src: "截屏2026-03-19 下午2.51.03.png",
        alt: "Between Black and White poster variation four",
      },
    ],
    layout: {
      "-2": { width: 250, height: 353 },
      "-1": { width: 250, height: 353 },
      "0": { width: 292, height: 412 },
      "1": { width: 250, height: 353 },
      "2": { width: 250, height: 353 },
    },
  },
  "experimental-graphic-prints": {
    step: 3,
    year: "2017",
    title: "EXPERIMENTAL GRAPHIC PRINTS",
    galleryGap: 98,
    galleryHeight: 440,
    copyTop: 515,
    description:
      "This body of work explores typography as both a communicative and visual element. Rather than functioning solely as readable text, letterforms are manipulated, scaled, and repositioned to create dynamic compositions. Working within structured grid systems, the designs balance precision with experimentation. Variations in alignment, spacing, and proportion introduce rhythm and movement, allowing each composition to feel distinct while remaining part of a cohesive series. By pushing typography toward abstraction, the work challenges the boundary between text and image. This approach emphasizes how graphic design can transform language into a visual experience, where meaning is conveyed through both form and structure.",
    images: [
      {
        src: "59e07e3e7fa44cee400026cc.format-webp.width-2880_E7oG5EowYZAwPkJo.webp",
        alt: "Experimental Graphic Prints variation one",
      },
      {
        src: "59e07e3b7fa44c45b8003bca.format-webp.width-2880_N3AOUFCVDpLcP7Qq.webp",
        alt: "Experimental Graphic Prints variation two",
      },
      {
        src: "59e07e3a7fa44c45b8003bc9.format-webp.width-2880_ay1XG9z1q2JZvABV.webp",
        alt: "Experimental Graphic Prints main image",
      },
      {
        src: "59e07e3c7fa44c45b8003bcb.format-webp.width-2880_w5ENZGETpIERzbwg.webp",
        alt: "Experimental Graphic Prints variation three",
      },
      {
        src: "59e07efb7fa44c45b8003bcc.format-webp.width-2880_VvzkUZqOd75ErSNx.webp",
        alt: "Experimental Graphic Prints variation four",
      },
    ],
    layout: {
      "-2": { width: 291, height: 281 },
      "-1": { width: 376, height: 281 },
      "0": { width: 449, height: 336 },
      "1": { width: 290, height: 290 },
      "2": { width: 290, height: 290 },
    },
  },
};

// Keeps the detail carousel from moving past the first or last image.
function wrapDetailIndex(index) {
  if (detailItems.length === 0) {
    return 0;
  }

  return Math.max(0, Math.min(detailItems.length - 1, index));
}

// Turns gallery transitions off while opening/resizing so cards do not jump.
function setDetailTransitionEnabled(enabled) {
  if (!detailTrack) {
    return;
  }

  detailTrack.style.transition = enabled ? "" : "none";
  detailCards.forEach((card) => {
    card.style.transition = enabled ? "" : "none";
  });
}

// Rebuilds gallery cards whenever a project detail page opens.
function buildDetailLoop() {
  if (!detailTrack) {
    return;
  }

  const project = detailProjects[activeDetailProject];

  if (!project) {
    return;
  }

  detailItems = project.images.map((item, index) => ({
    index,
    src: item.src,
    alt: item.alt,
  }));

  if (detailItems.length === 0) {
    return;
  }

  detailTrack.innerHTML = detailItems
    .map(
      (item, slot) => `
        <article class="detail-card" data-slot="${slot}" data-item-index="${item.index}" aria-label="Gallery image ${item.index + 1}">
          <img class="detail-card__image" src="${item.src}" alt="${item.alt}" />
        </article>
      `
    )
    .join("");

  detailCards = Array.from(detailTrack.querySelectorAll(".detail-card"));
  detailIndex = 2;
  detailActiveSlot = 2;
}

// Writes the active project's year, title, description, and copy position.
function updateDetailCopy() {
  const project = detailProjects[activeDetailProject];

  if (!project || !detailYear || !detailTitle || !detailDescription) {
    return;
  }

  detailYear.textContent = project.year;
  detailTitle.textContent = project.title;
  detailTitle.classList.toggle("is-wide", activeDetailProject === "between-black-and-white");
  detailDescription.textContent = project.description;

  if (detailCopy) {
    detailCopy.style.top = project.copyTop ? `${project.copyTop}px` : "";
  }
}

// Moves the home page between the hero and the three project covers.
function updateProjectStage(nextStage) {
  projectStage = Math.max(0, Math.min(maxProjectStage, nextStage));

  if (!page) {
    return;
  }

  const heroOpacityMap = {
    0: "1",
    1: "0.25",
    2: "0.18",
    3: "0.12",
  };

  page.dataset.projectStage = String(projectStage);
  page.style.setProperty("--hero-opacity", heroOpacityMap[projectStage] || "0.12");

  projectPreviews.forEach((preview, index) => {
    const step = index + 1;
    const offset = step - projectStage;
    const opacity = offset === 0 ? "1" : "0";

    preview.style.setProperty("--offset", String(offset));
    preview.style.setProperty("--preview-opacity", opacity);
    preview.style.zIndex = String(10 + step);
  });
}

// Shows or hides the About overlay and replays its fade-in animation.
function setAboutOpen(nextState) {
  isAboutOpen = nextState;

  if (!page) {
    return;
  }

  page.classList.toggle("is-about-open", isAboutOpen);

  if (aboutView) {
    aboutView.setAttribute("aria-hidden", String(!isAboutOpen));

    if (aboutAnimationTimer) {
      window.clearTimeout(aboutAnimationTimer);
      aboutAnimationTimer = 0;
    }

    if (isAboutOpen) {
      aboutView.classList.remove("is-entering");
      void aboutView.offsetWidth;
      aboutView.classList.add("is-entering");
      aboutAnimationTimer = window.setTimeout(() => {
        aboutView.classList.remove("is-entering");
        aboutAnimationTimer = 0;
      }, 1100);
    } else {
      aboutView.classList.remove("is-entering");
    }
  }
}

// Shows or hides the Contact overlay and replays its fade-in animation.
function setContactOpen(nextState) {
  isContactOpen = nextState;

  if (!page) {
    return;
  }

  page.classList.toggle("is-contact-open", isContactOpen);

  if (contactView) {
    contactView.setAttribute("aria-hidden", String(!isContactOpen));

    if (contactAnimationTimer) {
      window.clearTimeout(contactAnimationTimer);
      contactAnimationTimer = 0;
    }

    if (isContactOpen) {
      contactView.classList.remove("is-entering");
      void contactView.offsetWidth;
      contactView.classList.add("is-entering");
      contactAnimationTimer = window.setTimeout(() => {
        contactView.classList.remove("is-entering");
        contactAnimationTimer = 0;
      }, 1100);
    } else {
      contactView.classList.remove("is-entering");
    }
  }
}

// Replays the home fade-in after returning to the main page.
function triggerHomeEntrance() {
  if (!page || isAboutOpen || isDetailOpen || isContactOpen) {
    return;
  }

  if (homeAnimationTimer) {
    window.clearTimeout(homeAnimationTimer);
    homeAnimationTimer = 0;
  }

  page.classList.remove("is-home-entering");
  void page.offsetWidth;
  page.classList.add("is-home-entering");

  homeAnimationTimer = window.setTimeout(() => {
    page.classList.remove("is-home-entering");
    homeAnimationTimer = 0;
  }, 1100);
}

// Opens About from any current page.
function openAbout() {
  if (isContactOpen) {
    setContactOpen(false);
  }

  setAboutOpen(true);
}

// Opens Contact from any current page.
function openContact() {
  if (isAboutOpen) {
    setAboutOpen(false);
  }

  setContactOpen(true);
}

// Shrinks the large home name only when needed to keep it on one line.
function fitTitleToSingleLine() {
  if (!heroTitle) {
    return;
  }

  const maxSize = 175;
  const minSize = 38;
  const horizontalPadding = window.innerWidth <= 540 ? 24 : 34;
  let size = maxSize;

  heroTitle.style.fontSize = `${size}px`;

  while (heroTitle.scrollWidth > window.innerWidth - horizontalPadding && size > minSize) {
    size -= 1;
    heroTitle.style.fontSize = `${size}px`;
  }
}

fitTitleToSingleLine();
window.addEventListener("resize", fitTitleToSingleLine);

// Applies active project gallery sizes and centers the selected card.
function updateDetailGallery(immediate = false) {
  if (!detailTrack || detailCards.length === 0 || detailItems.length === 0) {
    return;
  }

  const project = detailProjects[activeDetailProject];
  const layout = project?.layout || defaultDetailLayout;

  if (detailGallery) {
    detailGallery.style.height = project?.galleryHeight ? `${project.galleryHeight}px` : "";
  }

  detailTrack.style.setProperty("--detail-track-gap", `${project?.galleryGap || 74}px`);

  setDetailTransitionEnabled(!immediate);

  detailCards.forEach((card, index) => {
    const relativeOffset = index - detailActiveSlot;
    const layoutKey =
      relativeOffset <= -2 ? "-2" : relativeOffset >= 2 ? "2" : String(relativeOffset);
    const size = layout?.[layoutKey] || layout?.["0"] || { width: 250, height: 320 };
    const image = card.querySelector(".detail-card__image");

    // Experimental has mixed square and landscape images, so some cards keep
    // image-specific frame ratios instead of using only the slot ratio.
    const shouldUseSquareFrame =
      image?.alt === "Experimental Graphic Prints variation one" ||
      image?.alt === "Experimental Graphic Prints variation three" ||
      image?.alt === "Experimental Graphic Prints variation four";
    const shouldUseExperimentalLandscapeFrame =
      activeDetailProject === "experimental-graphic-prints" &&
      (image?.alt === "Experimental Graphic Prints variation two" ||
        image?.alt === "Experimental Graphic Prints main image");
    const cardWidth = shouldUseSquareFrame
      ? size.height
      : shouldUseExperimentalLandscapeFrame
      ? Math.round(size.height * 1.337)
      : size.width;

    card.classList.toggle("is-active", index === detailActiveSlot);
    card.style.setProperty("--detail-card-width", `${cardWidth}px`);
    card.style.setProperty("--detail-card-height", `${size.height}px`);
  });

  const activeCard = detailCards[detailActiveSlot];

  if (!activeCard) {
    return;
  }

  const trackWidth = detailTrack.offsetWidth;
  const activeCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
  const shift = trackWidth / 2 - activeCenter;

  detailTrack.style.setProperty("--detail-track-shift", `${shift}px`);
}

// Opens or closes the reusable project detail overlay.
function setDetailOpen(nextState, shouldTriggerHome = true) {
  const wasDetailOpen = isDetailOpen;
  isDetailOpen = nextState;

  if (!page) {
    return;
  }

  page.classList.toggle("is-detail-open", isDetailOpen);

  if (detailView) {
    detailView.setAttribute("aria-hidden", String(!isDetailOpen));

    if (detailAnimationTimer) {
      window.clearTimeout(detailAnimationTimer);
      detailAnimationTimer = 0;
    }
  }

  if (isDetailOpen) {
    updateDetailCopy();
    buildDetailLoop();
    detailIndex = 2;
    detailActiveSlot = 2;
    updateDetailGallery(true);

    if (detailView) {
      detailView.classList.remove("is-entering");
      void detailView.offsetWidth;
      detailView.classList.add("is-entering");
      detailAnimationTimer = window.setTimeout(() => {
        detailView.classList.remove("is-entering");
        detailAnimationTimer = 0;
      }, 1100);
    }
  } else if (wasDetailOpen && shouldTriggerHome && !isAboutOpen && !isContactOpen) {
    if (detailView) {
      detailView.classList.remove("is-entering");
    }

    triggerHomeEntrance();
  }
}

// PROJECT nav target: always returns to the first home screen.
function openProjectHome() {
  if (isContactOpen) {
    setContactOpen(false);
  }

  if (isAboutOpen) {
    setAboutOpen(false);
  }

  if (isDetailOpen) {
    setDetailOpen(false, false);
  }

  updateProjectStage(0);
  triggerHomeEntrance();
}

// Changes the active detail image.
function moveDetail(direction) {
  if (detailItems.length === 0) {
    return;
  }

  const nextIndex = wrapDetailIndex(detailIndex + direction);

  if (nextIndex === detailIndex) {
    return;
  }

  detailIndex = nextIndex;
  detailActiveSlot = detailIndex;
  updateDetailGallery();
}

// Calculates how far project covers need to travel off screen.
function updatePreviewTravel() {
  if (!page || projectPreviews.length === 0) {
    return;
  }

  const tallestPreview = Array.from(projectPreviews).reduce((maxHeight, preview) => {
    return Math.max(maxHeight, preview.offsetHeight);
  }, 0);

  const travel = window.innerHeight + tallestPreview + 140;
  page.style.setProperty("--preview-travel", `${travel}px`);
}

updatePreviewTravel();
window.addEventListener("resize", updatePreviewTravel);
window.addEventListener("resize", () => updateDetailGallery(true));
updateProjectStage(0);
updateDetailCopy();
buildDetailLoop();
updateDetailGallery(true);
triggerHomeEntrance();

// Handles vertical home navigation between project covers.
function handleDirectionalMove(direction) {
  if (isAboutOpen || isContactOpen) {
    return;
  }

  if (direction > 0 && projectStage < maxProjectStage) {
    updateProjectStage(projectStage + 1);
  } else if (direction < 0 && projectStage > 0) {
    updateProjectStage(projectStage - 1);
  }
}

// Detail pages support trackpad left/right and mouse wheel up/down.
function getDetailWheelDirection(event) {
  const horizontalDelta = event.deltaX;
  const verticalDelta = event.deltaY;
  const horizontalAmount = Math.abs(horizontalDelta);
  const verticalAmount = Math.abs(verticalDelta);

  if (horizontalAmount >= 8) {
    return horizontalDelta > 0 ? 1 : -1;
  }

  if (verticalAmount >= 28) {
    return verticalDelta > 0 ? 1 : -1;
  }

  return 0;
}

// Top navigation: PROJECT resets home, ABOUT opens About, CONTACT opens Contact.
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = link.getAttribute("data-nav-target");

    if (target === "about") {
      if (!isAboutOpen || isContactOpen) {
        openAbout();
      }

      return;
    }

    if (target === "contact") {
      if (!isContactOpen) {
        openContact();
      }

      return;
    }

    if (target === "project") {
      openProjectHome();
      return;
    }
  });
});

// Wheel input: home moves covers; detail pages move the gallery.
window.addEventListener(
  "wheel",
  (event) => {
    if (isAboutOpen || isContactOpen) {
      return;
    }

    if (isDetailOpen) {
      event.preventDefault();

      if (wheelLocked) {
        return;
      }

      const detailDirection = getDetailWheelDirection(event);

      if (detailDirection === 0) {
        return;
      }

      wheelLocked = true;
      moveDetail(detailDirection);

      window.setTimeout(() => {
        wheelLocked = false;
      }, 620);

      return;
    }

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 12 || wheelLocked) {
      return;
    }

    event.preventDefault();
    wheelLocked = true;
    handleDirectionalMove(event.deltaY);

    window.setTimeout(() => {
      wheelLocked = false;
    }, 520);
  },
  { passive: false }
);

// Project cover click opens the matching detail page only when that cover is active.
projectPreviews.forEach((preview) => {
  preview.addEventListener("click", () => {
    const detailKey = preview.getAttribute("data-open-detail");

    if (!detailKey) {
      return;
    }

    const project = detailProjects[detailKey];

    if (!project || projectStage !== project.step) {
      return;
    }

    activeDetailProject = detailKey;
    setDetailOpen(true);
  });
});

// Back button closes detail and returns to the project cover view.
if (detailBackButton) {
  detailBackButton.addEventListener("click", () => {
    setDetailOpen(false);
  });
}

// Bottom arrow advances through the three home covers.
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    if (isDetailOpen) {
      return;
    }

    if (projectStage < maxProjectStage) {
      updateProjectStage(projectStage + 1);
    }
  });
}

// Contact form is visual only, so prevent browser refresh.
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// Touch start coordinates for mobile swipe gestures.
window.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  },
  { passive: true }
);

// Mobile touch gestures: horizontal for details, vertical for home covers.
window.addEventListener(
  "touchend",
  (event) => {
    if (isAboutOpen || isContactOpen) {
      return;
    }

    const deltaX = touchStartX - event.changedTouches[0].clientX;
    const deltaY = touchStartY - event.changedTouches[0].clientY;

    if (isDetailOpen) {
      if (Math.abs(deltaX) < 30) {
        return;
      }

      moveDetail(deltaX > 0 ? 1 : -1);
      return;
    }

    if (Math.abs(deltaY) < 30) {
      return;
    }

    handleDirectionalMove(deltaY);
  },
  { passive: true }
);
