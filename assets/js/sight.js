// Loader
function load() {
  window.onload = () => {
    const preloader = document.getElementById("loader");
    const bg = document.getElementById("loading");
    preloader.classList.add("hide-loader");
    bg.classList.add("hide-loader");
    setTimeout(() => {
      preloader.classList.add("loader-hidden");
      bg.classList.add("loader-hidden");
    }, 2500);
  };
}
load();

// Основной URL API
const apiUrl = "https://672caf7e1600dda5a9f97a34.mockapi.io/user";



// Класс для управления пользователями
class UserManage {
  constructor(apiUrl, itemsPerPage) {
    this.apiUrl = apiUrl;
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = 0;
    this.currentItems = 0;
    this.allUsers = [];
  }

  allDataUsers() {
    fetch(apiUrl, {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      this.allUsers = data;    
      console.log(this.allUsers);
      
    })
  }




  // Метод для загрузки пользователей
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
    this.allDataUsers()
    

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.currentItems = data.length;
        console.log(this.currentItems);
        
        this.displayUsers(data);
        this.updateButtons(this.totalItems);
      })
      .catch((error) => {
        console.error("Ошибка получения данных", error);
      });
  }

  // Метод для обновления страницы
  updatePage(page, limit) {
    this.currentPage = page;
    this.itemsPerPage = limit;
    this.fetchUsers();
  }

  // Метод для обновления состояния кнопок пагинации
  updateButtons(allData) {
    document.getElementById("prevPage").disabled = this.currentPage === 1;
    document.getElementById("nextPage").disabled = this.currentItems === this.allUsers.length;
    
    console.log(allData);
    
    document.getElementById("num").textContent = this.currentPage;
  }

  // Метод для отображения пользователей page, filteredUsers = this.allUsers
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

  // Метод для поиска пользователей
  searchUsers(query) {
    this.fetchUsers(query);
  }

  // Метод для фильтрации пользователей
  applyFilters(category) {
    this.fetchUsers("", category);
  }

  // Метод для сортировки пользователей
  applySort(sortBy, order = "asc") {
    this.fetchUsers("", "all", sortBy, order);
  }

  // Метод для сброса параметров
  resetParams() {
    this.fetchUsers();
  }
}
// Класс для создания карточек пользователей
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

// Инициализация менеджера пользователей
const itemsPerPage = 10;
const userManager = new UserManage(apiUrl, itemsPerPage);
userManager.fetchUsers();

// Обработчики событий для пагинации
document.getElementById("prevPage").addEventListener("click", () => userManager.updatePage(userManager.currentPage - 1, userManager.itemsPerPage = 10));
document.getElementById("nextPage").addEventListener("click", () => userManager.updatePage(userManager.currentPage + 1, userManager.itemsPerPage = 10));

// Обработчик для кнопки "more"
document.getElementById("more").addEventListener("click", () => {
  userManager.itemsPerPage += 10;
  userManager.fetchUsers();
});

// Обработчик для поиска
document.getElementById("searchButton").addEventListener("click", () => {
  const searchQuery = document.getElementById("searchInput").value;
  if (searchQuery) {
    userManager.searchUsers(searchQuery);
  } else {
    alert("Вы ничего не ввели");
  }
});

// Обработчик для фильтра
document.querySelector(".search__filter-buttons").addEventListener("change", (e) => {
  userManager.applyFilters(e.target.value);
});

// Обработчик для сортировки
document.getElementById("sort").addEventListener("change", (e) => {
  userManager.applySort(e.target.value, "desc");
});

// Обработчик для бургера
document.getElementById("burgerIcon").addEventListener("click", () => {
  const menuItems = document.getElementById("menuItems");
  const burgerIcon = document.getElementById("burgerIcon");
  menuItems.classList.toggle("open");
  burgerIcon.classList.toggle("open");
});

// Обработчик для кнопки сброса
document.getElementById('reset-all').addEventListener('click', () => userManager.resetParams());