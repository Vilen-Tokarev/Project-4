let horizontScroll = document.querySelector(".main__slider");
let leftbtn = document.getElementById("leftbtn");
let rightbtn = document.getElementById("rightbtn");

window.onload = function () {
  let preloader = document.getElementById("loader");
  let bg = document.getElementById("loading");
  preloader.classList.add("hide-loader");
  bg.classList.add("hide-loader");
  setTimeout(function () {
    preloader.classList.add("loader-hidden");
    bg.classList.add("loader-hidden");
  }, 2500);
};

// Слайдер
rightbtn.addEventListener("click", () => {
  horizontScroll.style.scrollBehavior = "smooth";
  horizontScroll.scrollLeft += 360;

  // Проверка, если слайдер дошел до конца
  if (
    horizontScroll.scrollLeft >=
    horizontScroll.scrollWidth - horizontScroll.clientWidth
  ) {
    horizontScroll.scrollLeft = 0;
  }
});

leftbtn.addEventListener("click", () => {
  horizontScroll.style.scrollBehavior = "smooth";
  horizontScroll.scrollLeft -= 360;

  // Проверка если слайдер дошел до начала
  if (horizontScroll.scrollLeft <= 0) {
    horizontScroll.scrollLeft =
      horizontScroll.scrollWidth - horizontScroll.clientWidth;
  }
});

document.getElementById("burgerIcon").addEventListener("click", function () {
  const menuItems = document.getElementById("menuItems");
  const burgerIcon = document.getElementById("burgerIcon");

  if (menuItems.classList.contains("open")) {
    menuItems.classList.remove("open");
    burgerIcon.classList.remove("open");
  } else {
    menuItems.classList.add("open");
    burgerIcon.classList.add("open");
  }
});
