class Loader {
  constructor() {
    this.preloader = document.getElementById("loader");
    this.bg = document.getElementById("loading");
  }

  hide() {
    this.preloader.classList.add("hide-loader");
    this.bg.classList.add("hide-loader");
    setTimeout(() => {
      this.preloader.classList.add("loader-hidden");
      this.bg.classList.add("loader-hidden");
    }, 2500);
  }

  init() {
    window.onload = () => this.hide();
  }
}

class HorizontalSlider {
  constructor(sliderElement, leftButton, rightButton) {
    this.slider = sliderElement;
    this.leftButton = leftButton;
    this.rightButton = rightButton;

    this.leftButton.addEventListener("click", () => this.scrollLeft());
    this.rightButton.addEventListener("click", () => this.scrollRight());
  }

  scrollLeft() {
    this.slider.style.scrollBehavior = "smooth";
    this.slider.scrollLeft -= 360;

    if (this.slider.scrollLeft <= 0) {
      this.slider.scrollLeft = this.slider.scrollWidth - this.slider.clientWidth;
    }
  }

  scrollRight() {
    this.slider.style.scrollBehavior = "smooth";
    this.slider.scrollLeft += 360;

    if (
      this.slider.scrollLeft >=
      this.slider.scrollWidth - this.slider.clientWidth
    ) {
      this.slider.scrollLeft = 0;
    }
  }
}

class BurgerMenu {
  constructor() {
    this.burgerIcon = document.getElementById("burgerIcon");
    this.menuItems = document.getElementById("menuItems");

    this.burgerIcon.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    this.menuItems.classList.toggle("open");
    this.burgerIcon.classList.toggle("open");
  }
}


const loader = new Loader();
loader.init();

const horizontScroll = document.querySelector(".main__slider");
const leftbtn = document.getElementById("leftbtn");
const rightbtn = document.getElementById("rightbtn");

const slider = new HorizontalSlider(horizontScroll, leftbtn, rightbtn);
new BurgerMenu();