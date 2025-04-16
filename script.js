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

let showHeroContent = () => {
  if (currentSlideIndex < 0) currentSlideIndex = sliderContent.length - 1;
  if (currentSlideIndex >= sliderContent.length) currentSlideIndex = 0;

  heroImg.src = sliderContent[currentSlideIndex].image;
  heroLabel.innerHTML = sliderContent[currentSlideIndex].label;
  heroTitle.innerHTML = sliderContent[currentSlideIndex].title;
  heroDescription.innerHTML = sliderContent[currentSlideIndex].description;
  shopNowBtn.innerHTML = sliderContent[currentSlideIndex].buttonText;

  indicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlideIndex);
  });
};

let nextHeroSectionContent = () => {
  currentSlideIndex += 1;
  showHeroContent();
};

let pervHeroSectionContent = () => {
  currentSlideIndex -= 1;
  showHeroContent();
};

let updateSliderContent = () => {
  nextArrow.addEventListener("click", nextHeroSectionContent);
  prevArrow.addEventListener("click", pervHeroSectionContent);

  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlideIndex = i;
      showHeroContent();
    });
  });
};

// render first time
showHeroContent();
updateSliderContent();
