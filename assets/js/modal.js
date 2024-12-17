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

class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.openBtn = document.getElementById("open-modal-btn");
    this.closeBtn = document.getElementById("close-modal-btn");
    this.sendBtn = document.getElementById("send-modal-btn");

    this.telInput = document.querySelector(".modal__box_input_tel");
    this.emailInput = document.querySelector(".modal__box_input_email");
    this.textInput = document.querySelector(".modal__box_input_text");

    this.openBtn.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.sendBtn.addEventListener("click", () => this.saveData());
  }

  open() {
    this.modal.classList.add("open");
  }

  close() {
    this.modal.classList.remove("open");
  }

  saveData() {
    const tel = this.telInput.value.trim();
    const email = this.emailInput.value.trim();
    const text = this.textInput.value.trim();

    if (!tel || !email || !text) {
      alert("Пожалуйста, заполните все строки");
      return;
    }

    const info = {
      tel,
      email,
      text,
    };

    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
    userInfo.push(info);

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    this.telInput.value = "";
    this.emailInput.value = "";
    this.textInput.value = "";

    this.close();
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

const modal = new Modal();
new BurgerMenu();