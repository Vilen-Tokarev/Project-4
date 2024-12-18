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


class UserManager {
  constructor(apiUrl, itemsPerPage) {
    this.apiUrl = apiUrl;
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.currentQuery = "";
    this.currentCategory = "all";
    this.currentSortBy = "";
    this.currentOrder = "asc";
    this.allUsers = [];
  }

  fetchUsers(query = "", category = "all", sortBy = "", order = "asc") {
    const url = new URL(this.apiUrl);
    url.searchParams.set('page', this.currentPage);
    url.searchParams.set('limit', this.itemsPerPage);

    if (query) url.searchParams.append("title", query);
    if (category !== "all") url.searchParams.set('filter', category);
    if (sortBy) {
      url.searchParams.set('sortBy', sortBy);
      url.searchParams.set('order', order);
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        this.displayUsers(data);
        this.updateButtons();
      })
      .catch((error) => console.error("Fetch Error:", error));
  }

  displayUsers(data) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    data.forEach((user) => {
      const card = new UserCard(user);
      userList.appendChild(card.render());
    });

    userList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const userData = JSON.parse(a.dataset.user);
        window.location.href = `cards.html?id=${userData.id}`;
      });
    });
  }

  updatePage(page, itemsPerPage) {
    this.currentPage = page;
    this.itemsPerPage = itemsPerPage
    this.fetchUsers(this.currentQuery, this.currentCategory, this.currentSortBy, this.currentOrder);
  }

  updateButtons() {
    document.getElementById("prevPage").disabled = this.currentPage === 1;
    document.getElementById("nextPage").disabled = this.currentPage === 5;
    document.getElementById("num").textContent = this.currentPage;
  }

  more() {
    document.getElementById("more").addEventListener("click", () => {
      if (this.currentPage === 5) {
        document.getElementById("more").disabled;
        return;
      }
      userManager.itemsPerPage += 10;
      userManager.fetchUsers();
    });
  }

  resetParams() {
    this.currentQuery = "";
    this.currentCategory = "all";
    this.currentSortBy = "";
    this.currentOrder = "asc";
    this.fetchUsers();
  }
}


class UserCard {
  constructor(user) {
    this.user = user;
  }

  render() {
    const a = document.createElement("a");
    a.href = "./cards.html";
    a.dataset.user = JSON.stringify(this.user);

    const li = document.createElement("li");
    li.classList.add("main__card1");
    const wrap = document.createElement("div");
    wrap.classList.add("main__card1_textWrap");

    a.appendChild(li);
    li.appendChild(wrap);

    const title = document.createElement("p");
    title.classList.add("main__card1_textWrap_title");
    title.textContent = this.user.title;
    wrap.appendChild(title);

    const text = document.createElement("p");
    text.textContent = this.user.text;
    text.classList.add("main__card1_textWrap_text");
    wrap.appendChild(text);

    const image = document.createElement("img");
    image.src = this.user.img;
    image.alt = this.user.title;
    image.classList.add("main__card1_img");
    li.appendChild(image);

    return a;
  }
}


class Pagination {
  constructor(userManager) {
    this.userManager = userManager;
    this.prevButton = document.getElementById("prevPage");
    this.nextButton = document.getElementById("nextPage");

    this.prevButton.addEventListener("click", () => {
      this.userManager.updatePage(this.userManager.currentPage - 1, 10)
    });
    this.nextButton.addEventListener("click", () => {
      this.userManager.updatePage(this.userManager.currentPage + 1, 10)
    });
  }
}


class Search {
  constructor(userManager) {
    this.userManager = userManager;
    this.searchInput = document.getElementById("searchInput");
    this.searchInput.addEventListener("input", debounce(() => {
      const query = this.searchInput.value.trim();
      this.userManager.currentQuery = query;
      this.userManager.fetchUsers(query);
    }, 700));
  }
}


class Filters {
  constructor(userManager) {
    this.userManager = userManager;
    document.querySelector(".search__filter-buttons").addEventListener("change", (event) => {
      this.userManager.currentCategory = event.target.value;
      this.userManager.fetchUsers(this.userManager.currentQuery, event.target.value);
    });
  }
}


class Sort {
  constructor(userManager) {
    this.userManager = userManager;
    document.getElementById("sort").addEventListener("change", (event) => {
      this.userManager.currentSortBy = event.target.value;
      this.userManager.fetchUsers(this.userManager.currentQuery, this.userManager.currentCategory, event.target.value);
    });
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


class Reset {
  constructor(userManager) {
    this.userManager = userManager;
    document.getElementById('reset-all').addEventListener('click', () => this.userManager.resetParams());
  }
}


function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}



const apiUrl = "https://672caf7e1600dda5a9f97a34.mockapi.io/user";
const itemsPerPage = 10;

const loader = new Loader();
loader.init();

const userManager = new UserManager(apiUrl, itemsPerPage);
userManager.fetchUsers();
userManager.more();
new Pagination(userManager);
new Search(userManager);
new Filters(userManager);
new Sort(userManager);
new BurgerMenu();
new Reset(userManager);