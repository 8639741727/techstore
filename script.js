console.log("script loaded");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {

    let product = {
        name: name,
        price: price,
        quantity: 1
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart successfully!");
}

// Update cart count
function updateCartCount() {

    let count = document.getElementById("cart-count");

    if (count) {
        count.innerText = cart.length;
    }
}

updateCartCount();


// Product search
let searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            let title = card.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }

        });

    });

}


// Dark mode
let darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}

function displayCart() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {

      subtotal += item.price * item.quantity;

      cartItems.innerHTML += `
      <tr>

          <td>${item.name}</td>

          <td>$${item.price}</td>

          <td>${item.quantity}</td>

          <td>$${item.price * item.quantity}</td>

          <td>

              <button
              class="remove-btn"
              onclick="removeItem(${index})">

                  Remove

              </button>

          </td>

      </tr>
      `;
  });

  let tax = subtotal * 0.05;

  let total = subtotal + tax;

  let subtotalElement = document.getElementById("subtotal");
  let taxElement = document.getElementById("tax");
  let grandTotalElement = document.getElementById("grand-total");

  if(subtotalElement){
      subtotalElement.innerText = subtotal.toFixed(2);
  }

  if(taxElement){
      taxElement.innerText = tax.toFixed(2);
  }

  if(grandTotalElement){
      grandTotalElement.innerText = total.toFixed(2);
  }
}

function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  displayCart();
}

displayCart();