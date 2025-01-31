document.addEventListener("DOMContentLoaded", function () {
  let shops = {
      data: [
          { placeName: "مطعم الفيروز", category: "Resturants", location: "شارع الملك سعود", image: "img/Shops/Resturant.jpeg" },
          { placeName: "مقهى لافندر", category: "Cafes", location: "شارع النهضة", image: "img/Shops/Cafe.jpeg" },
          { placeName: "مدرسة النور الأهلية", category: "Education", location: "شارع الامير سلطان", image: "img/Shops/Education.jpeg" },
          { placeName: "صالون لمسة الجمال", category: "Beauty", location: "شارع الزهور", image: "img/Shops/Beauty.jpeg" },
          { placeName: "محل العائلة للتسوق", category: "Shops", location: "شارع العليا", image: "img/Shops/Shop.jpeg" },
          { placeName: "حديقة الربيع", category: "Activity", location: "شارع الوادي", image: "img/Shops/Activity-kids.jpeg" },
          { placeName: "مستشفى الرعاية الطبية", category: "Health", location: "شارع المستشفى", image: "img/Shops/Hospital.jpeg" }
      ]
  };

  let selectedFilters = new Set(); // Stores selected categories
  let orderMap = new Map(); // Stores the order of selected filters

  const urlParams = new URLSearchParams(window.location.search);
  const filterFromURL = urlParams.get("filter");

  // Function to highlight active filter buttons
  function setActiveFilters() {
      document.querySelectorAll(".button-value").forEach(button => {
          let category = button.getAttribute("data-category");
          if (selectedFilters.has(category)) {
              button.classList.add("active");
          } else {
              button.classList.remove("active");
          }
      });
  }

  // Function to apply the selected filters
  function applyFilter() {
      let elements = document.querySelectorAll(".card");

      if (selectedFilters.size === 0) {
          elements.forEach(element => element.classList.remove("hide"));
          return;
      }

      elements.forEach(element => {
          let category = element.dataset.category;
          if (selectedFilters.has(category)) {
              element.classList.remove("hide");
          } else {
              element.classList.add("hide");
          }
      });
  }

  // Function to toggle filters
  function toggleFilter(button, category) {
      if (category === "All") {
          selectedFilters.clear();
          orderMap.clear();
          document.querySelectorAll(".button-value").forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
      } else {
          document.querySelector(".button-value[data-category='All']")?.classList.remove("active");

          if (selectedFilters.has(category)) {
              selectedFilters.delete(category);
              orderMap.delete(category);
          } else {
              selectedFilters.add(category);
              orderMap.set(category, orderMap.size + 1);
          }
      }

      setActiveFilters();
      applyFilter();

      // Update URL without reloading
      const newUrl = `${window.location.pathname}?filter=${Array.from(selectedFilters).join(",")}`;
      history.pushState({}, "", newUrl);
  }

  // Function to create shop cards
  function createShopCards() {
      let shopContainer = document.getElementById("shops");
      shopContainer.innerHTML = "";

      shops.data.forEach((shop, i) => {
          let savedKey = `saved_${shop.placeName}`;
          let ratingKey = `rating_${shop.placeName}`;
          
          let isSaved = localStorage.getItem(savedKey) === "true";
          let ratingValue = localStorage.getItem(ratingKey) || "0.0";

          let card = document.createElement("div");
          card.classList.add("card");
          card.dataset.category = shop.category;

          card.addEventListener("click", function (event) {
              if (!event.target.closest(".save-container")) {
                  window.location.href = `/shop-details?name=${encodeURIComponent(shop.placeName)}&category=${encodeURIComponent(shop.category)}&image=${encodeURIComponent(shop.image)}&location=${encodeURIComponent(shop.location)}`;
              }
          });

          let imgContainer = document.createElement("div");
          imgContainer.classList.add("image-container");

          let image = document.createElement("img");
          image.setAttribute("src", shop.image);
          imgContainer.appendChild(image);
          card.appendChild(imgContainer);

          let container = document.createElement("div");
          container.classList.add("container");

          let name = document.createElement("h5");
          name.classList.add("place-name");
          name.innerText = shop.placeName;
          container.appendChild(name);

          let location = document.createElement("h6");
          location.innerText = shop.location;
          container.appendChild(location);

          let rating = document.createElement("p");
          rating.classList.add("rating");
          rating.innerHTML = `⭐ متوسط التقييم: <span>${ratingValue}</span> / 5`;
          container.appendChild(rating);

          let saveContainer = document.createElement("div");
          saveContainer.classList.add("save-container");
          saveContainer.setAttribute("data-index", i);

          let saveIcon = document.createElement("i");
          saveIcon.classList.add("fa", "fa-bookmark");

          let saveText = document.createElement("span");
          saveText.innerText = isSaved ? "محفوظ" : "حفظ";
          saveIcon.style.color = isSaved ? "#F2963E" : "#ccc";

          saveContainer.addEventListener("click", function (event) {
              event.stopPropagation();
              isSaved = !isSaved;
              localStorage.setItem(savedKey, isSaved);
              saveText.innerText = isSaved ? "محفوظ" : "حفظ";
              saveIcon.style.color = isSaved ? "#F2963E" : "#ccc";

              localStorage.setItem("updatedSaveState", "true");
          });

          saveContainer.appendChild(saveIcon);
          saveContainer.appendChild(saveText);
          container.appendChild(saveContainer);

          card.appendChild(container);
          shopContainer.appendChild(card);
      });
  }

  // Search functionality
  document.getElementById("search").addEventListener("click", () => {
      let searchInput = document.getElementById("search-input").value.trim().toUpperCase();
      let cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
          let placeName = card.querySelector(".place-name").innerText.toUpperCase();
          card.classList.toggle("hide", !placeName.includes(searchInput));
      });
  });

  // Sync saved state when returning from shop-details.html
  function syncSavedState() {
      if (localStorage.getItem("updatedSaveState") === "true") {
          createShopCards();
          localStorage.removeItem("updatedSaveState");
      }
  }

  // Apply filters from URL on page load
  window.onload = () => {
      createShopCards();
      syncSavedState();

      if (filterFromURL) {
          filterFromURL.split(",").forEach(category => {
              selectedFilters.add(category);
          });
          applyFilter();
          setActiveFilters();
      }
  };

  // Add click event to filter buttons
  document.querySelectorAll(".button-value").forEach(button => {
      button.addEventListener("click", function () {
          let selectedFilter = this.getAttribute("data-category");
          toggleFilter(this, selectedFilter);
      });
  });
});

// Unique Local Storage Key for Saving Shops
const savedShopsKey = "saved_shops"; // Stores all saved shops as an array

// Function to Restore Save State for All Shops on Page Load
function restoreSavedShops() {
  let savedShops = JSON.parse(localStorage.getItem(savedShopsKey)) || [];
  document.querySelectorAll(".card").forEach(card => {
    let shopName = card.querySelector(".place-name").innerText;

    let saveContainer = card.querySelector(".save-container");
    let saveIcon = saveContainer.querySelector(".fa-bookmark");
    let saveText = saveContainer.querySelector(".save-text");

    // Check if the shop is saved
    if (savedShops.includes(shopName)) {
      saveContainer.classList.add("saved");
      saveText.textContent = "محفوظ";
      saveIcon.classList.remove("fa-regular");
      saveIcon.classList.add("fa-solid");
      saveIcon.style.color = "#F2963E";
    } else {
      saveContainer.classList.remove("saved");
      saveText.textContent = "حفظ";
      saveIcon.classList.remove("fa-solid");
      saveIcon.classList.add("fa-regular");
      saveIcon.style.color = "#ccc";
    }
  });
}

// Function to Toggle Save for a Specific Shop
function toggleShopSave(event, shopName) {
  event.stopPropagation(); // Prevent navigation issues

  let savedShops = JSON.parse(localStorage.getItem(savedShopsKey)) || [];

  // Toggle the saved status of the shop
  if (savedShops.includes(shopName)) {
    savedShops = savedShops.filter(shop => shop !== shopName);
  } else {
    savedShops.push(shopName);
  }

  localStorage.setItem(savedShopsKey, JSON.stringify(savedShops));

  // Broadcast update to sync across pages
  window.dispatchEvent(new Event("storage"));

  restoreSavedShops(); // Update UI instantly
}

// Ensure Save Button Works and Syncs Across Pages
document.addEventListener("DOMContentLoaded", function () {
  restoreSavedShops(); // Restore saved state on load

  // Add event listener to all save buttons in shop.ejs
  document.querySelectorAll(".save-container").forEach(button => {
    let shopName = button.closest(".card").querySelector(".place-name").innerText;
    button.addEventListener("click", event => toggleShopSave(event, shopName));
  });
});

// Sync Save State Across Pages
window.addEventListener("storage", function () {
  restoreSavedShops(); // Refresh save button state when changes occur
});
