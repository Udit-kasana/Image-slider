const slides = document.querySelector(".img-container");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const indicator = document.querySelector("#indicator");

// array of dynamically added images
const images = [
  "./images/1.jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
  "./images/5.jpg",
  "./images/6.jpg",
  "./images/7.jpg",
  "./images/8.jpg",
  "./images/9.jpg",
];

let cur = images.length - 1;
let interval;
let isSliding = false;

//creating indicator
function createIndicator() {
  indicator.innerHTML = "";

  // creating indicator dots
  const dots = images.map((_, index) => {
    const div = document.createElement("div");
    div.classList.add("dot");
    div.dataset.index = index;
    div.addEventListener("click", () => {
      let direction = index > cur ? "next" : "prev";
      slideImage(direction, index);
      resetAutoSlide();
    });
    return div;
  });

  // adding indicator dots to indicator container
  dots.forEach((div) => indicator.append(div));

  //adding active class to first slide
  document.querySelectorAll(".dot")[0].classList.add("active");
}

// slider function with 2 images to perform slider animation
function slideImage(direction, second = -1) {
  if (isSliding) return;

  // disables spamming for smooth animation
  isSliding = true;

  let prev = cur;
  // updating current index with default values
  cur =
    second !== -1
      ? second
      : direction === "next"
      ? (cur + 1) % images.length
      : (cur - 1 + images.length) % images.length;

  if (prev === cur) {
    isSliding = false;
    return;
  }
  // adding active class
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === cur);
  });

  // loading prev image to slide to left or right
  const prevImgs = document.createElement("img");
  prevImgs.src = images[prev];
  prevImgs.classList.add(
    "slide-image",
    direction === "next" ? "slide-left" : "slide-right"
  );

  //loading current image to slide from left or right
  const curImg = document.createElement("img");
  curImg.src = images[cur];
  curImg.classList.add(
    "slide-image",
    direction === "next" ? "slide-left-new" : "slide-right-new"
  );

  slides.innerHTML = "";

  slides.appendChild(prevImgs);
  slides.appendChild(curImg);

  setTimeout(() => {
    prevImgs.remove();
    isSliding = false;
  }, 800);
}

//normal slide
createIndicator();
slideImage("next");

//auto slider
function startAutoSlide() {
  interval = setInterval(() => {
    slideImage("next");
  }, 3000);
}
startAutoSlide();

// to make interval start from 0 when user interacts;
function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

//left right btn
rightBtn.addEventListener("click", () => {
  slideImage("next");
  resetAutoSlide();
});
leftBtn.addEventListener("click", () => {
  slideImage("prev");
  resetAutoSlide();
});
