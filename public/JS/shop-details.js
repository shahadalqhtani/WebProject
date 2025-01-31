// Extract URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const shopName = urlParams.get("name");
const shopImage = urlParams.get("image");
const shopLocation = urlParams.get("location");
const shopDescription = urlParams.get("description") || "وصف المحل غير متوفر حاليًا.";

// Set Shop Details
document.getElementById("shop-name").innerText = shopName;
document.getElementById("shop-title").innerText = shopName;
document.getElementById("shop-description").innerText = shopDescription;
document.getElementById("google-maps-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopLocation)}`;

// Unique Local Storage Keys
const reviewsKey = `reviews_${shopName}`;
const ratingKey = `rating_${shopName}`;
const selectedRatingKey = `selectedRating_${shopName}`;
const savedKey = `saved_${shopName}`;

// Load Data from Local Storage
let savedReviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
let selectedRating = parseInt(localStorage.getItem(selectedRatingKey)) || 0;

// Function to Load and Display Reviews
function loadReviews() {
  const reviewContainer = document.getElementById("submitted-reviews");
  reviewContainer.innerHTML = "";

  savedReviews.forEach(review => {
    let reviewHTML = `
      <div class="review">
        <h4>${review.name}</h4>
        <p>${"⭐".repeat(review.rating)}</p>
        <p>${review.text}</p>
      </div>
    `;
    reviewContainer.innerHTML += reviewHTML;
  });

  updateAverageRating();
}

// Load Reviews and Restore Data on Page Load
document.addEventListener("DOMContentLoaded", function () {
  loadReviews();
  restoreSavedRating();
  restoreSavedState();
  applyStarRating(selectedRating);
});

// Star Rating System
const stars = document.querySelectorAll(".star-rating i");

// Restore the Last Selected Rating
function restoreSavedRating() {
  let storedRating = localStorage.getItem(ratingKey);
  if (storedRating) {
    document.getElementById("average-rating").innerText = storedRating;
  }
}

// Click Event to Change Rating
stars.forEach((star) => {
  star.addEventListener("click", function () {
    selectedRating = parseInt(this.getAttribute("data-value"));
    applyStarRating(selectedRating);
    localStorage.setItem(selectedRatingKey, selectedRating);
  });
});

// Apply Star Rating UI
function applyStarRating(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
}

// Submit Review Function
function submitReview() {
  const reviewText = document.getElementById("review-text").value.trim();

  if (selectedRating === 0) {
    alert("يرجى تحديد تقييم قبل الإرسال!");
    return;
  }

  if (!reviewText) {
    alert("يرجى إدخال تعليق!");
    return;
  }

  let newReview = {
    name: "مستخدم مجهول",
    rating: selectedRating,
    text: escapeHTML(reviewText)
  };

  // Add Review & Save to Local Storage
  savedReviews.unshift(newReview);
  localStorage.setItem(reviewsKey, JSON.stringify(savedReviews));

  // Update UI Instantly
  loadReviews();
  updateAverageRating();
  applyStarRating(0); // Reset stars after submission
  document.getElementById("review-text").value = ""; // Clear input
  selectedRating = 0; // Reset rating
  localStorage.setItem(selectedRatingKey, "0"); // Reset saved rating
}

// Calculate & Display Average Rating and Save to Storage
function updateAverageRating() {
  if (savedReviews.length === 0) {
    document.getElementById("average-rating").innerText = "0.0";
    localStorage.setItem(ratingKey, "0.0");
    return;
  }

  let totalStars = savedReviews.reduce((sum, review) => sum + review.rating, 0);
  let averageRating = (totalStars / savedReviews.length).toFixed(1);
  document.getElementById("average-rating").innerText = averageRating;

  // Save updated average rating in Local Storage
  localStorage.setItem(ratingKey, averageRating);
}

// Escape User Input to Prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (char) => {
    const escapeChars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return escapeChars[char];
  });
}

// Tab Navigation
function openTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
  document.getElementById(tabName).style.display = "block";
}

// Slideshow Images
const images = [
  shopImage,
  "img/Shops/sample1.jpg",
  "img/Shops/sample2.jpg",
  "img/Shops/sample3.jpg"
];

const slideshowContainer = document.getElementById("slideshow-container");
images.forEach(img => {
  let slide = `<div class="swiper-slide"><img src="${img}" alt="Shop Image"></div>`;
  slideshowContainer.innerHTML += slide;
});

// Initialize SwiperJS
new Swiper(".swiper-container", {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: ".swiper-pagination", clickable: true }
});

// Save Shop Logic (Persists After Leaving Page)
document.addEventListener("DOMContentLoaded", function () {
  restoreSavedState();
  document.querySelector(".save-container").addEventListener("click", toggleSave);
});


// Unique Local Storage Key for Saving Shops
const savedShopsKey = "saved_shops"; // Stores all saved shops as an array

// Function to Restore Save Button State on Page Load
function restoreSavedState() {
  const saveContainer = document.querySelector(".save-container");
  const saveIcon = document.getElementById("save-icon");
  const saveText = document.getElementById("save-text");

  let savedShops = JSON.parse(localStorage.getItem(savedShopsKey)) || [];

  const isSaved = savedShops.includes(shopName);

  if (isSaved) {
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
}

// Toggle Save Button & Sync Across Pages
function toggleSave(event) {
  event.stopPropagation(); // Prevent navigation issues

  const saveContainer = document.querySelector(".save-container");
  const saveIcon = document.getElementById("save-icon");
  const saveText = document.getElementById("save-text");

  let savedShops = JSON.parse(localStorage.getItem(savedShopsKey)) || [];

  if (savedShops.includes(shopName)) {
    savedShops = savedShops.filter(shop => shop !== shopName); // Remove shop
    saveContainer.classList.remove("saved");
    saveText.textContent = "حفظ";
    saveIcon.classList.remove("fa-solid");
    saveIcon.classList.add("fa-regular");
    saveIcon.style.color = "#ccc";
  } else {
    savedShops.push(shopName); // Add shop
    saveContainer.classList.add("saved");
    saveText.textContent = "محفوظ";
    saveIcon.classList.remove("fa-regular");
    saveIcon.classList.add("fa-solid");
    saveIcon.style.color = "#F2963E";
  }

  // Update Local Storage
  localStorage.setItem(savedShopsKey, JSON.stringify(savedShops));

  // Broadcast update to sync across `shop.ejs` & `shop-details.ejs`
  window.dispatchEvent(new Event("storage"));
}

// Ensure Save Button Works and Syncs Across Pages
document.addEventListener("DOMContentLoaded", function () {
  restoreSavedState(); // Restore saved state on load

  // Ensure button is clickable and toggles correctly
  document.querySelector(".save-container").addEventListener("click", toggleSave);
});

// Listen for storage updates (for syncing across `shop.ejs` & `shop-details.ejs`)
window.addEventListener("storage", function () {
  restoreSavedState(); // Refresh save button state when changes occur
});
