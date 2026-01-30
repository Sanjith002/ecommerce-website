let sidenav = document.querySelector(".side");
let sidenav2 = document.querySelector(".side_collection");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");

function opennav() {
  sidenav.style.left = "0";
}

function opennav2() {
  sidenav2.style.left = "0";
}

function closenav() {
  sidenav.style.left = "-60%";
}

function closenav2() {
  sidenav2.style.left = "-60%";
}

function toggleChangePassword() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function toggleChangePassword2() {
  if (password2.type === "password") {
    password2.type = "text";
  } else {
    password2.type = "password";
  }
}

function checkPasswordMatch() {
  let new_pass = password.value;
  let confirm_pass = password2.value;
  if (new_pass !== confirm_pass) {
    alert("Password do not match");
    return false;
  }
  localStorage.setItem("showPopup2", true);
  window.location.href = "index.html";
  return false;
}

function continueAction() {
  localStorage.setItem("showPopup", true);
  window.location.href = "index.html";
  return false;
}

window.addEventListener("load", function () {
  if (localStorage.getItem("showPopup") === "true") {
    showPopup();
    localStorage.removeItem("showPopup");
  }
});

window.addEventListener("load", function () {
  if (localStorage.getItem("showPopup2") === "true") {
    showPopup2();
    localStorage.removeItem("showPopup2");
  }
});

function showPopup() {
  let popup = document.querySelector(".popup");
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 4000);
}

function showPopup2() {
  let popup = document.querySelector(".popup2");
  popup.classList.remove("hidden2");

  setTimeout(() => {
    popup.classList.add("hidden2");
  }, 4000);
}

function removePopup() {
  let popup = document.querySelector(".popup");
  popup.classList.add("hidden");
}

function removePopup2() {
  let popup = document.querySelector(".popup2");
  popup.classList.add("hidden2");
}

function opencart() {
  const slidecart = document.querySelector(".slide-cart");
  slidecart.classList.add("active");
  closenav2();
}

function closeCart() {
  const slidecart = document.querySelector(".slide-cart");
  slidecart.classList.remove("active");
}

let selectedSize = null;

function selectSize(element) {
  const sizeContainer = element.parentElement;

  if (element.classList.contains("active")) {
    element.classList.remove("active");
    selectedSize = null;
    return;
  }

  sizeContainer.querySelectorAll("span").forEach((span) => {
    span.classList.remove("active");
  });

  element.classList.add("active");

  selectedSize = element.dataset.size;
}

const cartfooter = document.querySelector(".cart-footer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price, img) {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const item = cart.find((p) => p.id === id && p.size === selectedSize);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, name, price, img, size: selectedSize, quantity: 1 });
  }
  selectedSize = null;
  document.querySelectorAll(".size span").forEach((span) => {
    span.classList.remove("active");
  });
  updateCartUI();
}

function increaseQty(id, size) {
  const findCart = cart.find((p) => p.id === id && p.size === size);
  if (!findCart) return;
  if (findCart) {
    findCart.quantity++;
    updateCartUI();
  }
}

function decreaseQty(id, size) {
  const findCart = cart.find((p) => p.id === id && p.size === size);
  if (!findCart) return;
  if (findCart.quantity > 1) {
    findCart.quantity--;
  } else {
    cart = cart.filter((p) => !(p.id === id && p.size === size));
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartTotal2 = document.getElementById("cartTotal2");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let qty = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    qty += item.quantity;

    cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}">
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>Size: ${item.size}</p>
            <p>₹${item.price}</p>
            <div class="qty-controls">
              <div onclick="decreaseQty(${item.id},'${item.size}')">-</div>
              <span>${item.quantity}</span>
              <div onclick="increaseQty(${item.id},'${item.size}')">+</div>
            </div>
          </div>
        </div>
        <hr>
      `;
  });

  cartTotal.innerHTML = total;
  cartTotal2.innerHTML = total;
  cartCount.innerText = qty;
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">YOUR CART IS EMPTY</p>`;
    cartfooter.classList.remove("block");
  }else{
    cartfooter.classList.add("block");
  }
  saveCart();
}

const sortBtn = document.querySelector(".sort-btn");
const menu = document.querySelector(".sort-menu");

sortBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .getElementById(item.dataset.target)
      .scrollIntoView({ behavior: "smooth" });

    menu.classList.remove("open");
  });
});

function placeOrder() {
  if (cart.length === 0) return;

  cart = [];
  localStorage.removeItem("cart");

  updateCartUI();

  const slidecart = document.querySelector(".slide-cart");
  slidecart.classList.remove("active");

  setTimeout(() => {
    document.querySelector(".orderPopup").classList.remove("hide");
    cancelPopup();
  }, 500);
}

function orderRemovePopup() {
  document.querySelector(".orderPopup").classList.add("hide");
}

function cancelPopup() {
  let popup = document.querySelector(".orderPopup");
  setTimeout(() => {
    popup.classList.add("hide");
  }, 4000);
}

function openSupport() {
  document.querySelector(".support-footer").classList.toggle("open");

  document.querySelector(".about-footer").classList.remove("open2");
  document.querySelector(".icone-box-mb-container").classList.remove("open3");
  document.querySelector(".explore-footer").classList.remove("open4");
}

function openAbout() {
  document.querySelector(".about-footer").classList.toggle("open2");

  document.querySelector(".support-footer").classList.remove("open");
  document.querySelector(".icone-box-mb-container").classList.remove("open3");
  document.querySelector(".explore-footer").classList.remove("open4");
}

function openStayUpdate() {
  document.querySelector(".icone-box-mb-container").classList.toggle("open3");

  document.querySelector(".support-footer").classList.remove("open");
  document.querySelector(".about-footer").classList.remove("open2");
  document.querySelector(".explore-footer").classList.remove("open4");
}

function openExplore() {
  document.querySelector(".explore-footer").classList.toggle("open4");

  document.querySelector(".support-footer").classList.remove("open");
  document.querySelector(".about-footer").classList.remove("open2");
  document.querySelector(".icone-box-mb-container").classList.remove("open3");
}

window.addEventListener("load", () => {
  updateCartUI();
});
