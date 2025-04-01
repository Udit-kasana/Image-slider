const leftbtn = document.querySelector(".left");
const rightbtn = document.querySelector(".right");
const slider = document.querySelector(".img-container");
const indicator = document.querySelector("#indicator");
let indicatorDots;

const totalSlides = document.querySelectorAll(".img-container img").length;
let currentIndex = 1;
const val = 100 / totalSlides;
let id;
let isSliding = false;

//creating indicator dots
function createIndicator() {
  //creating dots and appending to parent indicator container
  for (let i = 0; i < totalSlides; i++) {
    const div = document.createElement("div");
    div.classList.add("indicator-dot");
    indicator.appendChild(div);
  }

  //selecting indicator dots
  indicatorDots = document.querySelectorAll("#indicator div");
  indicatorDots[currentIndex].classList.add("active");

  //hiding first and last dot
  indicatorDots[0].style.display = "none";
  indicatorDots[totalSlides - 1].style.display = "none";

  //adding event listener to each dot
  indicatorDots.forEach((_, index) => {
    indicatorDots[index].addEventListener("click", () => {
      userInteracted();
      indicatorDots[currentIndex].classList.remove("active");
      currentIndex = index;
      updateSlider();
    });
  });
}

//indicator function call to create dots on load
createIndicator();

//function to create slide animation
function updateSlider() {
  userInteracted();

  //applying transition and transform next image
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(${currentIndex * -val}%)`;

  // to create a ifinite scroll animation
  setTimeout(() => {
    if (currentIndex === 0) {
      currentIndex = totalSlides - 2;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${currentIndex * -val}%)`;
    }
    if (currentIndex === totalSlides - 1) {
      currentIndex = 1;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${currentIndex * -val}%)`;
    }

    indicatorDots[currentIndex].classList.add("active");
  }, 500);
}

function nextSlide() {
  if (isSliding) return;
  isSliding = true;
  indicatorDots[currentIndex].classList.remove("active");
  currentIndex++;
  updateSlider();
  setTimeout(() => (isSliding = false), 700);
}

function prevSlide() {
  if (isSliding) return;
  isSliding = true;
  indicatorDots[currentIndex].classList.remove("active");
  currentIndex--;
  updateSlider();
  setTimeout(() => (isSliding = false), 700);
}

// Clears the auto slider interval when user interacts
function userInteracted() {
  clearInterval(id); // Stop auto-slide
  startAutoSlide(); // Restart after interaction
}

//auto slider function
function startAutoSlide() {
  id = setInterval(nextSlide, 3000);
}

// Button controls
rightbtn.addEventListener("click", () => {
  nextSlide();
});
leftbtn.addEventListener("click", () => {
  prevSlide();
});

// Auto-slide every 3 seconds
startAutoSlide();
