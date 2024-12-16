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

document
  .getElementById("open-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.add("open");
  });

document
  .getElementById("close-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.remove("open");
  });

// Сохранение в Local storage
document
  .getElementById("send-modal-btn")
  .addEventListener("click", function () {
    const telInput = document.querySelector(".modal__box_input_tel");
    const emailInput = document.querySelector(".modal__box_input_email");
    const textInput = document.querySelector(".modal__box_input_text");

    let info = {
      tel: telInput.value,
      email: emailInput.value,
      text: textInput.value,
    };

    if (!telInput.value || !emailInput.value || !textInput.value) {
      alert("Пожалуйста заполните все троки");
      return;
    }

    let pop = JSON.parse(localStorage.getItem("userInfo")) || [];

    pop.push(info);

    let infoString = JSON.stringify(pop);

    localStorage.setItem("userInfo", infoString);

    (telInput.value = ""),
      (emailInput.value = ""),
      (textInput.value = ""),
      document.getElementById("modal").classList.remove("open");
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
