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


class UserDisplay {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.user = null;
  }

  fetchUser() {
    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.user = data;
        this.makeCard();
        this.createSlider();
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }

  makeCard() {
    const card = document.getElementById("userDetails");
    if (!this.user) return;

    const li = document.createElement("li");
    li.classList.add("main__card");
    const wrap = document.createElement("div");
    wrap.classList.add("main__card1_textWrap");
    li.appendChild(wrap);

    const title = document.createElement("p");
    title.classList.add("main__card1_textWrap_title");
    title.textContent = this.user.title;
    wrap.appendChild(title);

    const text = document.createElement("p");
    text.textContent = this.user.textCard;
    text.classList.add("main__card1_textWrap_text");
    wrap.appendChild(text);

    const allImg = document.createElement("div");
    allImg.id = "allImg";
    li.appendChild(allImg);

    const imgWrap = document.createElement("div");
    imgWrap.classList.add("main__imgWrap");
    allImg.appendChild(imgWrap);

    const imgWrap2 = document.createElement("div");
    imgWrap2.classList.add("main__imgWrap2");
    allImg.appendChild(imgWrap2);

    const image = document.createElement("img");
    image.src = this.user.img;
    image.alt = this.user.title;
    image.classList.add("main__card1_img");
    imgWrap.appendChild(image);

    const image2 = document.createElement("img");
    image2.src = this.user.img2;
    image2.alt = this.user.title;
    image2.classList.add("main__card1_img2");
    imgWrap2.appendChild(image2);

    const image3 = document.createElement("img");
    image3.src = this.user.img3;
    image3.alt = this.user.title;
    image3.classList.add("main__card1_img3");
    imgWrap2.appendChild(image3);

    const mapWrap = document.createElement("div");
    mapWrap.classList.add("main__mapWrap");
    li.appendChild(mapWrap);

    const map = document.createElement("iframe");
    map.src = this.user.map;
    map.width = "800";
    map.height = "450";
    map.style = "border:0;border-radius: 10px;";
    map.allowFullscreen = "";
    map.loading = "lazy";
    map.referrerPolicy = "no-referrer-when-downgrade";
    mapWrap.appendChild(map);

    card.appendChild(li);

    const sliderScreen = document.getElementById("slider_screen");
    image.addEventListener("click", () => {
      sliderScreen.style.display = "block";
      this.createSlider();
    });
    image2.addEventListener("click", () => {
      sliderScreen.style.display = "block";
      this.createSlider();
    });
    image3.addEventListener("click", () => {
      sliderScreen.style.display = "block";
      this.createSlider();
    });

    const close = document.getElementById("closeSlider");
    close.addEventListener("click", () => {
      sliderScreen.style.display = "none";
    });
  }

  createSlider() {
    const sliderImg = document.getElementById("sliderImg");
    if (!this.user) return;

    const images = [this.user.img, this.user.img2, this.user.img3];
    sliderImg.innerHTML = "";

    images.forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      sliderImg.appendChild(img);
    });

    let currentIndex = 0;
    const slideWidth = document.querySelector(".slider-container").offsetWidth;

    function showSlide(index) {
      sliderImg.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showSlide(currentIndex);
    }

    document.querySelector(".slider__btn-next").addEventListener("click", nextSlide);
    document.querySelector(".slider__btn-prev").addEventListener("click", prevSlide);
  }
}


class ReviewsManager {
  constructor(reviewsUrl) {
    this.reviewsUrl = reviewsUrl;
  }

  fetchReviews() {
    fetch(this.reviewsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((tasks) => {
        this.displayReviews(tasks);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }

  addReview(review) {
    fetch(this.reviewsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((task) => {
        console.log("Review added:", task);
        this.fetchReviews();
      })
      .catch((error) => {
        console.error("Add Review Error:", error);
      });
  }

  deleteReview(id) {
    fetch(`${this.reviewsUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        console.log("Review deleted");
        this.fetchReviews();
      })
      .catch((error) => {
        console.error("Delete Review Error:", error);
      });
  }

  displayReviews(tasks) {
    const rewWrap = document.getElementById("rewWrap");
    rewWrap.innerHTML = "";

    tasks.forEach((task) => {
      const box = document.createElement("div");
      box.classList.add("reviews_box");

      const wrapBox = document.createElement("div");
      wrapBox.classList.add("reviews_wrapBox");
      const wrapBox2 = document.createElement("div");
      wrapBox2.classList.add("reviews_wrapBox2");
      const wrapBox3 = document.createElement("div");
      wrapBox3.classList.add("reviews_wrapBox3");

      const login = document.createElement("p");
      login.textContent = task.login;
      login.classList.add("reviews_login");

      const rare = document.createElement("p");
      rare.textContent = `Оценка: ${task.rare}/10`;
      rare.classList.add("reviews_rare");

      const text = document.createElement("p");
      text.textContent = `Отзыв: ${task.text}`;
      text.classList.add("reviews_text");

      const del = document.createElement("button");
      del.textContent = "Удалить";
      del.classList.add("reviews_del");
      del.addEventListener("click", () => this.deleteReview(task.id));

      wrapBox.appendChild(login);
      wrapBox2.appendChild(rare);
      wrapBox2.appendChild(text);
      wrapBox3.appendChild(del);

      box.appendChild(wrapBox);
      box.appendChild(wrapBox2);
      box.appendChild(wrapBox3);
      rewWrap.appendChild(box);
    });
  }
}

class Modal {
  constructor(reviewsManager) {
    this.reviewsManager = reviewsManager;
    this.modal = document.getElementById("modal");
    this.openBtn = document.getElementById("open-modal-btn");
    this.closeBtn = document.getElementById("close-modal-btn");
    this.sendBtn = document.getElementById("send-modal-btn");

    this.openBtn.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.sendBtn.addEventListener("click", () => this.sendReview());
  }

  open() {
    this.modal.classList.add("open");
  }

  close() {
    this.modal.classList.remove("open");
  }

  sendReview() {
    const loginInput = document.getElementById("login");
    const rareInput = document.getElementById("rare");
    const textInput = document.getElementById("text");

    if (
      loginInput.value.trim() === "" ||
      rareInput.value.trim() === "" ||
      textInput.value.trim() === "" ||
      rareInput.value < 0 ||
      rareInput.value > 10
    ) {
      alert("Проверьте заполнение всех строк или поле рейтинга");
      return;
    }

    const newReview = {
      login: loginInput.value,
      rare: rareInput.value,
      text: textInput.value,
    };

    this.reviewsManager.addReview(newReview);

    loginInput.value = "";
    rareInput.value = "";
    textInput.value = "";

    this.close();
  }
}

class BurgerMenu {
  constructor() {
    this.burgerIcon = document.getElementById("burgerIcon");
    this.menuItems = document.getElementById("menuItems");

    this.burgerIcon.addEventListener("click", () => {
      this.menuItems.classList.toggle("open");
      this.burgerIcon.classList.toggle("open");
    });
  }
}

const loader = new Loader();
loader.init();

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const apiUrl = `https://672caf7e1600dda5a9f97a34.mockapi.io/user/${userId}`;
const reviewsUrl = `${apiUrl}/reviews`;

const userDisplay = new UserDisplay(apiUrl);
userDisplay.fetchUser();

const reviewsManager = new ReviewsManager(reviewsUrl);
reviewsManager.fetchReviews();

new Modal(reviewsManager);
new BurgerMenu();