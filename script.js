/*** ✅ Page Load: Slider Setup ***/
window.addEventListener("load", () => {
  let index = 1;
  const slidesContainer = document.querySelector(".slides");
  let slides = document.querySelectorAll(".slide");

  // Clone first and last slides
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);

  // Update slides list after cloning
  slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let slideWidth = slides[0].clientWidth;

  function updateSliderWidth() {
    slideWidth = slides[0].clientWidth;
    slidesContainer.style.width = `${slideWidth * totalSlides}px`;
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;

    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
    });
  }

  window.addEventListener("resize", updateSliderWidth);
  updateSliderWidth();

  function moveSlide(step) {
    index += step;
    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;

    setTimeout(() => {
      if (index >= totalSlides - 1) {
        index = 1;
        slidesContainer.style.transition = "none";
        slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
      } else if (index <= 0) {
        index = totalSlides - 2;
        slidesContainer.style.transition = "none";
        slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    }, 500);
  }

  document.querySelector(".prev")?.addEventListener("click", () => moveSlide(-1));
  document.querySelector(".next")?.addEventListener("click", () => moveSlide(1));

  let autoSlide = setInterval(() => moveSlide(1), 4000);
  slidesContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slidesContainer.addEventListener("mouseleave", () => autoSlide = setInterval(() => moveSlide(1), 4000));
});

/*** ✅ DOM Ready: All Site Features ***/
document.addEventListener("DOMContentLoaded", () => {
  /*** ✅ Add to Cart Feature ***/
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartBox = document.getElementById("cart");

  window.addToCart = (name, price) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.some(item => item.name === name)) {
      alert("Item already in cart!");
      return;
    }
    cart.push({ name, price: Number(price) });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    toggleCart(true);
  };

  window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  };

  function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} - ₹${item.price.toFixed(2)}</span>
        <button onclick="removeItem(${index})" style="margin-left:10px; background:#ff4d4d; color:#fff; border:none; padding:3px 8px; border-radius:4px; font-size:12px; cursor:pointer;">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartBox.style.display = cart.length > 0 ? "block" : "none";
  }

  window.toggleCart = (forceOpen = false) => {
    if (forceOpen) {
      cartBox.classList.add("active");
      cartBox.style.display = "block";
    } else {
      cartBox.classList.toggle("active");
      cartBox.style.display = cartBox.classList.contains("active") ? "block" : "none";
    }
  };

  window.checkout = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`✅ Proceeding to checkout.\nTotal: ₹${total.toFixed(2)}\nThank you for shopping!`);
    localStorage.removeItem("cart");
    updateCart();
    toggleCart(false);
  };

  updateCart();

  /*** ✅ Product Scroll Left/Right ***/
  window.slide = (direction) => {
    const container = document.querySelector(".product-list");
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  /*** ✅ Login Dropdown Toggle ***/
  const loginToggle = document.getElementById("loginToggle");
  const loginMenu = document.getElementById("loginMenu");

  if (loginToggle && loginMenu) {
    loginToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      loginMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!loginMenu.contains(e.target) && !loginToggle.contains(e.target)) {
        loginMenu.classList.remove("show");
      }
    });
  }

  /*** ✅ Live Search Filtering ***/
  const searchInput = document.querySelector("input[type='text']");
  const products = document.querySelectorAll(".product");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      let firstMatch = null;

      products.forEach(product => {
        const name = product.querySelector("h3")?.textContent.toLowerCase();
        if (name.includes(query)) {
          product.style.display = "block";
          if (!firstMatch) firstMatch = product;
        } else {
          product.style.display = "none";
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /*** ✅ Offers Dropdown Toggle ***/
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const offersDropdown = document.querySelector(".offers-dropdown");

  if (dropdownToggle && offersDropdown) {
    dropdownToggle.addEventListener("click", () => {
      offersDropdown.classList.toggle("active");
    });
  }

  /*** ✅ Smooth Scroll from Offer Links ***/
  const offerLinks = document.querySelectorAll(".offer-link");
  offerLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});


 


  // Toggle entire FAQ section
  const faqToggleBtn = document.getElementById("faq-toggle-btn");
  const faqWrapper = document.querySelector(".faq-dropdown-wrapper");

  faqToggleBtn.addEventListener("click", () => {
    faqWrapper.classList.toggle("open");
  });

  // Accordion per question
  const faqBoxes = document.querySelectorAll(".faq-box");

  faqBoxes.forEach((box) => {
    const header = box.querySelector(".faq-header");
    const icon = box.querySelector(".faq-icon");

    header.addEventListener("click", () => {
      const isOpen = box.classList.contains("active");

      faqBoxes.forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".faq-icon").textContent = "+";
      });

      if (!isOpen) {
        box.classList.add("active");
        icon.textContent = "−";
      }
    });
  });

