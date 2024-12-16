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

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const apiUrl = `https://672caf7e1600dda5a9f97a34.mockapi.io/user/${userId}`;


class displayUser {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.user = null;
  }

  async fetchUser() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      this.user = await response.json();
      this.makeCard();
      console.log(this.user);
    } catch (error) {
      console.error("Ошибка получения данных", error);
    }
  }
  makeCard() {
    const card = document.getElementById("userDetails");

    if (this.user) {
      const li = document.createElement("li");
      li.classList.add("main__card");
      const wrap = document.createElement("div");
      wrap.classList.add("main__card1_textWrap");
      li.appendChild(wrap);

      let title = document.createElement("p");
      title.classList.add("main__card1_textWrap_title");
      title.textContent = this.user.title;
      wrap.appendChild(title);

      let text = document.createElement("p");
      text.textContent = this.user.textCard;
      text.classList.add("main__card1_textWrap_text");
      wrap.appendChild(text);

      let imgWrap = document.createElement("div");
      imgWrap.classList.add("main__imgWrap");
      li.appendChild(imgWrap);

      let image = document.createElement("img");
      image.src = this.user.img;
      image.alt = this.user.title;
      image.classList.add("main__card1_img");
      imgWrap.appendChild(image);

      let image2 = document.createElement("img");
      image2.src = this.user.img2;
      image2.alt = this.user.title;
      image2.classList.add("main__card1_img2");
      imgWrap.appendChild(image2);

      let mapWrap = document.createElement("div");
      mapWrap.classList.add("main__mapWrap");
      li.appendChild(mapWrap);

      let map = document.createElement("iframe");
      map.src = this.user.map;
      map.width = "800";
      map.height = "450";
      map.style = "border:0;border-radius: 10px;";
      map.allowFullscreen = "";
      map.loading = "lazy";
      map.referrerPolicy = "no-referrer-when-downgrade";
      mapWrap.appendChild(map);

      card.appendChild(li);
    }
  }

}

const userDisplay = new displayUser(apiUrl);
userDisplay.fetchUser();

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

// Отзывы

const loginInput = document.getElementById('login');
const rareInput = document.getElementById('rare');
const textInput = document.getElementById('text');
const sentBtn = document.getElementById('send-modal-btn');


// Создать
const newReviews = {
  reviews_login: loginInput.value,
  reviews_rare: rareInput.value,
  reviews_text: textInput.value,
};


sentBtn.addEventListener('click', () => {
  setReviews(newReviews);
  console.log('нажал');
  
})


 

function setReviews(reviews) {
  fetch(apiUrl, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(reviews)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(task => {
    console.log(task);
    console.log('успешно');
  }).catch(error => {
    console.error(error);
  })
}


function reviews() {
  const rewWrap = document.getElementById("rewWrap");
  rewWrap.innerHTML = "";

  const reviewsText = JSON.parse(localStorage.getItem("reviewsText")) || [];

  reviewsText.forEach((review) => {
    let box = document.createElement("div");
    box.classList.add("reviews_box");

    let wrapBox = document.createElement("div");
    wrapBox.classList.add("reviews_wrapBox");
    let wrapBox2 = document.createElement("div");
    wrapBox2.classList.add("reviews_wrapBox2");

    let login = document.createElement("p");
    login.textContent = review.login;
    login.classList.add("reviews_login");

    let rare = document.createElement("p");
    rare.textContent = "Оценка: " + review.rare + "/10";
    rare.classList.add("reviews_rare");

    let sight = document.createElement("p");
    sight.textContent = review.sight;
    sight.classList.add("reviews_sight");

    let text = document.createElement("p");
    text.textContent = "Отзыв: " + review.text;
    text.classList.add("reviews_text");

    wrapBox.appendChild(login);
    wrapBox.appendChild(sight);
    wrapBox2.appendChild(rare);
    wrapBox2.appendChild(text);

    box.appendChild(wrapBox);
    box.appendChild(wrapBox2);

    rewWrap.appendChild(box);
  });
}

document.addEventListener("DOMContentLoaded", reviews);



