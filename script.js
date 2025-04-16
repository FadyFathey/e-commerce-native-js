document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // Mobile menu toggle functionality
  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });
});

// Slider functionality
const sliderContent = [
  {
    image: "imgs/slide-1.jpg",
    label: "SUMMER 2020",
    title: "NEW COLLECTION",
    description:
      "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
  },
  {
    image: "imgs/slide-2.jpg",
    label: "AUTUMN 2020",
    title: "COZY ESSENTIALS",
    description:
      "Discover comfortable styles perfect for the changing seasons.",
    buttonText: "SHOP NOW",
  },
  {
    image: "imgs/slide-3.jpg",
    label: "WINTER 2020",
    title: "HOLIDAY SPECIALS",
    description:
      "Elegant designs to help you stand out during the festive season.",
    buttonText: "EXPLORE",
  },
];

const heroImg = document.querySelector("#hero-img");
const heroLabel = document.querySelector(".hero-label");
const heroTitle = document.querySelector(".hero-title");
const heroDescription = document.querySelector(".hero-description");
const shopNowBtn = document.querySelector(".shop-now-btn");
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");
const indicators = document.querySelectorAll(".indicator");

let currentSlideIndex = 0;
let isAnimating = false;

let showHeroContent = () => {
  if (currentSlideIndex < 0) currentSlideIndex = sliderContent.length - 1;
  if (currentSlideIndex >= sliderContent.length) currentSlideIndex = 0;

  // Prevent rapid clicks during animation
  if (isAnimating) return;
  isAnimating = true;

  // Add animations
  const heroContent = document.querySelector(".hero-content");

  // First, fade out current content
  heroContent.classList.add("changing");
  heroImg.classList.add("fade-out");

  // After a short delay, update content and fade in
  setTimeout(() => {
    heroImg.src = sliderContent[currentSlideIndex].image;
    heroLabel.innerHTML = sliderContent[currentSlideIndex].label;
    heroTitle.innerHTML = sliderContent[currentSlideIndex].title;
    heroDescription.innerHTML = sliderContent[currentSlideIndex].description;
    shopNowBtn.innerHTML = `<span class="btn-text">${sliderContent[currentSlideIndex].buttonText}</span>`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlideIndex);
    });

    // Remove fade-out class to show new image
    heroImg.classList.remove("fade-out");

    // Small delay before showing content
    setTimeout(() => {
      heroContent.classList.remove("changing");
      isAnimating = false; // Animation complete
    }, 100);
  }, 400);
};

let nextHeroSectionContent = () => {
  if (!isAnimating) {
    currentSlideIndex += 1;
    showHeroContent();
  }
};

let pervHeroSectionContent = () => {
  if (!isAnimating) {
    currentSlideIndex -= 1;
    showHeroContent();
  }
};

let updateSliderContent = () => {
  nextArrow.addEventListener("click", nextHeroSectionContent);
  prevArrow.addEventListener("click", pervHeroSectionContent);

  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      if (!isAnimating) {
        currentSlideIndex = i;
        showHeroContent();
      }
    });
  });
};

// Auto-slide functionality
let autoSlideInterval;

const startAutoSlide = () => {
  stopAutoSlide(); // Clear any existing interval first
  autoSlideInterval = setInterval(nextHeroSectionContent, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
};

// Implement keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    pervHeroSectionContent();
  } else if (e.key === "ArrowRight") {
    nextHeroSectionContent();
  }
});

// Handle visibility change to pause autoplay when tab is inactive
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});

// Initialize slider
showHeroContent();
updateSliderContent();

// Start auto-sliding
startAutoSlide();

// Pause auto-sliding when user interacts with controls
prevArrow.addEventListener("mouseenter", stopAutoSlide);
nextArrow.addEventListener("mouseenter", stopAutoSlide);
indicators.forEach((dot) => {
  dot.addEventListener("mouseenter", stopAutoSlide);
});

// Resume auto-sliding when user is done
prevArrow.addEventListener("mouseleave", startAutoSlide);
nextArrow.addEventListener("mouseleave", startAutoSlide);
indicators.forEach((dot) => {
  dot.addEventListener("mouseleave", startAutoSlide);
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
const heroSection = document.querySelector(".hero-section");

heroSection.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  },
  false
);

heroSection.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoSlide();
  },
  false
);

const handleSwipe = () => {
  if (touchEndX < touchStartX - 50) {
    // Swipe left, go next
    nextHeroSectionContent();
  } else if (touchEndX > touchStartX + 50) {
    // Swipe right, go previous
    pervHeroSectionContent();
  }
};
